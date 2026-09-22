export type Mode = "empty" | "sim" | "train" | "deploy";

type Stat = { glyph: string; label: string; live?: boolean };

type Props = {
  mode: Mode;
  onMode?: (m: Exclude<Mode, "empty">) => void;
};

function statsFor(mode: Mode): Stat[] {
  if (mode === "empty") {
    return [
      { glyph: "○", label: "idle" },
      { glyph: "—", label: "Hz" },
      { glyph: "—", label: "bot" },
      { glyph: "—", label: "env" },
    ];
  }
  if (mode === "sim") {
    return [
      { glyph: "●", label: "online", live: true },
      { glyph: "120", label: "Hz", live: true },
      { glyph: "R1", label: "bot", live: true },
      { glyph: "env", label: "sim" },
    ];
  }
  return [
    { glyph: "●", label: "run", live: true },
    { glyph: "62", label: "%" },
    { glyph: "—", label: "bot" },
    { glyph: "042", label: "run" },
  ];
}

export function StatusRail({ mode, onMode }: Props) {
  const stats = statsFor(mode);
  return (
    <aside className="status-rail" aria-label="Status rail">
      <div className="status-stack">
        {stats.map((s) => (
          <div key={s.label} className={`status-cell${s.live ? " live" : ""}`}>
            <span className="status-glyph">{s.glyph}</span>
            <span className="status-label">{s.label}</span>
          </div>
        ))}
      </div>
      {onMode && (
        <div className="status-modes" role="tablist" aria-label="Mode">
          {(["sim", "train", "deploy"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              className={`status-mode${mode === m ? " active" : ""}`}
              aria-selected={mode === m}
              onClick={() => onMode(m)}
              title={m}
            >
              {m[0]}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
