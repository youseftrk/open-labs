# Labs

I built a terminal for robot people — sim, train, and deploy in one spatial window.

Labs is a Ghostty-class desktop terminal purpose-built for robotics simulation, policy training, and deployment. Spatial dark chrome (depth, glass, clear panes). Not a generic IDE skin.

## What you get (v0)

- **Terminal** — xterm.js + WebGL text; shell bridge via Tauri (see Notes below)
- **Sim / Train / Deploy** — mode side rail with status panes
- **Hello twin** — one-click intent to run Open Physical Sim smoke
- **Session tabs** — stub for multi-session workflow

## Stack

- Tauri 2 + React + TypeScript
- xterm.js + `@xterm/addon-webgl`
- Spatial CSS variables (design tokens)

## Develop

### Prerequisites

**macOS (Apple Silicon first)**

1. Install [Xcode Command Line Tools](https://developer.apple.com/xcode/): `xcode-select --install`
2. Install [Rust](https://www.rust-lang.org/tools/install): `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
3. Install Node.js 20+ (nvm, fnm, or [nodejs.org](https://nodejs.org/))

**Windows 10/11**

1. Install [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (Desktop development with C++)
2. Install [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/) (usually preinstalled on Win11)
3. Install [Rust](https://www.rust-lang.org/tools/install) (`rustup-init.exe`)
4. Install Node.js 20+

Full Tauri prerequisites: https://tauri.app/start/prerequisites/

### Run

```bash
git clone https://github.com/youseftrk/open-labs.git
cd open-labs
npm install
npm run tauri dev
```

Frontend-only (Vite, no native shell):

```bash
npm run dev
```

Production build:

```bash
npm run tauri build
```

## Notes on the shell / PTY

v0 ships a **shell stub**: the UI is real (xterm + WebGL), and Tauri commands run one-shot shell processes and stream output into the terminal. Full interactive PTY (resize, TTY apps, job control) is intentionally deferred — on Linux scaffold boxes WebKitGTK deps often block a full native run; on Mac/Windows `tauri dev` opens the window and the stub still spawns your login shell for smoke commands.

When you are ready for real PTY sessions, swap the Rust bridge for a portable-pty (or community Tauri PTY plugin) without changing the React chrome.

**Hello twin** logs and intends:

```text
open-physical-sim hello twin
```

Wire that to your local Open Physical Sim CLI when installed.

## License

Apache-2.0 — see [LICENSE](./LICENSE).

## Product

Visual direction: [docs/VISUAL_BRIEF.md](./docs/VISUAL_BRIEF.md).

See [PRODUCT.md](./PRODUCT.md).
