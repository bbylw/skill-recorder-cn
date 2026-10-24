import { useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { AUTOMATION_MD, OTHER_SESSIONS, SESSION, SKILL_MD, STAGES, type Stage } from '../data/content';
import { d } from '../lib/reveal';
import { CopyButton } from '../components/CopyButton';

function getNextTab(event: ReactKeyboardEvent, current: number, count: number) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') return (current + 1) % count;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') return (current - 1 + count) % count;
  if (event.key === 'Home') return 0;
  if (event.key === 'End') return count - 1;
  return null;
}

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
          <span className="hiw-time">00:04 至 00:31</span>
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
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const content = mode === 'skill' ? SKILL_MD : AUTOMATION_MD;
  const modes = ['skill', 'automation'] as const;

  const selectMode = (index: number, focus = false) => {
    setMode(modes[index]);
    if (focus) tabs.current[index]?.focus();
  };

  return (
    <div className="hiw-card" data-ui>
      <div className="file-bar">
        <div className="file-tabs" role="tablist" aria-label="产物预览切换">
          {modes.map((item, index) => (
            <button
              key={item}
              ref={(node) => { tabs.current[index] = node; }}
              type="button"
              role="tab"
              id={`file-tab-${item}`}
              aria-selected={mode === item}
              aria-controls="generated-file-content"
              tabIndex={mode === item ? 0 : -1}
              className="file-tab"
              onClick={() => selectMode(index)}
              onKeyDown={(event) => {
                const next = getNextTab(event, index, modes.length);
                if (next === null) return;
                event.preventDefault();
                selectMode(next, true);
              }}
            >
              {item === 'skill' ? 'SKILL.md' : 'Automation'}
            </button>
          ))}
        </div>

        <div className="file-actions">
          <span className="readonly-pill">只读预览，不写盘</span>
          <CopyButton text={content} label="复制内容" target="generated-file-content" />
        </div>
      </div>

      <pre
        className="file"
        id="generated-file-content"
        role="tabpanel"
        aria-labelledby={`file-tab-${mode}`}
        tabIndex={0}
      >{content}</pre>
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
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const stage = STAGES[active];

  const selectStage = (index: number, focus = false) => {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  };

  return (
    <section id="how" className="page-m section-block scroll-mt-24" aria-labelledby="how-title">
      <div className="section-head">
        <h2 id="how-title" data-reveal>一次录制，四个动作。</h2>
        <p data-reveal style={d(60)}>
          从本地捕获到生成 <code className="inline-code">SKILL.md</code>，在同一张会话卡里完成整个流程。
        </p>
      </div>

      <div className="workflow-layout" data-reveal style={d(100)}>
        <div className="workflow-tabs" role="tablist" aria-label="录制工作流程">
          {STAGES.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => { tabs.current[index] = node; }}
              type="button"
              role="tab"
              id={`stage-tab-${item.id}`}
              aria-selected={active === index}
              aria-controls="stage-panel"
              tabIndex={active === index ? 0 : -1}
              className="workflow-tab"
              onClick={() => selectStage(index)}
              onKeyDown={(event) => {
                const next = getNextTab(event, index, STAGES.length);
                if (next === null) return;
                event.preventDefault();
                selectStage(next, true);
              }}
            >
              <span className="stage-num">{item.stepNo}</span>
              <span className="workflow-tab-copy">
                <strong>{item.runIn}</strong>
                <span>{item.badge.split(' · ')[0]}</span>
              </span>
              <ArrowRightIcon className="workflow-arrow" size={18} aria-hidden="true" />
            </button>
          ))}
        </div>

        <article
          key={stage.id}
          id="stage-panel"
          className="workflow-panel answer-swap"
          role="tabpanel"
          aria-labelledby={`stage-tab-${stage.id}`}
          tabIndex={0}
        >
          <div className="workflow-panel-head">
            <span className="stage-badge">{stage.badge}</span>
            <h3>{stage.runIn}</h3>
            <p>{stage.body}</p>
            <p className="workflow-meta">{stage.meta}</p>
          </div>
          <Evidence kind={stage.fragment} />
        </article>
      </div>
    </section>
  );
}
