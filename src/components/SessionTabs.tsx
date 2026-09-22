type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  activeId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
};

export function SessionTabs({ tabs, activeId, onSelect, onAdd }: Props) {
  return (
    <div className="session-tabs" role="tablist" aria-label="Sessions">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={t.id === activeId}
          className={`tab-pill${t.id === activeId ? " active" : ""}`}
          onClick={() => onSelect(t.id)}
        >
          {t.label}
        </button>
      ))}
      <button type="button" className="tab-pill add" onClick={onAdd} title="New session">
        +
      </button>
    </div>
  );
}
