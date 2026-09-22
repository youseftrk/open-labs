# Labs — composition notes (Layout Kid)

**Product shell:** DimOS *feel* — map/viewport primary + docked terminal. Not a VS Code clone. Not Dimensional chrome.
**Opened:** `VISUAL_BRIEF.md`, `DIMOS_FEEL.md`, `CRITIQUE_FILTER.md`, beautiful-ui + bakai-lab folder lists on DESKTOP-KH5CIHK (REGISTRY mounts). Startup systems packs cited by DE (pleo/ghia/ribbon/glossary) — craft only.

## Frame (1440×900 default)

| Zone | Ratio | Role |
| ---- | ----- | ---- |
| **Spatial viewport** | **~70%** width (flex grow) | Stage — costmap / twin / Rerun. Majority of air. |
| **Command dock** | **~30%** width (min ~360px, max ~480px @1440) | Terminal + operator instruments docked to viewport. User-flippable L/R. |
| **Status rail** | **32–40px** height, full width under chrome OR 40–48px icon strip on the *viewport* leading edge | Connection · sim clock · GPU/CPU · robot link · env id — Geist Mono + ice cyan glyphs |
| **Icon rail** (optional) | **48px** fixed, leading edge of *command dock* only | Agents / sensors / scenes / checkpoints — thin cyan outline icons, not DimOS Humanoid/Drone/Manip set |

Divider: 1px hairline `#181919` → ice cyan `#B0E1F0` on drag/hover. Draggable; snap to 28% / 30% / 32% / 35%.

## Split ratios (locked grammar)

```
┌────────────────────────────────────────────────────────────┐
│ chrome / title (Geist Mono, ice cyan labels)        ~40px  │
├──────────┬─────────────────────────────────────────────────┤
│          │                                                 │
│  CMD     │              VIEWPORT (~70%)                    │
│  ~30%    │         spatial stage + live acid path          │
│          │                                                 │
│  ┌────┐  │                                                 │
│  │rail│  │                                                 │
│  │48px│  │                                                 │
│  └────┘  │                                                 │
│  term    │                                                 │
│  logs    │                                                 │
│  rows    │                                                 │
├──────────┴─────────────────────────────────────────────────┤
│ status rail (mono telemetry)                        ~36px  │
└────────────────────────────────────────────────────────────┘
```

- **Empty (A):** viewport dominates with sparse grid (bakai `warp-grid` **one max**, not hero wallpaper). Command dock = empty Ghostty-class terminal + prompt bar.
- **Sim session (B):** viewport = live twin; acid `#B8FF3C` only on active path/pose. Dock = streaming logs + task-rows.
- **Deploy/train (C):** dock widens toward **35%** if approval/pipeline needs air; viewport never drops below **60%**.

## Rail

- **Leading icon rail (command dock):** beautiful-ui `sidebar-nav` density + `tool-chips` for mode. Ice cyan outline on `#181919`, no fills.
- **Status rail (bottom or under chrome):** Geist Mono CAPS +2 tracking; icons 14–16px; values tabular. Cyan for idle metrics; acid only when a run is *live*.
- **Never** literal DimOS EARLY ACCESS modal or arcade wordmark in product chrome.

## Drawers

| Drawer | Opens from | Width | Mount cites |
| ------ | ---------- | ----- | ----------- |
| Agents | rail icon | 280–320px over dock | beautiful-ui `task-rows` + `thinking` |
| Sensors | rail icon | 280–320px | `records-table` / `filter-table` density |
| Scenes | rail icon | 320–360px | bakai `sidebars` + context cards |
| Checkpoints | rail icon | 280–320px | beautiful-ui `approval-card` + bakai `pipeline` |

- Drawers **slide over the command dock**, not the viewport (viewport stays the stage).
- Glass elevation +1 over dock; **3 elevations max** total (void → viewport → glass chrome).
- Command palette: center glass sheet (oa-design `modal` / `floating-pill` grammar) — cyan hairline, no white modal cosplay.

## Depth / signals

1. Void ink `#181919`
2. Viewport (spatial)
3. Glass chrome / dock / drawers
4. Sharp caret (ice cyan) — never blur glyphs

Acid `#B8FF3C` = live-in-viewport only. Cyan never as fill sludge.

## Mount map (real REGISTRY only)

| Need | Use |
| ---- | --- |
| Dock chrome / rows | beautiful-ui `sidebar-nav`, `task-rows`, `tool-chips`, `code-block`, `prompt-bar`, `streaming-text`, `thinking` |
| Pipeline / ops | bakai `pipeline`, `op-grid`, `sidebars`, `charts` |
| Spatial glass | arlan/oa glass sparingly; jakub `metal`/`gooey` **sparingly** |
| Grid texture | bakai `warp-grid` **or** `fade-grid` — **one**, never hero |
| Scroll | `scrollbar-but-cooler` |

## Kill (layout)

- Map as full-bleed marketing hero with no dock
- Command dock >40% at rest
- Drawers covering the viewport
- >3 glass elevations
- SaaS pill clusters / deep-blue / purple / Inter chrome
- Dimensional marks / EARLY ACCESS white modal

## Honesty

Opened brief + DimOS feel + Critique filter + beautiful-ui/bakai directory lists on DESKTOP. **I didn’t open:** DimOS PNG pixels this turn (paths cited in brief); pleo/ghia PDF pages this turn (already sorted into startup-brand-identity/systems). Would Yousef ship this shell grammar? **yes** if dual-signal + 70/30 holds.
