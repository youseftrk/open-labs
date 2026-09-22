import { useState } from "react";
import { SideRail, type Mode } from "./components/SideRail";
import { SessionTabs } from "./components/SessionTabs";
import { ViewportPane } from "./components/ViewportPane";
import { TerminalPane } from "./components/TerminalPane";
import "./styles/tokens.css";
import "./App.css";

type Tab = { id: string; label: string };

export default function App() {
  const [mode, setMode] = useState<Mode>("sim");
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", label: "session 1" },
  ]);
  const [activeId, setActiveId] = useState("1");

  const addTab = () => {
    const id = String(Date.now());
    setTabs((t) => [...t, { id, label: `session ${t.length + 1}` }]);
    setActiveId(id);
  };

  return (
    <div className="app-shell">
      <SideRail mode={mode} onMode={setMode} />
      <div className="stage">
        <SessionTabs
          tabs={tabs}
          activeId={activeId}
          onSelect={setActiveId}
          onAdd={addTab}
        />
        <div className="workspace">
          <ViewportPane mode={mode} />
          <TerminalPane />
        </div>
      </div>
    </div>
  );
}
