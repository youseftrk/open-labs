use serde::Serialize;
use std::io::{BufRead, BufReader};
use std::path::{Path, PathBuf};
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

fn emit_line(app: &AppHandle, stream: &str, line: impl Into<String>) {
    let _ = app.emit(
        "shell-line",
        ShellLine {
            stream: stream.into(),
            line: line.into(),
        },
    );
}

fn stream_child_output(app: AppHandle, mut child: std::process::Child, command: String) -> Result<String, String> {
    let stdout = child.stdout.take();
    let stderr = child.stderr.take();
    let app_out = app.clone();
    let app_err = app.clone();

    if let Some(out) = stdout {
        std::thread::spawn(move || {
            for line in BufReader::new(out).lines().flatten() {
                emit_line(&app_out, "stdout", line);
            }
        });
    }
    if let Some(err) = stderr {
        std::thread::spawn(move || {
            for line in BufReader::new(err).lines().flatten() {
                emit_line(&app_err, "stderr", line);
            }
        });
    }

    let status = child
        .wait()
        .map_err(|e| format!("failed waiting on process: {e}"))?;
    let code = status.code().unwrap_or(-1);
    let _ = app.emit(
        "shell-done",
        ShellDone {
            code,
            command: command.clone(),
        },
    );
    Ok(format!("exit {code}"))
}

/// One-shot shell command (line-buffer). Interactive PTY lands via `pty_*` commands when portable-pty is wired on Mac/Windows.
#[tauri::command]
fn run_shell(app: AppHandle, command: String) -> Result<(), String> {
    let shell = if cfg!(windows) { "cmd" } else { "sh" };
    let flag = if cfg!(windows) { "/C" } else { "-c" };

    let child = Command::new(shell)
        .arg(flag)
        .arg(&command)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .stdin(Stdio::null())
        .spawn()
        .map_err(|e| format!("failed to spawn shell: {e}"))?;

    let _ = stream_child_output(app, child, command)?;
    Ok(())
}

fn candidate_sim_roots() -> Vec<PathBuf> {
    let mut roots = Vec::new();
    if let Ok(p) = std::env::var("OPEN_PHYSICAL_SIM_ROOT") {
        roots.push(PathBuf::from(p));
    }
    // Dev layouts: sibling checkout next to open-labs, or box workspace path.
    for p in [
        PathBuf::from("../open-physical-sim"),
        PathBuf::from("../../open-physical-sim"),
        PathBuf::from("/workspace/open-physical-sim"),
    ] {
        roots.push(p);
    }
    roots
}

fn find_hello_twin_script() -> Option<PathBuf> {
    for root in candidate_sim_roots() {
        let script = root.join("scripts/hello_twin.py");
        if script.is_file() {
            return Some(script);
        }
    }
    None
}

/// Prefer PATH `open-physical-sim hello twin`; else run local `python scripts/hello_twin.py -n 20`.
#[tauri::command]
fn run_hello_twin(app: AppHandle) -> Result<String, String> {
    emit_line(&app, "info", "→ intending: open-physical-sim hello twin");

    // 1) Documented CLI on PATH
    if Command::new("open-physical-sim")
        .args(["hello", "twin"])
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .status()
        .map(|s| s.success())
        .unwrap_or(false)
    {
        let child = Command::new("open-physical-sim")
            .args(["hello", "twin"])
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .spawn()
            .map_err(|e| e.to_string())?;
        return stream_child_output(app, child, "open-physical-sim hello twin".into());
    }

    // 2) Local Open Physical Sim checkout
    if let Some(script) = find_hello_twin_script() {
        let root = script
            .parent()
            .and_then(Path::parent)
            .unwrap_or_else(|| Path::new("."));
        let cmd = format!("python {} -n 20", script.display());
        emit_line(
            &app,
            "info",
            format!("CLI missing — running local smoke: `{cmd}`"),
        );
        let child = Command::new("python")
            .args([script.as_os_str(), std::ffi::OsStr::new("-n"), std::ffi::OsStr::new("20")])
            .current_dir(root)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .spawn()
            .or_else(|_| {
                Command::new("python3")
                    .args([script.as_os_str(), std::ffi::OsStr::new("-n"), std::ffi::OsStr::new("20")])
                    .current_dir(root)
                    .stdout(Stdio::piped())
                    .stderr(Stdio::piped())
                    .spawn()
            })
            .map_err(|e| format!("failed to spawn hello_twin.py: {e}"))?;
        return stream_child_output(app, child, cmd);
    }

    let msg = "Open Physical Sim not found — set OPEN_PHYSICAL_SIM_ROOT or install CLI, then retry.";
    emit_line(&app, "info", msg);
    Ok(msg.into())
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

/// Placeholder for interactive PTY session id. Full portable-pty wiring is Mac/Windows-first
/// (box rustc/webkit cannot run `tauri dev`). Frontend keeps the line-buffer path until then.
#[tauri::command]
fn pty_status() -> String {
    "line-buffer shell active; interactive PTY follows on native targets".into()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            run_shell,
            run_hello_twin,
            open_stub_shell,
            pty_status
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
