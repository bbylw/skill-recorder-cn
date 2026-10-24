import { SESSION, SKILL_MD, STAGES, type Stage } from '../data/content';
import { d } from '../lib/reveal';

function Toolbar() {
  return (
    <div className="toolbar" data-ui>
      <span className="tb-pill">
        <i aria-hidden="true" />
        00:39
      </span>
      <span>正在录制</span>
      <span className="tb-meta max-mob:hidden">窗口 · 剪贴板 · 终端</span>
      <span className="tb-sep max-mob:hidden" aria-hidden="true" />
      <span className="tb-meta max-mob:ml-auto">旁白 开 · 终端 开</span>
    </div>
  );
}

function SessionCard() {
  return (
    <div className="mini-card" data-ui>
      <p className="t">{SESSION.name}</p>
      <p className="m">
        {SESSION.date} · {SESSION.duration} · {SESSION.size} · {SESSION.steps} 步
      </p>
      <div className="foot">
        <span className="tb-pill">
          <i aria-hidden="true" />
          已分析
        </span>
        <span>意图 + {SESSION.steps} 步</span>
        <span className="tb-meta">视频 · 旁白</span>
      </div>
    </div>
  );
}

function Steps() {
  return (
    <ol className="steps" data-ui>
      {SESSION.list.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}

function File() {
  return (
    <pre className="file" data-ui>
      {SKILL_MD}
    </pre>
  );
}

function Evidence({ kind }: { kind: Stage['fragment'] }) {
  if (kind === 'toolbar') return <Toolbar />;
  if (kind === 'session') return <SessionCard />;
  if (kind === 'steps') return <Steps />;
  return <File />;
}

export function HowItWorks() {
  return (
    <section className="page-m py-[52px] mob:py-[80px]" aria-labelledby="how-title">
      <h2 id="how-title" className="text-h2 max-mob:text-[24px]" data-reveal>
        一次录制，四个动作。
      </h2>

      <ol className="mt-9 grid list-none gap-10 mob:mt-11 mob:gap-8">
        {STAGES.map((stage, i) => (
          <li
            key={stage.id}
            className="grid items-center gap-5 mob:grid-cols-[minmax(300px,440px)_minmax(0,1fr)] mob:gap-14"
          >
            <p className="max-w-[46ch] text-soft" data-reveal style={d(60)}>
              <strong className="font-medium text-ink">{stage.runIn}</strong>
              {stage.body}
            </p>
            <div data-reveal style={d(140)} className="min-w-0">
              <Evidence kind={stage.fragment} />
            </div>
            <span className="sr-only">{`第 ${i + 1} 步，共 ${STAGES.length} 步`}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
