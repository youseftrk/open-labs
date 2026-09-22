# Labs — visual brief (Design Engineer)

**Product:** Ghostty-class native terminal (Mac + Windows) for robotics sim → train → deploy. Operator surface on Real2Sim. Not a VS Code clone.

## Founder / CTO locks (2026-09-22)

### DimOS *feel*, not DimOS *brand*
Public Dimensional console vibe ([dimensional.org](https://dimensional.org)): arcade/console energy, ink + ice cyan, map/viewport + command-center split. Steal craft only. **Do not clone Dimensional marks, wordmark, mascot, or 1:1 chrome.**

Clean-room refs (opened):
- `/workspace/labs/dimos-refs/dimos-terminal.png` — charcoal grid, pale cyan type, arcade/terminal
- `/workspace/labs/dimos-refs/dimos-prototype.png` — icon spatial nav, early-access sheet, cyan accents
- Feel notes: `/workspace/open-labs/docs/DIMOS_FEEL.md`

`design-library\labs` on desktop = CAD/RL graded-env (URDF/MuJoCo) — steal **sim-grade spatial seriousness**, not UI chrome.

### Dual-signal accent (CTO lock)
| Role | Hex | Use |
| --- | --- | --- |
| Ink | `#171819` / `#181919` family | Void + chrome base (Andrei ink `#171819` from CATALOG; DimOS `#181919`) |
| Console / chrome / idle telemetry | `#B0E1F0` ice cyan | Chrome, HUD, focus, caret, map grid, idle metrics (DimOS feel) |
| Live run / success / active train | `#B8FF3C` acid green | Live viewport + active train/success only (Labs signal) |

Ice cyan is **not** banned by CATALOG (banned: deep-blue SaaS, AI purple, pure `#000`).

### Type (Type Lab DimOS refine)
| Face | Role |
| --- | --- |
| **Geist Mono** | Chrome / telemetry / labels / footer |
| **Geist** | Readable panels |
| Pixel arcade | Hero only — not product chrome |
| Instrument Serif | Rare display / empty wordmark only — not console |
| Inter | **Banned** on Labs product surfaces |

Tracking: logs 0–+1; CAPS labels +4–+8; footer/version +6–+12.
Color-with-type: ice cyan `#B0E1F0` on `#181919` for chrome labels — not acid green.
Doc: `/workspace/labs/TYPE-LABS-CHROME.md` · portfolio TYPE-FLAGS still Instrument Serif + Geist.

### Spatial UI language (CATALOG / REGISTRY — real mounts)
**Glass / spatial:** arlan-vault (`holo`, `liquid-ui`, `chroma-glow`, `color-depth`, `squircle`, `ghosty-reveal`, `dia-gradient`); oa-design (`squircle-card`, `floating-pill`, `modal`, `reveal`); jakub-antalik (`gooey`, `beam`, `metal` — sparingly); bakai-lab (`island`; max one of `fade-grid`/`warp-grid`/`wave-grid`).

**Console / operator:** beautiful-ui (`sidebar-nav`, `task-rows`, `tool-chips`, `code-block`, `diff-table`, `records-table`, `filter-table`, `flowchart`, `prompt-bar`, `streaming-text`, `thinking`, `approval-card`, `context-cards`); bakai-lab (`pipeline`, `op-grid`, `sidebars`, `charts`, `dialog`); `scrollbar-but-cooler`.

**Skip:** hiartem `aurora-field` + purple link chrome.

### Brand pack (wordmark craft — not Labs lock)
Desktop: `design-library\startup-brand-identity\` · Box: `/workspace/design-library/_startup_brand_pack/`
Systems craft: pleo / ghia / ribbon / glossary. Wordmark mood packs stay explorations.

## Layout grammar
- Command center ~30% + spatial viewport majority (DimOS console grammar). User-flippable.
- Status rail: connection, sim clock, GPU/CPU, robot link, env id — icons + mono.
- Drawers: agents, sensors, scenes, checkpoints.
- Command palette: center glass sheet.
- Depth: void → viewport → glass chrome → rails → sharp caret (never blur glyphs).
- Glass elevations: **3 max**.

## Critique KEEP/KILL (locked — see `CRITIQUE_FILTER.md`)
**KEEP:** ink+ice cyan tokens; mono density + sparse air; ~30% command docked to viewport; Geist/Geist Mono; dual-signal roles; library glass + operator rows; brand pack for marks only.
**KILL:** Dimensional wordmark/arcade slab as identity; EARLY ACCESS white modal cosplay; literal Humanoid/Drone/Manipulation rail; cyan fill/neon sludge; map-hero as the app; acid on chrome; SaaS pills / deep-blue / purple; 1:1 Dimensional chrome.

## Banned
Deep-blue SaaS, AI purple, rainbow token soup, pure `#000`, Dimensional brand clones / marks / modals / icon cosplay, invented logos, Inter as product face, cyan sludge, acid on chrome.

## Eng tokens (CTO accepted)
```
--ink: #181919;
--console-cyan: #B0E1F0;
--spatial-acid: #B8FF3C;
```
Andrei `#171819` remains in the ink family for library cites.

## Figma (`GUBCEbveSK5JD1LNr8dhP0`)
https://www.figma.com/design/GUBCEbveSK5JD1LNr8dhP0
Frames 1440×900: Token Sheet · A Empty · B Sim session · C Deploy/train

### Delta (queued — MCP rate-limited; docs are SoT per CTO)
1. Token Sheet: `--ink #181919` · `--console-cyan #B0E1F0` · `--spatial-acid #B8FF3C` + Critique KEEP/KILL labels
2. A/B/C: cyan on chrome/HUD/caret only; acid only on live run/path; no cyan fills
3. Type → Geist / Geist Mono; cyan-on-ink chrome type
4. No Dimensional marks/modals/icon cosplay · no invented logos · no SaaS pills

## Library citations opened
- Desktop CATALOG + REGISTRY (Andrei ink `#171819`, liquid-glass / oa-design, bans)
- DimOS refs PNGs + DIMOS_FEEL.md + TYPE-LABS-CHROME.md
- startup-brand-identity + `_startup_brand_pack`
- Vault REGISTRY mounts listed above

## Build rule (founder 2026-09-22)
**Do not build UI from Figma.** Docs + Critique filter + live shell are source of truth. Figma is optional exploration only — never a code handoff requirement.
