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
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [on]);

  const toggle = () => {
    if (!on) setSeconds(0);
    setOn((v) => !v);
  };

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const activeStepIdx = on ? seconds % TIMELINE_BEATS.length : -1;

  return (
    <section
      id="showcase"
      className="stage-light relative overflow-clip border-b border-hairline py-[60px] mob:min-h-[60svh] mob:py-[80px]"
      data-on={on}
      aria-labelledby="key-title"
    >
      <div className="page-m relative z-10 grid items-center gap-10 mob:grid-cols-[minmax(0,560px)_1fr]">
        <div className="min-w-0">
          <div className="showcase-kicker" data-reveal>
            <span className="showcase-dot" aria-hidden="true" />
            <span>{on ? `LIVE CAPTURE · ${clock}` : 'INTERACTIVE STAGE · ⌘⇧R / Ctrl+Shift+R'}</span>
          </div>

          <h2
            id="key-title"
            className="mt-3 text-[clamp(30px,2.8vw,42px)] leading-[1.08] max-mob:text-[28px]"
            data-reveal
          >
            {on ? '再按一次，停。' : '一个键，开录。'}
          </h2>
          <p className="mt-3.5 max-w-[44ch] text-[17px] opacity-80" data-reveal style={d(80)}>
            {on
              ? '正在模拟捕获你的桌面动作、语音旁白与终端命令；再按一次右侧录制键即可定格成六步计划。'
              : '按下去计时开始；再按一次，这一段 39 秒的真实操作就变成六条可读、可改、可复用的步骤。'}
          </p>

          {/* Interactive 39s Session Breakdown Card filling the lower-left stage */}
          <div className="showcase-ledger mt-8" data-ui data-reveal style={d(140)}>
            <div className="showcase-ledger-head">
              <span>{SESSION.name} · 39s 会话拆解</span>
              <span className="tabular-nums">
                {on ? `正在记录第 ${activeStepIdx + 1}/6 拍` : '点击右侧巨型录制键体验'}
              </span>
            </div>
            <ol className="showcase-ledger-list">
              {TIMELINE_BEATS.map((beat, idx) => (
                <li
                  key={beat.at}
                  className="showcase-ledger-row"
                  data-active={activeStepIdx === idx}
                >
                  <span className="showcase-at">{beat.at}</span>
                  <span className="showcase-sig">{beat.signal}</span>
                  <span className="showcase-det">{beat.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right Giant Record Control — properly sized & unclipped */}
        <div className="flex items-center justify-center mob:justify-end">
          <button
            type="button"
            className="bigrec"
            aria-pressed={on}
            aria-label={on ? '停止录制' : '开始录制'}
            onClick={toggle}
            data-reveal
            style={d(160)}
          >
            <span className={on ? 'lbl live' : 'lbl'} aria-hidden="true">
              {on ? `正在录制 · ${clock}` : '按下开录'}
            </span>
            <i aria-hidden="true" />
            <span className="bigrec-sub" aria-hidden="true">
              {on ? '点击停止并生成 6 步' : '39s → SKILL.md'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
