import { useState } from 'react';
import { AUTOMATION_MD, OTHER_SESSIONS, SESSION, SKILL_MD, STAGES, type Stage } from '../data/content';
import { d } from '../lib/reveal';

function ToolbarSpecimen() {
  const [micOn, setMicOn] = useState(true);
  const [termOn, setTermOn] = useState(true);

  return (
    <div className="hiw-card" data-ui>
      <div className="toolbar">
        <span className="tb-pill">
          <i aria-hidden="true" />
          00:39
        </span>
        <span className="font-medium text-ink">正在录制本地活动</span>
        <span className="tb-meta max-mob:hidden">窗口 · URL · 剪贴板 · 快照</span>
        <span className="tb-sep max-mob:hidden" aria-hidden="true" />
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="tb-chip-btn"
            aria-pressed={micOn}
            onClick={() => setMicOn((v) => !v)}
          >
            旁白 {micOn ? '开' : '静音'}
          </button>
          <button
            type="button"
            className="tb-chip-btn"
            aria-pressed={termOn}
            onClick={() => setTermOn((v) => !v)}
          >
            终端 {termOn ? '开' : '关'}
          </button>
        </div>
      </div>

      <div className="hiw-subgrid">
        <div className="hiw-subrow">
          <span className="hiw-tag">窗口焦点</span>
          <span className="hiw-val">Excel → Edge (Contoso News) → Teams</span>
          <span className="hiw-time">00:04 – 00:31</span>
        </div>
        <div className="hiw-subrow">
          <span className="hiw-tag">屏幕视频</span>
          <span className="hiw-val">仅画面变化与心跳周期保留低帧率快照 (8 帧)</span>
          <span className="hiw-time">本地存储</span>
        </div>
        <div className="hiw-subrow">
          <span className="hiw-tag">录制终端</span>
          <span className="hiw-val font-mono text-[12px]">
            {termOn ? '$ gh search prs --repo contoso/sdk --state merged' : '（本次会话未打开录制终端）'}
          </span>
          <span className="hiw-time">{termOn ? 'exit 0' : '已跳过'}</span>
        </div>
      </div>
    </div>
  );
}

function SessionCardSpecimen() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const all = [
    {
      name: SESSION.name,
      date: SESSION.date,
      duration: SESSION.duration,
      size: SESSION.size,
      steps: SESSION.steps,
      status: '已分析 · 6 步',
      active: true,
    },
    ...OTHER_SESSIONS.map((s) => ({ ...s, active: false })),
  ];

  return (
    <div className="hiw-card" data-ui>
      <div className="mini-card-head">
        <span>本地会话列表 (Sessions)</span>
        <span className="text-micro text-muted">存储在本地 · 点 Analyze 才上传</span>
      </div>

      <div className="session-list">
        {all.map((item, idx) => (
          <button
            key={item.name}
            type="button"
            className="session-row"
            data-selected={selectedIdx === idx}
            onClick={() => setSelectedIdx(idx)}
          >
            <div className="session-row-main">
              <span className="session-title">{item.name}</span>
              <span className="session-meta">
                {item.date} · {item.duration} · {item.size} · {item.steps} 步
              </span>
            </div>
            <div className="session-row-side">
              <span className={idx === 0 ? 'tb-pill' : 'tb-pill-muted'}>
                <i aria-hidden="true" />
                {item.status}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepsSpecimen() {
  const [steps, setSteps] = useState<string[]>(SESSION.list);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  return (
    <div className="hiw-card" data-ui>
      <div className="intent-box">
        <div className="flex items-center justify-between gap-2">
          <span className="intent-label">总体意图 (Intent · Copilot 还原)</span>
          <span className="intent-hint">点击下方任意步骤可直接微调文案</span>
        </div>
        <p className="intent-text">{SESSION.intent}</p>
      </div>

      <ol className="steps">
        {steps.map((step, i) => (
          <li key={i} className="step-item">
            {editingIdx === i ? (
              <input
                type="text"
                className="step-input"
                value={step}
                aria-label={`编辑第 ${i + 1} 步`}
                autoFocus
                onChange={(e) => {
                  const next = [...steps];
                  next[i] = e.target.value;
                  setSteps(next);
                }}
                onBlur={() => setEditingIdx(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Escape') setEditingIdx(null);
                }}
              />
            ) : (
              <button
                type="button"
                className="step-btn"
                onClick={() => setEditingIdx(i)}
                title="点击编辑此步骤"
              >
                <span>{step}</span>
                <span className="step-edit-tag">编辑</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function FileSpecimen() {
  const [mode, setMode] = useState<'skill' | 'automation'>('skill');
  const [copied, setCopied] = useState(false);
  const content = mode === 'skill' ? SKILL_MD : AUTOMATION_MD;

  const copyFile = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="hiw-card" data-ui>
      <div className="file-bar">
        <div className="file-tabs" role="tablist" aria-label="产物预览切换">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'skill'}
            className="file-tab"
            onClick={() => setMode('skill')}
          >
            Review SKILL.md（按需技能）
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'automation'}
            className="file-tab"
            onClick={() => setMode('automation')}
          >
            Automation（定时运行）
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="readonly-pill">只读预览 · 不写盘</span>
          <button type="button" className="copy" onClick={copyFile}>
            {copied ? '已复制' : '复制内容'}
          </button>
        </div>
      </div>

      <pre className="file">{content}</pre>
    </div>
  );
}

function Evidence({ kind }: { kind: Stage['fragment'] }) {
  if (kind === 'toolbar') return <ToolbarSpecimen />;
  if (kind === 'session') return <SessionCardSpecimen />;
  if (kind === 'steps') return <StepsSpecimen />;
  return <FileSpecimen />;
}

export function HowItWorks() {
  return (
    <section id="how" className="page-m scroll-mt-6 border-b border-hairline py-[64px] mob:py-[96px]" aria-labelledby="how-title">
      <div className="section-head flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-7">
        <div>
          <h2 id="how-title" className="text-h2 max-mob:text-[26px]" data-reveal>
            一次录制，四个动作。
          </h2>
          <p className="mt-2 max-w-[54ch] text-small text-muted" data-reveal style={d(60)}>
            从按下录制到产出可执行的 <code className="inline-code">SKILL.md</code>，同一张会话卡沿着「录 → 控 → 析 → 成」走完闭环。
          </p>
        </div>
        <span className="text-micro text-muted tabular-nums" data-reveal style={d(90)}>
          WORKFLOW · 01 — 04
        </span>
      </div>

      <ol className="mt-10 grid list-none gap-10 mob:mt-12 mob:gap-10">
        {STAGES.map((stage, i) => (
          <li
            key={stage.id}
            className="hiw-row grid items-start gap-6 border-b border-hairline pb-10 last:border-b-0 last:pb-0 mob:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] mob:gap-14"
          >
            <div className="hiw-copy" data-reveal style={d(60)}>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="stage-num">{stage.stepNo}</span>
                <span className="stage-badge">{stage.badge}</span>
              </div>
              <p className="max-w-[44ch] text-[17px] leading-[1.6] text-soft">
                <strong className="font-medium text-ink">{stage.runIn}</strong>
                {stage.body}
              </p>
              <p className="mt-3 text-micro text-muted">{stage.meta}</p>
            </div>

            <div data-reveal style={d(130)} className="min-w-0">
              <Evidence kind={stage.fragment} />
            </div>
            <span className="sr-only">{`第 ${i + 1} 步，共 ${STAGES.length} 步`}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
