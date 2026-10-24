import { useEffect, useState } from 'react';

type PresetKey = 'research' | 'triage' | 'expense';

const PRESETS: Record<
  PresetKey,
  {
    label: string;
    events: Array<{ at: string; channel: string; text: string }>;
  }
> = {
  research: {
    label: '周度客户研究',
    events: [
      { at: '00:01', channel: '窗口', text: 'Excel · research-tracker.xlsx (第 1 行: Contoso)' },
      { at: '00:03', channel: 'URL', text: 'bing.com/news/search?q=Contoso+financing' },
      { at: '00:05', channel: '剪贴板', text: '复制摘录：「完成 B 轮扩充并发布自动化套件…」' },
      { at: '00:07', channel: '旁白', text: '“把结论写回 notes 列，附上来源链接，再发 Teams”' },
      { at: '00:09', channel: '终端', text: 'gh api /repos/contoso/sdk/releases/latest' },
    ],
  },
  triage: {
    label: 'Issue 自动分拣',
    events: [
      { at: '00:01', channel: '窗口', text: 'Browser · github.com/microsoft/skill-recorder/issues' },
      { at: '00:03', channel: '终端', text: 'gh issue list --label "needs-triage" --limit 10' },
      { at: '00:05', channel: '旁白', text: '“按报错日志复现平台归类 Windows 或 macOS 标签”' },
      { at: '00:07', channel: '终端', text: 'gh issue edit 142 --add-label "os:windows,p1"' },
    ],
  },
  expense: {
    label: '报销单批量核对',
    events: [
      { at: '00:01', channel: '窗口', text: 'Finder · ~/Downloads/receipts-2026-09/' },
      { at: '00:03', channel: '剪贴板', text: '复制发票号：INV-202609-0842 · ¥1,280.00' },
      { at: '00:05', channel: '旁白', text: '“逐张核对金额与税号，不一致的标红写入汇总表”' },
      { at: '00:07', channel: '终端', text: 'node scripts/verify-invoices.mjs --month 2026-09' },
    ],
  },
};

/**
 * The product's start screen, built in HTML and working: press record and the timer runs,
 * live local capture events stream in, and stopping lets you jump straight to analysis.
 */
export function RecorderFragment() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [narrate, setNarrate] = useState(true);
  const [terminal, setTerminal] = useState(true);
  const [preset, setPreset] = useState<PresetKey>('research');
  const [hasStopped, setHasStopped] = useState(false);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  const toggle = () => {
    if (recording) {
      setRecording(false);
      setHasStopped(true);
    } else {
      setHasStopped(false);
      setSeconds(0);
      setRecording(true);
    }
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const state = recording ? '录制中 · 本地' : hasStopped ? '已捕获 · 待分析' : '就绪';
  const hint = recording
    ? `正在本地捕获「${PRESETS[preset].label}」· 0 字节上传`
    : hasStopped
      ? `已捕获 ${ Math.max(seconds, 1) } 秒本地会话 · 点击 Analyze 才会上传`
      : '点击红键试录一次，观察本地捕获流如何工作';

  const currentEvents = PRESETS[preset].events.filter((event) => {
    if (event.channel === '旁白') return narrate;
    if (event.channel === '终端') return terminal;
    return true;
  });
  const visibleCount = recording
    ? Math.min(currentEvents.length, Math.floor(seconds / 2) + 1)
    : hasStopped
      ? currentEvents.length
      : Math.min(currentEvents.length, 2);

  return (
    <div className="rec" data-ui data-recording={recording}>
      {/* Window Top Bar */}
      <div className="rec-bar">
        <span className={recording ? 'dot pulse' : 'dot'} aria-hidden="true" />
        <span className="font-medium text-ink">Skill Recorder</span>
        <span className="rec-tag">LOCAL CAPTURE</span>
        <span className="rec-state" role="status" data-active={recording}>
          {state}
        </span>
      </div>

      {/* Preset Selector Strip */}
      <div className="rec-presets" role="group" aria-label="演示任务场景">
        <span className="rec-presets-label">演练场景</span>
        <div className="rec-presets-btns">
          {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className="rec-preset-btn"
              aria-pressed={preset === key}
              disabled={recording}
              onClick={() => {
                setPreset(key);
                setHasStopped(false);
                setSeconds(0);
              }}
            >
              {PRESETS[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Timer & Main Record Button Stage */}
      <div className="rec-stage">
        <div className="rec-timer-wrap">
          <div className="rec-timer" aria-hidden="true">
            {mm}:{ss}
          </div>
          <p className="rec-hint" aria-live="polite">
            {hint}
          </p>
        </div>

        <div className="rec-actions">
          <button
            type="button"
            className="rec-btn"
            aria-pressed={recording}
            aria-label={recording ? '停止录制' : '开始录制'}
            onClick={toggle}
          >
            <span className="rec-btn-ring" aria-hidden="true" />
            <i aria-hidden="true" />
          </button>
          <span className="rec-btn-caption">
            {recording ? '点击停止录制' : hasStopped ? '重新录制' : '点击开始录制'}
          </span>
        </div>
      </div>

      {/* Capture Switches */}
      <div className="rec-rows">
        <button
          type="button"
          className="rec-row"
          role="switch"
          aria-checked={narrate}
          onClick={() => setNarrate((v) => !v)}
        >
          <div className="rec-row-left">
            <span className="rec-row-title">旁白 · 设备端转写</span>
            <span className="rec-row-sub">Whisper 离线模型 · 99 种语言</span>
          </div>
          <div className="rec-row-right">
            {narrate && (
              <span className="mic-bars" data-live={recording} aria-hidden="true">
                <b />
                <b />
                <b />
                <b />
              </span>
            )}
            <span className="sw" data-on={narrate} aria-hidden="true">
              <i />
            </span>
          </div>
        </button>

        <button
          type="button"
          className="rec-row"
          role="switch"
          aria-checked={terminal}
          onClick={() => setTerminal((v) => !v)}
        >
          <div className="rec-row-left">
            <span className="rec-row-title">录制终端 · 本次会话专属</span>
            <span className="rec-row-sub">捕获 cwd / 命令 / 退出码 · 无全局钩子</span>
          </div>
          <div className="rec-row-right">
            <span className="rec-chip">{terminal ? 'PTY 已挂载' : '未启用'}</span>
            <span className="sw" data-on={terminal} aria-hidden="true">
              <i />
            </span>
          </div>
        </button>
      </div>

      {/* Live Local Event Stream */}
      <div className="rec-feed">
        <div className="rec-feed-head">
          <span>本地事件时间线（预览）</span>
          <span className="tabular-nums">
            {recording ? `实时写入中 · ${visibleCount} 条` : hasStopped ? `共 ${visibleCount} 条事件` : '待命示例'}
          </span>
        </div>
        <ul className="rec-feed-list" aria-label="捕获事件预览">
          {currentEvents.slice(0, visibleCount).map((ev, idx) => (
            <li key={`${preset}-${ev.at}-${idx}`} className="rec-feed-item">
              <span className="rec-feed-time">{ev.at}</span>
              <span className="rec-feed-chan">{ev.channel}</span>
              <span className="rec-feed-txt">{ev.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Readiness & Shortcut Footer */}
      <div className="rec-foot">
        <ul className="rec-checks">
          <li>GitHub Copilot CLI 1.0.78 已就绪</li>
          <li>PII / 机密脱敏扫描已启用</li>
        </ul>
        <div className="rec-foot-right">
          {hasStopped ? (
            <a href="#how" className="rec-analyze-link">
              Analyze 还原步骤
            </a>
          ) : (
            <span className="rec-keys">⌘⇧R / Ctrl+Shift+R</span>
          )}
        </div>
      </div>
    </div>
  );
}
