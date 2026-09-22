type Props = { mode: "train" | "deploy" };

const PHASES = [
  { id: 1, name: "train", progress: 62 },
  { id: 2, name: "evaluate", progress: null },
  { id: 3, name: "deploy", progress: null },
];

export function StatusSheet({ mode }: Props) {
  const active = mode === "train" ? 1 : 3;
  return (
    <aside className="status-sheet glass-e2" aria-label="Run status">
      <h2>Run status</h2>
      <p className="sheet-sub">train → evaluate → deploy</p>
      <div className="phases">
        {PHASES.map((p) => {
          const isActive = p.id === active;
          return (
            <div key={p.id} className={`phase${isActive ? " active" : ""}`}>
              <div>
                <div className="phase-name">
                  {p.id} · {p.name}
                </div>
                <div className="phase-state">{isActive ? "active" : "queued"}</div>
              </div>
              <div className="phase-pct">{p.progress != null && isActive ? `${p.progress}%` : "—"}</div>
            </div>
          );
        })}
      </div>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: active === 1 ? "62%" : "8%" }} />
      </div>
      <p className="sheet-artifact">artifact: run-042/weights.pt</p>
      <p className="sheet-note">accent = acid green only on active phase</p>
    </aside>
  );
}
