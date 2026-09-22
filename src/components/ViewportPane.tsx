import { invoke } from "@tauri-apps/api/core";
import type { Mode } from "./StatusRail";

type Props = {
  mode: Mode;
  onEnterSim: () => void;
};

const isTauri = () =>
  typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export function ViewportPane({ mode, onEnterSim }: Props) {
  const runHelloTwin = () => {
    if (isTauri()) {
      invoke("run_hello_twin").catch(console.error);
    } else {
      console.info("→ intending: open-physical-sim hello twin / python scripts/hello_twin.py");
    }
  };

  if (mode === "empty") {
    return (
      <div className="viewport empty">
        <div className="empty-stage">
          <h1 className="wordmark">Labs</h1>
          <p className="tagline">Open a sim, attach a robot, or paste a session.</p>
          <div className="glass-actions">
            <button type="button" className="glass-pill primary" onClick={onEnterSim}>
              New sim session
            </button>
            <button type="button" className="glass-pill" onClick={onEnterSim}>
              Open env
            </button>
            <button type="button" className="glass-pill">
              Connect robot
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "sim") {
    return (
      <div className="viewport">
        <div className="viewport-stage">
          <div className="viewport-toolbar">
            <span className="viewport-label">viewport · physical-sim</span>
            <button type="button" className="glass-pill primary" onClick={runHelloTwin}>
              Run hello twin
            </button>
          </div>
          <div className="viewport-body sim-grid">
            <div className="robot-proxy" aria-hidden="true">
              R1
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* train / deploy — dimmed viewport plane */
  return (
    <div className="viewport dimmed">
      <div className="viewport-stage">
        <div className="viewport-toolbar">
          <span className="viewport-label">viewport · dimmed during {mode}</span>
        </div>
        <div className="viewport-body muted-body">
          <p className="tagline">Stage holds while {mode} runs.</p>
        </div>
      </div>
    </div>
  );
}
