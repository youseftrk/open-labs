import { useMemo, useState } from "react";
import { StatusRail, type Mode } from "./components/StatusRail";
import { TitleBar } from "./components/TitleBar";
import { SessionTabs } from "./components/SessionTabs";
import { ViewportPane } from "./components/ViewportPane";
import { TerminalPane } from "./components/TerminalPane";
import { RobotsDrawer } from "./components/RobotsDrawer";
import { StatusSheet } from "./components/StatusSheet";
import { CheckpointStrip } from "./components/CheckpointStrip";
import "./styles/tokens.css";
import "./App.css";

type Tab = { id: string; label: string };

export default function App() {
  const [mode, setMode] = useState<Mode>("empty");
  const [tabs, setTabs] = useState<Tab[]>([{ id: "1", label: "session" }]);
  const [activeId, setActiveId] = useState("1");

  const title = useMemo(() => {
    if (mode === "empty") return "Labs";
    if (mode === "sim") return "Labs — sim / warehouse-01";
    return `Labs — ${mode} · run-042`;
  }, [mode]);

  const addTab = () => {
    const id = String(Date.now());
    setTabs((t) => [...t, { id, label: `session ${t.length + 1}` }]);
    setActiveId(id);
  };

  const enterSim = () => setMode("sim");

  return (
    <div className={`app-shell layout-${mode}`}>
      <TitleBar title={title} />
      <div className="app-body">
        <StatusRail mode={mode} onMode={(m) => setMode(m)} />
        <div className="stage">
          {mode === "empty" ? (
            <ViewportPane mode="empty" onEnterSim={enterSim} />
          ) : mode === "sim" ? (
            <div className="workspace-b">
              <div className="col-main">
                <ViewportPane mode="sim" onEnterSim={enterSim} />
              </div>
              <div className="command-center" aria-label="Command center">
                <RobotsDrawer />
                <SessionTabs
                  tabs={tabs}
                  activeId={activeId}
                  onSelect={setActiveId}
                  onAdd={addTab}
                />
                <TerminalPane />
              </div>
            </div>
          ) : (
            <div className="workspace-c">
              <div className="col-main">
                <ViewportPane mode={mode} onEnterSim={enterSim} />
                <CheckpointStrip />
              </div>
              <div className="command-center" aria-label="Command center">
                <StatusSheet mode={mode} />
                <SessionTabs
                  tabs={tabs}
                  activeId={activeId}
                  onSelect={setActiveId}
                  onAdd={addTab}
                />
                <TerminalPane />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
