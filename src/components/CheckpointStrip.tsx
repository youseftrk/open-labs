const CKPTS = ["ckpt-01", "ckpt-02", "ckpt-03 · live", "ckpt-04"];

export function CheckpointStrip() {
  return (
    <div className="ckpt-strip glass-e1" aria-label="Checkpoints">
      {CKPTS.map((c, i) => (
        <div key={c} className={`ckpt${i === 2 ? " live" : ""}`}>
          {c}
        </div>
      ))}
    </div>
  );
}
