const ROWS = [
  { id: "R1", status: "online", live: true },
  { id: "R2", status: "idle", live: false },
  { id: "cam-a", status: "stream", live: true },
];

export function RobotsDrawer() {
  return (
    <aside className="drawer glass-e2" aria-label="Robots">
      <div className="drawer-section">
        <h2>Robots</h2>
        <ul className="drawer-list">
          {ROWS.map((r) => (
            <li key={r.id} className={`drawer-row${r.live ? " live" : ""}`}>
              <span>{r.id}</span>
              <span className="drawer-status">{r.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="drawer-section">
        <h2>Sensors</h2>
        <p className="drawer-meta">lidar · imu · rgb</p>
      </div>
    </aside>
  );
}
