# Labs

**One line:** I built a terminal for robot people — sim, train, and deploy in one spatial window.

## What it is
Labs is a **Ghostty-class** desktop terminal (fast, GPU-backed, native Mac + Windows chrome) purpose-built for **robotics simulation, policy training, and deployment** — DimensionOS-style operator workflow, with **our spatial design system** (depth, glass, clear panes), not a generic IDE skin.

## Not
- Not a Ghostty fork (Ghostty is Zig + macOS/Linux-native; we need Windows day one).
- Not a full robot OS. Labs is the **operator shell** that runs your tools and shows sim/train/deploy state.
- Not affiliated with Ghostty or DimensionalOS / DimOS — inspired by public product shape only (clean-room).

## Surfaces (v0)
1. **Terminal** — PTY sessions, tabs/splits, GPU text, Open Real2Sim CLIs (`or2s`, `reconstruct`, `envc`, MuJoCo/policy scripts).
2. **Spatial chrome** — status rail, session drawers, depth layers; calm dark spatial look.
3. **Sim pane** — attach to local MuJoCo / Open Physical Sim runs; show twin + walk_nofall metrics.
4. **Train pane** — kick BC/eval jobs; live success_rate / loss.
5. **Deploy pane** — env registry (`envc`) + “what’s running where” stubs.

## Platforms
- macOS (Apple Silicon first)
- Windows 10/11 (x64 + arm64 if easy)

## Stack (locked for scaffold)
- **Tauri 2** + TypeScript frontend (native windowing both platforms)
- Terminal: **xterm.js** + WebGL addon (v0); leave room to swap for a Rust PTY core later
- UI: React + our spatial tokens (CSS variables; design system to follow)
- Local process bridge: spawn/monitor Open Real2Sim CLIs

## Success (v0 demo)
1. Open Labs on Mac or Windows → spatial empty state.
2. Terminal runs `or2s validate` / `envc --help`.
3. One-click “hello twin” launches Open Physical Sim smoke and shows status in a side pane.
4. Looks like *us* — spatial depth, not VS Code / Warp clone.

## Repo
Working name: `labs` (product). Public name: **Labs**.
