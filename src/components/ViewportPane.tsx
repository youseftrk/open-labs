import { invoke } from "@tauri-apps/api/core";
import type { Mode } from "./SideRail";

type Props = {
  mode: Mode;
};

const isTauri = () =>
  typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export function ViewportPane({ mode }: Props) {
  const runHelloTwin = () => {
    if (isTauri()) {
      invoke("run_hello_twin").catch(console.error);
    } else {
      console.info("→ intending: open-physical-sim hello twin");
    }
  };

  if (mode === "sim") {
    return (
      <div className="viewport">
        <div className="viewport-inner">
          <div className="viewport-toolbar">
            <span className="viewport-label">Viewport · sim</span>
            <button type="button" className="glass-pill primary" onClick={runHelloTwin}>
              Run hello twin
            </button>
          </div>
          <div className="viewport-body">
            <h1 className="wordmark">Labs</h1>
            <p className="tagline">
              Sim stage placeholder — MuJoCo / Open Physical Sim attaches here.
            </p>
            <div className="glass-actions">
              <button type="button" className="glass-pill primary" onClick={runHelloTwin}>
                Run hello twin
              </button>
              <button type="button" className="glass-pill">
                New sim session
              </button>
              <button type="button" className="glass-pill">
                Open env
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "train") {
    return (
      <div className="viewport">
        <div className="viewport-inner">
          <div className="mode-panel">
            <h2>Train</h2>
            <div className="mode-card">
              <p>Kick BC / eval jobs. Live success_rate and loss will land here.</p>
              <div className="mode-meta">
                <div>
                  <span>phase</span>
                  <br />
                  <strong>idle</strong>
                </div>
                <div>
                  <span>success_rate</span>
                  <br />
                  <strong>—</strong>
                </div>
                <div>
                  <span>loss</span>
                  <br />
                  <strong>—</strong>
                </div>
                <div>
                  <span>ETA</span>
                  <br />
                  <strong>—</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="viewport">
      <div className="viewport-inner">
        <div className="mode-panel">
          <h2>Deploy</h2>
          <div className="mode-card">
            <p>Env registry (envc) and what’s running where — stubs for v0.</p>
            <div className="mode-meta">
              <div>
                <span>env</span>
                <br />
                <strong>local</strong>
              </div>
              <div>
                <span>robot link</span>
                <br />
                <strong>offline</strong>
              </div>
              <div>
                <span>artifact</span>
                <br />
                <strong>—</strong>
              </div>
              <div>
                <span>status</span>
                <br />
                <strong>idle</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
