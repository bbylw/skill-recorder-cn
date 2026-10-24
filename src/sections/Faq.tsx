import { useRef, useState } from 'react';
import { FAQ, REPO } from '../data/content';
import { d } from '../lib/reveal';

export function Faq() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    setActive(index);
    if (window.matchMedia('(max-width: 899px)').matches) {
      window.setTimeout(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
    }
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
      className="page-m grid gap-10 py-[52px] mob:grid-cols-[5fr_7fr] mob:gap-14 mob:py-[80px]"
      aria-labelledby="faq-title"
    >
      <div>
        <h2 id="faq-title" className="mb-4 text-[18px] font-normal text-muted" data-reveal>
          常见问题
        </h2>
        <div role="tablist" aria-orientation="vertical" aria-labelledby="faq-title" className="grid">
          {FAQ.map((item, index) => (
            <button
              key={item.q}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`faq-tab-${index}`}
              aria-selected={index === active}
              aria-controls="faq-answer"
              tabIndex={index === active ? 0 : -1}
              className="qbtn"
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <i aria-hidden="true" />
              {item.q}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={panel}
        id="faq-answer"
        role="tabpanel"
        aria-labelledby={`faq-tab-${active}`}
        tabIndex={0}
        className="mob:sticky mob:top-[110px] mob:h-max"
        data-reveal
        style={d(80)}
      >
        <p key={active} className="answer-swap text-[clamp(21px,1.9vw,25px)] leading-[1.3] max-mob:text-[19px]">
          {FAQ[active].short}
        </p>
        <p key={`a-${active}`} className="answer-swap mt-4 max-w-[54ch] text-soft">
          {FAQ[active].a}
        </p>

        <div className="mt-10">
          <p className="text-micro text-muted">没有答案？</p>
          <p className="mt-1.5 text-small">
            <a
              className="text-ink underline decoration-[#4a4a4a] underline-offset-4 transition-colors hover:decoration-muted"
              href={`${REPO}/issues`}
              rel="noreferrer"
              target="_blank"
            >
              在 GitHub Issues 提问
            </a>
            <span className="text-muted"> · 先搜索已有 Issue，避免重复</span>
          </p>
        </div>
      </div>
    </section>
  );
}
