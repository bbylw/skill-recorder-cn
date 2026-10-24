import { useRef, useState } from 'react';
import { FAQ, REPO } from '../data/content';
import { d } from '../lib/reveal';

export function Faq() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    setActive(index);
  };

  const move = (next: number) => {
    const clamped = (next + FAQ.length) % FAQ.length;
    setActive(clamped);
    tabs.current[clamped]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(index + 1);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      move(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      move(FAQ.length - 1);
    }
  };

  return (
    <section
      id="faq"
      className="page-m scroll-mt-6 border-b border-hairline py-[64px] mob:py-[96px]"
      aria-labelledby="faq-title"
    >
      <div className="section-head flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-7">
        <div>
          <h2 id="faq-title" className="text-h2 max-mob:text-[26px]" data-reveal>
            常见问题
          </h2>
          <p className="mt-2 max-w-[52ch] text-small text-muted" data-reveal style={d(60)}>
            关于数据何时离开电脑、Windows 与 macOS 支持边界、零依赖安装与两步浏览器登录的关键解答。
          </p>
        </div>
        <span className="text-micro text-muted tabular-nums" data-reveal style={d(90)}>
          FAQ · 01 — 0{FAQ.length}
        </span>
      </div>

      <div className="mt-10 grid gap-10 mob:mt-12 mob:grid-cols-[5fr_7fr] mob:gap-14">
        <div role="tablist" aria-orientation="vertical" aria-labelledby="faq-title" className="faq-list">
          {FAQ.map((item, index) => {
            const isSelected = index === active;
            return (
              <div key={item.q} className="faq-row-wrap">
                <button
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`faq-tab-${index}`}
                  aria-selected={isSelected}
                  aria-controls="faq-answer"
                  tabIndex={isSelected ? 0 : -1}
                  className="qbtn"
                  onClick={() => select(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span className="qbtn-num">{String(index + 1).padStart(2, '0')}</span>
                  <i aria-hidden="true" />
                  <span className="qbtn-text">{item.q}</span>
                </button>

                {/* Mobile inline answer disclosure */}
                {isSelected && (
                  <div className="faq-mob-answer mob:hidden">
                    <span className="faq-tag">{item.tag}</span>
                    <p className="mt-2 text-[18px] font-medium leading-[1.35] text-ink">{item.short}</p>
                    <p className="mt-2.5 text-[15px] leading-[1.6] text-soft">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Sticky Answer Sheet */}
        <div
          id="faq-answer"
          role="tabpanel"
          aria-labelledby={`faq-tab-${active}`}
          tabIndex={0}
          className="faq-pane max-mob:hidden mob:sticky mob:top-[48px] mob:h-max"
          data-reveal
          style={d(80)}
        >
          <div className="faq-pane-head">
            <span className="faq-tag">{FAQ[active].tag}</span>
            <span className="text-micro text-muted tabular-nums">
              0{active + 1} / 0{FAQ.length}
            </span>
          </div>

          <p key={active} className="answer-swap mt-4 text-[clamp(22px,2vw,27px)] font-medium leading-[1.28] text-ink">
            {FAQ[active].short}
          </p>
          <p key={`a-${active}`} className="answer-swap mt-4 max-w-[56ch] text-[16.5px] leading-[1.65] text-soft">
            {FAQ[active].a}
          </p>

          <div className="faq-pane-foot mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5">
            <div>
              <p className="text-micro text-muted">还有其他疑问？</p>
              <p className="mt-1 text-small">
                <a
                  className="text-ink underline decoration-[#4a4a4a] underline-offset-4 transition-colors hover:decoration-muted"
                  href={`${REPO}/issues`}
                  rel="noreferrer"
                  target="_blank"
                >
                  在 GitHub Issues 提问 ↗
                </a>
                <span className="text-muted"> · 请先搜索已有 Issue，避免重复</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="faq-nav-btn"
                onClick={() => move(active - 1)}
                aria-label="上一条问题"
              >
                ←
              </button>
              <button
                type="button"
                className="faq-nav-btn"
                onClick={() => move(active + 1)}
                aria-label="下一条问题"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
