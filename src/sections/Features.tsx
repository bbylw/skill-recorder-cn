import { FEATURES, type Feature } from '../data/content';
import { d } from '../lib/reveal';

function Panel({ kind }: { kind: Feature['panel'] }) {
  if (kind === 'file')
    return (
      <div className="panel" data-ui>
        <span className="lab">SKILL.md</span>
        <pre className="file-in"><span className="c">---</span>{'\n'}name: weekly-account-research{'\n'}description: 按 tracker 逐个研究客户{'\n'}<span className="c">---</span></pre>
      </div>
    );

  if (kind === 'schedule')
    return (
      <div className="panel" data-ui>
        <div className="sched">
          <b>每周一 09:00</b>
          <span>启用</span>
        </div>
        <div className="sched">
          <span>同一份流程</span>
          <span>Research 频道</span>
        </div>
      </div>
    );

  if (kind === 'tools')
    return (
      <div className="panel" data-ui>
        <div className="rows">
          <div>
            <span>gh CLI</span>
            <span>原生</span>
          </div>
          <div>
            <span>web_fetch</span>
            <span>原生</span>
          </div>
          <div>
            <span>文件读写</span>
            <span>原生</span>
          </div>
          <div>
            <span>任意 MCP 工具</span>
            <span>原生</span>
          </div>
        </div>
      </div>
    );

  if (kind === 'figure')
    return (
      <div className="panel" data-ui>
        <div className="big">99</div>
        <span className="lab">种旁白语言 · 设备端 Whisper · 首次下载约 252 MB</span>
      </div>
    );

  if (kind === 'trace')
    return (
      <div className="panel" data-ui>
        <div className="trace">
          <span>一份表单</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
          <span>所有同类表单</span>
        </div>
        <span className="lab">从这一个示例里归纳，而不是记住坐标</span>
      </div>
    );

  return (
    <div className="panel" data-ui>
      <div className="sched">
        <b>Copilot CLI 1.0.78</b>
      </div>
      <span className="lab">浏览器 Web OAuth · 不需要设备码 · 五分钟后超时</span>
    </div>
  );
}

export function Features() {
  return (
    <section className="page-m py-[52px] mob:py-[80px]" aria-labelledby="feat-title">
      <h2 id="feat-title" className="text-h2 max-mob:text-[24px]" data-reveal>
        两个产物，同一条流程。
      </h2>

      <div className="mt-9 grid gap-x-12 gap-y-11 mob:mt-11 mob:grid-cols-2">
        {FEATURES.map((f, i) => (
          <article key={f.id} data-reveal style={d((i % 2) * 70)}>
            <Panel kind={f.panel} />
            <h3 className="mt-5 text-[18px]">{f.title}</h3>
            {f.lines.map((line) => (
              <p key={line} className="mt-2 max-w-[52ch] text-small text-soft">
                {line}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
