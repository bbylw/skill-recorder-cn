import { FEATURES, type Feature } from '../data/content';
import { d } from '../lib/reveal';

function Panel({ kind }: { kind: Feature['panel'] }) {
  if (kind === 'file')
    return (
      <div className="panel" data-ui>
        <div className="panel-top">
          <span className="lab">~/.copilot/skills/weekly-account-research/SKILL.md</span>
          <span className="panel-pill">只读预览</span>
        </div>
        <pre className="file-in">
          <span className="c">---</span>
          {'\n'}
          <span className="k">name:</span> weekly-account-research{'\n'}
          <span className="k">description:</span> 按 tracker 逐个研究客户并汇总到 Teams{'\n'}
          <span className="c">---</span>
          {'\n'}
          <span className="c"># Steps (1-4) · 安装或导出前可完整审阅</span>
        </pre>
      </div>
    );

  if (kind === 'schedule')
    return (
      <div className="panel" data-ui>
        <div className="panel-top">
          <span className="lab">AUTOMATION SCHEDULE · 触发器配置</span>
          <span className="panel-pill-active">
            <i aria-hidden="true" />
            已启用
          </span>
        </div>
        <div className="sched-grid">
          <div className="sched-item">
            <span className="sched-k">执行周期</span>
            <b className="sched-v">每周一 09:00 (0 9 * * 1)</b>
          </div>
          <div className="sched-item">
            <span className="sched-k">输出投递</span>
            <b className="sched-v">Teams · #Research 频道</b>
          </div>
          <div className="sched-item">
            <span className="sched-k">权限策略</span>
            <span className="sched-sub">复用已验证的原生工具权限与安装流程</span>
          </div>
        </div>
      </div>
    );

  if (kind === 'tools')
    return (
      <div className="panel" data-ui>
        <div className="panel-top">
          <span className="lab">NATIVE TOOL DISPATCH · 工具调用栈</span>
          <span className="panel-pill">无坐标依赖</span>
        </div>
        <div className="rows">
          <div>
            <span className="font-mono text-[12.5px] text-ink">gh CLI</span>
            <span className="row-desc">PR / Issue / Release 读写</span>
            <span className="row-badge">原生调用</span>
          </div>
          <div>
            <span className="font-mono text-[12.5px] text-ink">web_fetch</span>
            <span className="row-desc">网页检索与正文抓取</span>
            <span className="row-badge">原生调用</span>
          </div>
          <div>
            <span className="font-mono text-[12.5px] text-ink">fs / xlsx</span>
            <span className="row-desc">本地文件与表格结构化读写</span>
            <span className="row-badge">原生调用</span>
          </div>
          <div>
            <span className="font-mono text-[12.5px] text-ink">MCP Server</span>
            <span className="row-desc">Teams / Slack / 内部系统</span>
            <span className="row-badge">原生调用</span>
          </div>
        </div>
      </div>
    );

  if (kind === 'figure')
    return (
      <div className="panel" data-ui>
        <div className="panel-top">
          <span className="lab">ON-DEVICE WHISPER · 设备端语音模型</span>
          <span className="panel-pill">首次约 252 MB</span>
        </div>
        <div className="figure-body">
          <div className="figure-num-wrap">
            <div className="big">99</div>
            <span className="figure-unit">种旁白语言</span>
          </div>
          <div className="figure-langs">
            <div className="lang-chips">
              <span>中文</span>
              <span>English</span>
              <span>日本語</span>
              <span>Deutsch</span>
              <span>Español</span>
              <span>Français</span>
              <span>한국어</span>
              <span>+92</span>
            </div>
            <p className="figure-quote">“先查融资和产品动作，再写回 notes 列…” → 自动对齐到第 2-3 步</p>
          </div>
        </div>
      </div>
    );

  if (kind === 'trace')
    return (
      <div className="panel" data-ui>
        <div className="panel-top">
          <span className="lab">PARAMETER INDUCTION · 从单次样本归纳变量</span>
          <span className="panel-pill">泛化执行</span>
        </div>
        <div className="trace-box">
          <div className="trace-col">
            <span className="trace-head">录制 1 次示例</span>
            <code className="trace-code">Contoso 客户行</code>
          </div>
          <span className="trace-arrow" aria-hidden="true">
            →
          </span>
          <div className="trace-col">
            <span className="trace-head">提取可复用参数</span>
            <code className="trace-code accent">{'{customer_row}'}</code>
          </div>
          <span className="trace-arrow" aria-hidden="true">
            →
          </span>
          <div className="trace-col">
            <span className="trace-head">自动批处理全部同类</span>
            <code className="trace-code">Fabrikam · Northwind · *</code>
          </div>
        </div>
      </div>
    );

  return (
    <div className="panel" data-ui>
      <div className="panel-top">
        <span className="lab">PINNED RUNTIME · 独立内置 CLI</span>
        <span className="panel-pill">v1.0.78</span>
      </div>
      <div className="cli-box">
        <code className="cli-cmd">copilot --no-auto-update login --web-flow</code>
        <div className="cli-steps">
          <span>1. 浏览器 SSO 会话复用</span>
          <span>→</span>
          <span>2. Authorize Copilot（免设备码）</span>
          <span>→</span>
          <span>5 分钟超时可取消</span>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="page-m section-block scroll-mt-24" aria-labelledby="feat-title">
      <div className="section-head">
        <h2 id="feat-title" data-reveal>两个产物，同一条流程。</h2>
        <p data-reveal style={d(60)}>
          按需调用的 <code className="inline-code">SKILL.md</code> 与按计划触发的 Automation，都建立在原生工具和示例归纳之上。
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((feature, index) => (
          <article key={feature.id} className={`feat-card feat-card-${index + 1}`} data-reveal style={d((index % 2) * 70)}>
            <Panel kind={feature.panel} />
            <div className="feat-copy">
              <span className="feat-tag">{feature.tag}</span>
              <h3>{feature.title}</h3>
              <div className="feat-description">
                {feature.lines.map((line) => <p key={line}>{line}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
