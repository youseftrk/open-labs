# Labs — visual brief (Design Engineer)

**Product:** Ghostty-class native terminal (Mac + Windows) for robotics sim → train → deploy. Operator surface on Real2Sim. Not a VS Code clone.

## Founder lock (2026-09-22) — DimOS *feel*, not DimOS *brand*

Public Dimensional / DimOS console vibe ([dimensional.org](https://dimensional.org)): arcade/console terminal energy, ink charcoal + ice cyan, map/viewport + command center split. Steal craft and layout energy. **Do not clone Dimensional marks, wordmark, mascot, or 1:1 product chrome.**

### DimOS feel notes (opened live)
- Site boot: `SETTING TYPE : {ARCADE NORMAL}` · `SETTING COLOR : {#181919; #B0E1F0}`
- Ink `#181919` + ice cyan `#B0E1F0` — utilitarian robotics dashboard, not SaaS
- Spatial view + command center (~30% command / rest viewport)
- Arcade/console terminal energy (dense mono instruments, not marketing hero)

## Spatial UI direction

**Thesis:** One dark glass shell. The 3D viewport is the stage; the terminal is a precision instrument docked to it — not a text app with a preview pane bolted on.

### Depth stack (back → front)
1. **Void canvas** — tinted near-black (ink/charcoal, never `#000`). Soft vignette, not flat fill.
2. **Viewport plane** — sim world, full-bleed when focused; slight inner shadow so glass chrome sits *in front*.
3. **Glass chrome** — translucent panels (blur + hairline border + specular edge). Liquid-glass language, not iOS-widget mush.
4. **Floating rails / drawers** — status rail, robot/sim drawers; soft contact shadow onto viewport.
5. **Cursor / selection** — sharp, high-contrast; terminal caret and selection stay crisp (no frosted text).

### Layout grammar
- **Primary:** command center ~30% + spatial viewport majority (DimOS console grammar). User-flippable.
- **Status rail:** thin vertical strip: connection, sim clock, GPU/CPU, robot link, env id. Icons + mono values only.
- **Robot / sim drawers:** slide from edge; list agents, sensors, scenes, checkpoints. Continuous corners.
- **Command palette:** center glass sheet (Ghostty/Arc energy).
- **Panes:** pill tabs on glass; inactive = lower opacity.

### Type
- UI chrome: **Geist** (Geist Mono for chrome labels).
- Terminal buffer: **Geist Mono** / JetBrains Mono — never Inter as the product face.
- Empty state wordmark: **Instrument Serif** OK sparingly. **No invented logos.**

### Color — dual-signal lock (recommended)

| Role | Hex | Use |
| --- | --- | --- |
| Ink | `#181919` | App void / chrome base (DimOS ink) |
| Console cyan | `#B0E1F0` | Command instruments, focus rings, caret/selection, HUD ticks, map grid, chrome hairlines |
| Spatial acid | `#B8FF3C` | Live viewport only: robot path, active agent, run/success in-sim, spatial selection |
| Paper text | off-white (not `#fff`) | Primary type |

**Rationale:** One hue collapses either console energy (cyan) or live spatial signal (acid). Dual-signal keeps DimOS arcade chrome *and* our robotics “alive in the map” accent without cloning Dimensional’s mark.

**Single-hue fallback (if eng forces one):** lock `#B0E1F0` for all accents; demote acid to semantic-success only in logs. Prefer dual.

**Banned:** deep-blue SaaS, AI purple, rainbow token soup, pure `#000`, cloning Dimensional logo/marks.

### Motion
- Drawer/pane: short spring; no bounce theater.
- Glass: opacity + blur on focus; no Ken Burns.
- Terminal glyphs: zero animation.

### Anti-patterns
- IDE Activity Bar clone; neon cyberpunk grid; heavy window chrome eating viewport; Dimensional brand clones.

## Library citations opened (DESKTOP-KH5CIHK)

- `C:\Users\youse\OneDrive\Desktop\design-library\design-library\CATALOG.md`
- `C:\Users\youse\OneDrive\Desktop\design-library\design-library\components\REGISTRY.md`
- `C:\Users\youse\OneDrive\Desktop\COMPONENT-INDEX.md`
- `C:\Users\youse\OneDrive\Desktop\design-library\startup-brand-identity\INDEX.md`
- Systems opened: `pleo-brand-guidelines`, `ghia-brand-guidelines`, `ribbon-guidelines`, `brand-glossary`, `inspora-tensorlake-brand`
- Explorations opened: `brandon-type-shit-wordmarks`, identity boards (`tiny-fruits`, `murs-a-fleurs`, `hkcta`, etc.)
- Box pack: `/workspace/design-library/_startup_brand_pack/INDEX.md`
- Components opened: `jakub-antalik/gooey`, `jakub-antalik/metal`, `scrollbar-but-cooler/ORIGIN.md`, `beautiful-ui/INDEX.md`, `arlan-vault/INDEX.md`, `bakai-lab/INDEX.md`

## Brand refs (steal craft / stay out)

| # | Ref | Steal | Stay out |
| --- | --- | --- | --- |
| 1 | DimOS / dimensional.org | ink+cyan, arcade console, ~30% command + map | marks, wordmark, 1:1 chrome |
| 2 | Pleo guidelines (`systems/pleo-brand-guidelines`) | system discipline | Pleo marks |
| 3 | Ghia guidelines (`systems/ghia-brand-guidelines`) | identity system craft | Ghia marks |
| 4 | Ribbon guidelines (`systems/ribbon-guidelines`) | guideline board craft | Ribbon marks |
| 5 | Brand glossary (`systems/brand-glossary`) | brand vocabulary rigor | — |
| 6 | Jakub gooey + metal (library) | instrument chrome / liquid metal | decorative goo everywhere |
| 7 | Bakai glossy / glow / warp-grid (library) | spatial glass depth | copying studies wholesale |
| 8 | Beautiful UI thinking / task-rows (library) | operator trace density | AI-chat SaaS look |

Extra mood (letterforms only): `explorations/brandon-type-shit-wordmarks` — not a type lock. Product type stays Geist + Instrument Serif where wordmark needed.

## Mac + Windows native chrome
- Frameless / thin titlebar; traffic lights or Win buttons inset into glass.
- Mac: vibrancy/blur, menu bar, notch-safe; fullscreen auto-hide rail.
- Windows: custom caption buttons, snap layouts, crisp DPI, no default Win11 blue mica.

## First three screens
**A — Empty:** void + wordmark + glass pills: New sim session · Open env · Connect robot.
**B — Sim session:** viewport majority + ~30% command center + live status rail.
**C — Deploy/train:** glass status sheet (phase, progress, artifact, ETA); terminal logs stay attached.

## Eng notes
- Glass system: blur, border opacity, elevation — **3 elevations max**.
- Glyph layer must never blur.
- Tokens: expose `ink`, `console-cyan`, `spatial-acid`.

## Figma delta plan (file `GUBCEbveSK5JD1LNr8dhP0`)

1. **Token Sheet** — add Console cyan `#B0E1F0` + Ink `#181919`; keep Spatial acid `#B8FF3C`; label dual-signal usage.
2. **A/B/C frames** — command center ~30%; cyan on chrome/HUD; acid only on in-viewport live signals.
3. **No new logos** — empty-state wordmark is type-only.
4. **Blocked 2026-09-22:** Figma MCP Starter rate limit — this brief is source of truth until canvas sync.

## Figma (current)
- File: https://www.figma.com/design/GUBCEbveSK5JD1LNr8dhP0
- fileKey: `GUBCEbveSK5JD1LNr8dhP0`
- Frames 1440×900: Token Sheet — Labs v0 · A Empty · B Sim session · C Deploy/train
- Prior accent `#B8FF3C` → **dual-signal** with `#B0E1F0`
