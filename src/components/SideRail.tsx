export type Mode = "sim" | "train" | "deploy";

type Props = {
  mode: Mode;
  onMode: (m: Mode) => void;
};

export function SideRail({ mode, onMode }: Props) {
  return (
    <aside className="side-rail" aria-label="Mode rail">
      <div className="rail-mark" title="Labs">
        L
      </div>
      <div className="rail-modes">
        {(["sim", "train", "deploy"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={`mode-btn${mode === m ? " active" : ""}`}
            onClick={() => onMode(m)}
            aria-pressed={mode === m}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="rail-spacer" />
      <div className="rail-stat">idle · local</div>
    </aside>
  );
}
