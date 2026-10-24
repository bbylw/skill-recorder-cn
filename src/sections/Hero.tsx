import { RELEASE, REPO, VERSION } from '../data/content';
import { d } from '../lib/reveal';
import { RecorderFragment } from '../components/RecorderFragment';

export function Hero() {
  return (
    <header className="hero-shell border-b border-hairline">
      {/* Top Precision Navigation Strip */}
      <div className="hero-topbar page-m flex min-h-[58px] items-center justify-between gap-4 border-b border-hairline">
        <a href="#top" className="inline-flex min-h-[44px] items-center gap-2.5 text-[15px] font-medium text-ink">
          <span className="mark-dot" aria-hidden="true" />
          <span>技能记录器</span>
          <span className="text-micro font-normal text-muted max-mob:hidden">Skill Recorder</span>
        </a>

        <nav aria-label="页面章节" className="max-mob:hidden">
          <ul className="flex items-center gap-7 text-[14px] text-muted">
            <li>
              <a href="#how" className="link-quiet">
                工作原理
              </a>
            </li>
            <li>
              <a href="#showcase" className="link-quiet">
                交互演练
              </a>
            </li>
            <li>
              <a href="#features" className="link-quiet">
                产物与特性
              </a>
            </li>
            <li>
              <a href="#capture" className="link-quiet">
                隐私与采集
              </a>
            </li>
            <li>
              <a href="#faq" className="link-quiet">
                常见问题
              </a>
            </li>
            <li>
              <a href="#install" className="link-quiet">
                安装
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="link-quiet inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] max-mob:hidden"
          >
            <span>microsoft/skill-recorder</span>
            <span className="text-micro text-muted">↗</span>
          </a>
          <a
            href={RELEASE}
            target="_blank"
            rel="noreferrer"
            className="top-pill-link inline-flex min-h-[36px] items-center gap-2 px-3 text-[13px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>安装 Windows / macOS</span>
          </a>
        </div>
      </div>

      {/* Main Split Stage */}
      <div className="grid max-mob:flex max-mob:flex-col-reverse mob:grid-cols-[1.02fr_0.98fr]">
        {/* Left Column: Statement + Actions + Key Facts */}
        <div className="page-m flex flex-col justify-between py-12 max-mob:py-10 mob:border-r mob:border-hairline mob:py-14">
          <div className="hero-meta-row flex flex-wrap items-center gap-2.5" data-reveal>
            <span className="meta-badge">
              <i aria-hidden="true" />
              {VERSION} 源码发布版
            </span>
            <span className="meta-badge-quiet">macOS · Windows 11 (x64/ARM64) · Ubuntu</span>
          </div>

          <div className="my-10 max-mob:my-7">
            <h1 className="hero-h1">
              <span className="mask-line hero-line">
                <span style={d(0)}>把一次真实操作，</span>
              </span>
              <span className="mask-line hero-line">
                <span style={d(110)}>录成 Agent 可复用的技能。</span>
              </span>
            </h1>

            <p className="mt-5 max-w-[48ch] text-[17.5px] leading-[1.6] text-soft" data-reveal style={d(220)}>
              屏幕快照、窗口切换、剪贴板、旁白与终端都在<strong>本地</strong>记录；点击 Analyze，
              <strong className="font-medium text-ink"> GitHub Copilot CLI </strong>
              把你实际做过的事还原成清晰意图与有序步骤，一步生成按需执行的{' '}
              <code className="inline-code">SKILL.md</code> 或定时运行的自动化。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5" data-reveal style={d(300)}>
              <a className="btn-light" href="#install">
                <span>安装 Skill Recorder</span>
                <span className="ml-2 text-muted" aria-hidden="true">
                  ↓
                </span>
              </a>
              <a className="btn-ghost" href="#how">
                查看四步工作流
              </a>
              <a
                className="btn-text max-mob:hidden"
                href="#cta"
              >
                在线生成 SKILL.md 示例 →
              </a>
            </div>
          </div>

          {/* Bottom Precision Metrics Strip */}
          <dl
            className="hero-facts grid grid-cols-3 gap-4 border-t border-hairline pt-6 max-mob:grid-cols-1 max-mob:gap-3"
            data-reveal
            style={d(380)}
          >
            <div className="hero-fact">
              <dt className="text-micro text-muted">隐私边界</dt>
              <dd className="mt-1 text-[14.5px] font-medium text-ink">录制与转写 100% 在本地</dd>
              <span className="mt-0.5 block text-[12px] text-muted">仅点 Analyze 时上传分析</span>
            </div>
            <div className="hero-fact">
              <dt className="text-micro text-muted">语音注释</dt>
              <dd className="mt-1 text-[14.5px] font-medium text-ink">99 种语言设备端 Whisper</dd>
              <span className="mt-0.5 block text-[12px] text-muted">边做边讲，音频不离机</span>
            </div>
            <div className="hero-fact">
              <dt className="text-micro text-muted">执行方式</dt>
              <dd className="mt-1 text-[14.5px] font-medium text-ink">原生工具调用 + 示例归纳</dd>
              <span className="mt-0.5 block text-[12px] text-muted">gh / web_fetch，不靠坐标回放</span>
            </div>
          </dl>
        </div>

        {/* Right Column: Live Interactive Product Fragment */}
        <div className="hero-stage-right flex flex-col justify-center bg-surface px-8 py-10 max-mob:px-5 max-mob:py-7 mob:px-12 mob:py-12">
          <div
            data-reveal
            style={d(160)}
            className="mx-auto w-full max-w-[560px]"
          >
            <RecorderFragment />
          </div>
        </div>
      </div>
    </header>
  );
}
