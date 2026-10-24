import { useEffect, useRef, useState } from 'react';

/**
 * The product's start screen, built in HTML and working: press record and the timer runs,
 * stop and it reports what it would have captured. Marked data-ui so the product's own
 * radii and control sizes apply inside it.
 */
export function RecorderFragment() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [narrate, setNarrate] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const stopped = useRef(false);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  const toggle = () => {
    if (recording) {
      setRecording(false);
      stopped.current = true;
    } else {
      stopped.current = false;
      setSeconds(0);
      setRecording(true);
    }
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const state = recording ? '录制中' : stopped.current ? '已停止' : '就绪';
  const hint = recording
    ? '正在记录：这一页 · 演示未上传'
    : stopped.current
      ? `演示录制 ${seconds} 秒 · 未上传`
      : '就绪，可以开始';

  return (
    <div className="rec" data-ui>
      <div className="rec-bar">
        <span className="dot" aria-hidden="true" />
        <span>Skill Recorder</span>
        <span className="rec-state" role="status">
          {state}
        </span>
      </div>

      <div className="rec-timer" aria-hidden="true">
        {mm}:{ss}
      </div>
      <p className="rec-hint" aria-live="polite">
        {hint}
      </p>

      <div className="rec-actions">
        <button
          type="button"
          className="rec-btn"
          aria-pressed={recording}
          aria-label={recording ? '停止录制' : '开始录制'}
          onClick={toggle}
        >
          <i aria-hidden="true" />
        </button>
      </div>

      <div className="rec-rows">
        <button
          type="button"
          className="rec-row"
          role="switch"
          aria-checked={narrate}
          onClick={() => setNarrate((v) => !v)}
        >
          <span>旁白 · 设备端转写</span>
          <span className="sw" data-on={narrate} aria-hidden="true">
            <i />
          </span>
        </button>
        <button
          type="button"
          className="rec-row"
          role="switch"
          aria-checked={terminal}
          onClick={() => setTerminal((v) => !v)}
        >
          <span>录制终端 · 本次会话</span>
          <span className="sw" data-on={terminal} aria-hidden="true">
            <i />
          </span>
        </button>
      </div>

      <ul className="rec-checks">
        <li>GitHub Copilot 已就绪</li>
        <li>Whisper · 离线 · 99 种语言</li>
      </ul>
      <p className="rec-keys">⌘⇧R / Ctrl+Shift+R 随时开关</p>
    </div>
  );
}
