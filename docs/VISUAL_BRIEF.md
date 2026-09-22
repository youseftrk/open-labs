# Labs — visual brief (Design Engineer)

**Product:** Ghostty-class native terminal (Mac + Windows) for robotics sim → train → deploy. Operator surface on Real2Sim. Not a VS Code clone.

## Spatial UI direction

**Thesis:** One dark glass shell. The 3D viewport is the stage; the terminal is a precision instrument docked to it — not a text app with a preview pane bolted on.

### Depth stack (back → front)
1. **Void canvas** — tinted near-black (ink/charcoal, never `#000`). Soft vignette, not flat fill.
2. **Viewport plane** — sim world, full-bleed when focused; slight inner shadow so glass chrome sits *in front*.
3. **Glass chrome** — translucent panels (blur + hairline border + specular edge). Liquid-glass language, not iOS-widget mush.
4. **Floating rails / drawers** — status rail, robot/sim drawers; soft contact shadow onto viewport.
5. **Cursor / selection** — sharp, high-contrast; terminal caret and selection stay crisp (no frosted text).

### Layout grammar
- **Primary:** split — viewport (left/majority) + terminal (right or bottom). User-flippable.
- **Status rail:** thin vertical strip: connection, sim clock, GPU/CPU, robot link, env id. Icons + mono values only.
- **Robot / sim drawers:** slide from edge; list agents, sensors, scenes, checkpoints. Squircles / continuous corners.
- **Command palette:** center glass sheet (Ghostty/Arc energy).
- **Panes:** pill tabs on glass; inactive = lower opacity.

### Type
- UI chrome: **Geist** (Geist Mono for chrome labels).
- Terminal buffer: **Geist Mono** / JetBrains Mono — never Inter as the product face.
- Empty state wordmark: **Instrument Serif** OK sparingly.

### Color
- Ink surface: `#171819` family; paper text off-white (not pure `#fff`).
- One operator accent (orange or acid green) — sparse.
- **Banned:** deep-blue SaaS, AI purple, rainbow token soup, pure black.
- Semantic: run=accent, warn=amber, fail=red, idle=muted mono.

### Motion
- Drawer/pane: short spring; no bounce theater.
- Glass: opacity + blur on focus; no Ken Burns.
- Terminal glyphs: zero animation.

### Anti-patterns
- IDE Activity Bar clone; neon cyberpunk grid; heavy window chrome eating viewport.

## Mac + Windows native chrome
- Frameless / thin titlebar; traffic lights or Win buttons inset into glass.
- Mac: vibrancy/blur, menu bar, notch-safe; fullscreen auto-hide rail.
- Windows: custom caption buttons, snap layouts, crisp DPI, no default Win11 blue mica.

## First three screens
**A — Empty:** void + wordmark + glass pills: New sim session · Open env · Connect robot.
**B — Sim session:** viewport 60–70% + docked terminal + live status rail.
**C — Deploy/train:** glass status sheet (phase, progress, artifact, ETA); terminal logs stay attached.

## Eng notes
- Glass system: blur, border opacity, elevation — **3 elevations max**.
- Glyph layer must never blur.
- Next: Figma A/B/C at 1440×900 + token sheet.

## Figma (locked)
- File: https://www.figma.com/design/GUBCEbveSK5JD1LNr8dhP0
- fileKey: `GUBCEbveSK5JD1LNr8dhP0`
- Frames 1440×900: Token Sheet — Labs v0 · A Empty · B Sim session · C Deploy/train
- Accent locked: `#B8FF3C`
