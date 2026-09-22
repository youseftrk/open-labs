type Props = { title: string };

export function TitleBar({ title }: Props) {
  return (
    <header className="titlebar" data-tauri-drag-region>
      <div className="traffic" aria-hidden="true">
        <span className="dot close" />
        <span className="dot min" />
        <span className="dot max" />
      </div>
      <div className="titlebar-label">{title}</div>
    </header>
  );
}
