import { useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react';
import { FAQ, REPO } from '../data/content';
import { d } from '../lib/reveal';

export function Faq() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (next: number) => {
    const wrapped = (next + FAQ.length) % FAQ.length;
    setActive(wrapped);
    tabs.current[wrapped]?.focus();
  };

  return (
    <section id="faq" className="page-m section-block scroll-mt-24" aria-labelledby="faq-title">
      <div className="section-head">
        <h2 id="faq-title" data-reveal>常见问题</h2>
        <p data-reveal style={d(60)}>数据边界、平台支持、安装与登录，集中回答第一次使用前最关心的问题。</p>
      </div>

      <div className="faq-layout faq-desktop">
        <div role="tablist" aria-orientation="vertical" aria-labelledby="faq-title" className="faq-list" data-reveal>
          {FAQ.map((item, index) => (
            <button
              key={item.q}
              ref={(node) => { tabs.current[index] = node; }}
              type="button"
              role="tab"
              id={`faq-tab-${index}`}
              aria-selected={index === active}
              aria-controls="faq-answer"
              tabIndex={index === active ? 0 : -1}
              className="qbtn"
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') { event.preventDefault(); move(index + 1); }
                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') { event.preventDefault(); move(index - 1); }
                if (event.key === 'Home') { event.preventDefault(); move(0); }
                if (event.key === 'End') { event.preventDefault(); move(FAQ.length - 1); }
              }}
            >
              <span className="qbtn-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="qbtn-text">{item.q}</span>
              <CaretRightIcon size={17} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div
          id="faq-answer"
          role="tabpanel"
          aria-labelledby={`faq-tab-${active}`}
          tabIndex={0}
          className="faq-pane"
          data-reveal
          style={d(70)}
        >
          <div className="faq-pane-head">
            <span className="faq-tag">{FAQ[active].tag}</span>
            <span className="faq-count">{String(active + 1).padStart(2, '0')} / {String(FAQ.length).padStart(2, '0')}</span>
          </div>
          <p key={active} className="answer-swap faq-short">{FAQ[active].short}</p>
          <p key={`answer-${active}`} className="answer-swap faq-full">{FAQ[active].a}</p>
          <div className="faq-pane-foot">
            <a href={`${REPO}/issues`} rel="noreferrer" target="_blank" className="faq-issue-link">
              <span>在 GitHub Issues 提问</span><ArrowUpRightIcon size={16} aria-hidden="true" />
            </a>
            <div className="faq-nav">
              <button type="button" className="icon-btn" onClick={() => move(active - 1)} aria-label="上一条问题"><ArrowLeftIcon size={17} aria-hidden="true" /></button>
              <button type="button" className="icon-btn" onClick={() => move(active + 1)} aria-label="下一条问题"><ArrowRightIcon size={17} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-mobile-list">
        {FAQ.map((item, index) => {
          const isOpen = index === active;
          return (
            <div className="faq-mobile-item" key={item.q} data-open={isOpen}>
              <button
                type="button"
                id={`faq-mobile-tab-${index}`}
                className="faq-mobile-question"
                aria-expanded={isOpen}
                aria-controls={`faq-mobile-answer-${index}`}
                onClick={() => setActive(index)}
              >
                <span className="qbtn-num">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.q}</span>
                <CaretDownIcon size={18} aria-hidden="true" />
              </button>
              {isOpen && (
                <div id={`faq-mobile-answer-${index}`} role="region" aria-labelledby={`faq-mobile-tab-${index}`} className="faq-mob-answer">
                  <span className="faq-tag">{item.tag}</span>
                  <p className="faq-short">{item.short}</p>
                  <p className="faq-full">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
        <a href={`${REPO}/issues`} rel="noreferrer" target="_blank" className="faq-issue-link">
          <span>在 GitHub Issues 提问</span><ArrowUpRightIcon size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
