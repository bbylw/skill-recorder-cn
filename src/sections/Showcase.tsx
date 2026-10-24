import { useEffect, useState } from 'react';
import { SESSION } from '../data/content';
import { d } from '../lib/reveal';

const TIMELINE_BEATS = [
  { at: '00:00', signal: '窗口焦点', detail: '打开 Excel · research-tracker.xlsx' },
  { at: '00:08', signal: '浏览器 URL', detail: '检索 Contoso 近期新闻与融资动态' },
  { at: '00:17', signal: '连续操作', detail: '依次查完 Fabrikam 与 Northwind' },
  { at: '00:25', signal: '剪贴板写入', detail: '把结论写回 notes 列，保留来源链接' },
  { at: '00:32', signal: '语音旁白', detail: '“生成汇总，确认每个客户都有结论”' },
  { at: '00:39', signal: '原生工具', detail: '调用 Teams 工具发送到 #Research 频道' },
];

export function Showcase() {
  const [on, setOn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [on]);

  const toggle = () => {
    if (!on) setSeconds(0);
    setOn((value) => !value);
  };

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const activeStepIdx = on ? seconds % TIMELINE_BEATS.length : -1;

  return (
    <section id="showcase" className="showcase-section section-block scroll-mt-24" data-on={on} aria-labelledby="key-title">
      <div className="page-m">
        <div className="showcase-stage">
          <div className="showcase-copy">
            <div className="showcase-kicker" data-reveal>
              <span className="showcase-dot" aria-hidden="true" />
              <span>{on ? `正在本地记录 · ${clock}` : '交互演练 · 桌面快捷键 ⌘⇧R / Ctrl+Shift+R'}</span>
            </div>
            <h2 id="key-title" data-reveal>{on ? '再按一次，停。' : '一个键，开录。'}</h2>
            <p data-reveal style={d(70)}>
              {on
                ? '正在模拟捕获桌面动作、语音旁白与终端命令。停止后，时间线会成为可审阅的步骤。'
                : '按下录制键开始计时，看看一段真实操作如何被拆成六条清晰、可复用的步骤。'}
            </p>

            <div className="showcase-ledger" data-ui data-reveal style={d(120)}>
              <div className="showcase-ledger-head">
                <span>{SESSION.name}</span>
                <span className="tabular-nums">{on ? `第 ${activeStepIdx + 1} / 6 拍` : '39 秒会话拆解'}</span>
              </div>
              <ol className="showcase-ledger-list">
                {TIMELINE_BEATS.map((beat, index) => (
                  <li key={beat.at} className="showcase-ledger-row" data-active={activeStepIdx === index}>
                    <span className="showcase-at">{beat.at}</span>
                    <span className="showcase-sig">{beat.signal}</span>
                    <span className="showcase-det">{beat.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bigrec-wrap">
            <button
              type="button"
              className="bigrec"
              aria-pressed={on}
              aria-label={on ? '停止录制演练' : '开始录制演练'}
              onClick={toggle}
              data-reveal
              style={d(150)}
            >
              <span className={on ? 'lbl live' : 'lbl'} aria-hidden="true">{on ? `正在录制 · ${clock}` : '按下开录'}</span>
              <i aria-hidden="true" />
              <span className="bigrec-sub" aria-hidden="true">{on ? '点击停止并查看步骤' : '39s → SKILL.md'}</span>
            </button>
          </div>
        </div>

        <figure className="product-shot" data-reveal>
          <div className="product-shot-heading">
            <span>真实产品界面</span>
            <h3>从时间线，到可编辑的步骤。</h3>
          </div>
          <div className="product-shot-frame">
            <img
              src="/shots/library.png"
              alt="Skill Recorder 会话分析界面，左侧为本地会话，右侧为还原出的意图与六个可编辑步骤"
              width="1080"
              height="901"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            <span>本地会话与意图还原</span>
            <span>审阅、编辑，再创建技能或自动化</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
