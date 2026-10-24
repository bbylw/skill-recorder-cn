import { useEffect, useState } from 'react';
import { d } from '../lib/reveal';

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

  return (
    <section
      className="stage-light relative overflow-clip max-mob:py-[56px] mob:flex mob:min-h-[48svh] mob:items-center"
      data-on={on}
      aria-labelledby="key-title"
    >
      <div className="page-m mob:max-w-[48%]">
        <h2
          id="key-title"
          className="text-[clamp(28px,2.2vw,32px)] leading-[1.06] max-mob:text-[26px]"
          data-reveal
        >
          {on ? '再按一次，停。' : '一个键，开录。'}
        </h2>
        <p className="mt-4 max-w-[40ch] text-[17px] opacity-70" data-reveal style={d(90)}>
          按下去计时开始；再按一次，这一段就变成六步。
        </p>
      </div>

      <button
        type="button"
        className="bigrec max-mob:relative max-mob:mb-[-24%] max-mob:ml-[18%] max-mob:mt-12 mob:absolute mob:right-[-9%] mob:top-1/2 mob:-translate-y-1/2"
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
      </button>
    </section>
  );
}
