import { useEffect, useRef, useCallback } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebglAddon } from "@xterm/addon-webgl";
import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import "@xterm/xterm/css/xterm.css";

type ShellLine = { stream: string; line: string };
type ShellDone = { code: number; command: string };

const isTauri = () =>
  typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export function TerminalPane() {
  const hostRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const lineBuf = useRef("");

  const writeInfo = useCallback((t: Terminal, msg: string) => {
    t.writeln(`\x1b[38;2;154;150;144m${msg}\x1b[0m`);
  }, []);

  useEffect(() => {
    if (!hostRef.current || termRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: "block",
      fontFamily: '"Geist Mono", "JetBrains Mono", ui-monospace, Menlo, monospace',
      fontSize: 13,
      lineHeight: 1.35,
      theme: {
        background: "#181919",
        foreground: "#f2f0eb",
        cursor: "#b0e1f0",
        cursorAccent: "#181919",
        selectionBackground: "rgba(176, 225, 240, 0.28)",
        black: "#181919",
        brightBlack: "#6b6762",
        green: "#b8ff3c",
        brightGreen: "#d4ff6a",
        yellow: "#e8b84a",
        red: "#e85a4a",
        cyan: "#b0e1f0",
        white: "#f2f0eb",
      },
      allowTransparency: false,
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(hostRef.current);

    try {
      const webgl = new WebglAddon();
      webgl.onContextLoss(() => webgl.dispose());
      term.loadAddon(webgl);
    } catch {
      // Canvas renderer fallback — WebGL unavailable in some headless envs
    }

    fit.fit();
    termRef.current = term;
    fitRef.current = fit;

    term.writeln("\x1b[38;2;176;225;240mLabs\x1b[0m — terminal for robot people");
    writeInfo(term, "Type a command and press Enter. Interactive PTY when Tauri + portable-pty are live.");
    term.write("\r\n\x1b[38;2;176;225;240m›\x1b[0m ");

    const onData = term.onData((data) => {
      for (const ch of data) {
        if (ch === "\r") {
          const cmd = lineBuf.current.trim();
          term.write("\r\n");
          lineBuf.current = "";
          if (!cmd) {
            term.write("\x1b[38;2;176;225;240m›\x1b[0m ");
            continue;
          }
          if (isTauri()) {
            invoke("run_shell", { command: cmd }).catch((e) => {
              term.writeln(`\x1b[38;2;232;90;74merror: ${e}\x1b[0m`);
              term.write("\x1b[38;2;176;225;240m›\x1b[0m ");
            });
          } else {
            writeInfo(term, `[browser] would run: ${cmd}`);
            term.write("\x1b[38;2;176;225;240m›\x1b[0m ");
          }
        } else if (ch === "\u007f") {
          if (lineBuf.current.length > 0) {
            lineBuf.current = lineBuf.current.slice(0, -1);
            term.write("\b \b");
          }
        } else if (ch >= " " || ch === "\t") {
          lineBuf.current += ch;
          term.write(ch);
        }
      }
    });

    const ro = new ResizeObserver(() => fit.fit());
    ro.observe(hostRef.current);

    let unline: UnlistenFn | undefined;
    let undone: UnlistenFn | undefined;

    if (isTauri()) {
      listen<ShellLine>("shell-line", (ev) => {
        const { stream, line } = ev.payload;
        if (stream === "stderr") {
          term.writeln(`\x1b[38;2;232;90;74m${line}\x1b[0m`);
        } else if (stream === "info") {
          writeInfo(term, line);
        } else {
          term.writeln(line);
        }
      }).then((u) => {
        unline = u;
      });

      listen<ShellDone>("shell-done", (ev) => {
        writeInfo(term, `exit ${ev.payload.code}`);
        term.write("\x1b[38;2;176;225;240m›\x1b[0m ");
      }).then((u) => {
        undone = u;
      });

      invoke("open_stub_shell").catch(() => {
        /* ok if window-only */
      });
    }

    return () => {
      onData.dispose();
      ro.disconnect();
      unline?.();
      undone?.();
      term.dispose();
      termRef.current = null;
    };
  }, [writeInfo]);

  return (
    <div className="terminal-dock">
      {!isTauri() && (
        <div className="stub-banner">
          Vite-only — shell bridge needs `npm run tauri dev`
        </div>
      )}
      <div className="terminal-chrome">
        <span className="terminal-title">session · pty</span>
        <div className="terminal-actions">
          <button
            type="button"
            className="mini-btn"
            onClick={() => {
              if (isTauri()) invoke("open_stub_shell");
              else termRef.current && writeInfo(termRef.current, "open stub (tauri only)");
            }}
          >
            open shell
          </button>
          <button
            type="button"
            className="mini-btn"
            onClick={() => termRef.current?.clear()}
          >
            clear
          </button>
        </div>
      </div>
      <div className="terminal-host" ref={hostRef} />
    </div>
  );
}
