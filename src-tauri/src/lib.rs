use serde::Serialize;
use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio};
use tauri::{AppHandle, Emitter};

#[derive(Clone, Serialize)]
struct ShellLine {
    stream: String,
    line: String,
}

#[derive(Clone, Serialize)]
struct ShellDone {
    code: i32,
    command: String,
}

/// Run a one-shot shell command and stream stdout/stderr lines to the frontend.
/// Full interactive PTY is deferred; this stub still opens a real shell process.
#[tauri::command]
fn run_shell(app: AppHandle, command: String) -> Result<(), String> {
    let shell = if cfg!(windows) { "cmd" } else { "sh" };
    let flag = if cfg!(windows) { "/C" } else { "-c" };

    let mut child = Command::new(shell)
        .arg(flag)
        .arg(&command)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .stdin(Stdio::null())
        .spawn()
        .map_err(|e| format!("failed to spawn shell: {e}"))?;

    let stdout = child.stdout.take();
    let stderr = child.stderr.take();
    let app_out = app.clone();
    let app_err = app.clone();

    if let Some(out) = stdout {
        std::thread::spawn(move || {
            let reader = BufReader::new(out);
            for line in reader.lines().flatten() {
                let _ = app_out.emit(
                    "shell-line",
                    ShellLine {
                        stream: "stdout".into(),
                        line,
                    },
                );
            }
        });
    }

    if let Some(err) = stderr {
        std::thread::spawn(move || {
            let reader = BufReader::new(err);
            for line in reader.lines().flatten() {
                let _ = app_err.emit(
                    "shell-line",
                    ShellLine {
                        stream: "stderr".into(),
                        line,
                    },
                );
            }
        });
    }

    let status = child
        .wait()
        .map_err(|e| format!("failed waiting on shell: {e}"))?;
    let code = status.code().unwrap_or(-1);
    let _ = app.emit(
        "shell-done",
        ShellDone {
            code,
            command: command.clone(),
        },
    );
    Ok(())
}

/// Intent for Open Physical Sim hello twin smoke — logs the command and tries to run it.
#[tauri::command]
fn run_hello_twin(app: AppHandle) -> Result<String, String> {
    let cmd = "open-physical-sim hello twin".to_string();
    let _ = app.emit(
        "shell-line",
        ShellLine {
            stream: "info".into(),
            line: format!("→ intending: {cmd}"),
        },
    );

    // Prefer PATH binary; if missing, still report the intent so the UI demo works.
    match Command::new("open-physical-sim")
        .args(["hello", "twin"])
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
    {
        Ok(mut child) => {
            if let Some(out) = child.stdout.take() {
                let app_c = app.clone();
                std::thread::spawn(move || {
                    for line in BufReader::new(out).lines().flatten() {
                        let _ = app_c.emit(
                            "shell-line",
                            ShellLine {
                                stream: "stdout".into(),
                                line,
                            },
                        );
                    }
                });
            }
            if let Some(err) = child.stderr.take() {
                let app_c = app.clone();
                std::thread::spawn(move || {
                    for line in BufReader::new(err).lines().flatten() {
                        let _ = app_c.emit(
                            "shell-line",
                            ShellLine {
                                stream: "stderr".into(),
                                line,
                            },
                        );
                    }
                });
            }
            let status = child.wait().map_err(|e| e.to_string())?;
            let code = status.code().unwrap_or(-1);
            let _ = app.emit(
                "shell-done",
                ShellDone {
                    code,
                    command: cmd.clone(),
                },
            );
            Ok(format!("spawned hello twin (exit {code})"))
        }
        Err(_) => {
            let msg = format!(
                "CLI not on PATH — logged intent only: `{cmd}`. Install Open Physical Sim and retry."
            );
            let _ = app.emit(
                "shell-line",
                ShellLine {
                    stream: "info".into(),
                    line: msg.clone(),
                },
            );
            Ok(msg)
        }
    }
}

#[tauri::command]
fn open_stub_shell(app: AppHandle) -> Result<String, String> {
    let probe = if cfg!(windows) {
        "echo Labs shell stub && ver"
    } else {
        "echo Labs shell stub && uname -a && echo $SHELL && pwd"
    };
    run_shell(app, probe.to_string())?;
    Ok("stub shell opened".into())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            run_shell,
            run_hello_twin,
            open_stub_shell
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
