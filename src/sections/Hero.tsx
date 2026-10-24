import { RELEASE } from '../data/content';
import { d } from '../lib/reveal';
import { RecorderFragment } from '../components/RecorderFragment';

export function Hero() {
  return (
    <header className="grid max-mob:flex max-mob:flex-col-reverse mob:grid-cols-2">
      <div className="page-m flex flex-col py-10 max-mob:pb-12 mob:pr-0">
        <a href="#top" className="inline-flex min-h-[44px] w-max items-center gap-2.5 text-[15px]">
          <span className="mark-dot" aria-hidden="true" />
          技能记录器
        </a>

        <div className="my-auto max-mob:my-0 max-mob:mt-6 mob:pt-10">
          <h1 className="text-[40px] leading-[1.12] max-mob:text-[26px]">
            <span className="mask-line">
              <span style={d(0)}>把一次操作，</span>
            </span>
            <span className="mask-line">
              <span style={d(110)}>录成 Agent 的技能。</span>
            </span>
          </h1>
          <p className="mt-4 max-w-[46ch] text-soft" data-reveal style={d(240)}>
            录屏、窗口、剪贴板与终端都在本地记录；Copilot 把它们还原成意图和有序步骤。
          </p>
          <a className="btn-light mt-7" href="#install" data-reveal style={d(320)}>
            安装 Skill Recorder
          </a>
        </div>
      </div>

      <div className="flex h-full flex-col bg-surface px-10 pb-10 pt-10 max-mob:px-5 max-mob:pt-5 max-mob:pb-7">
        <a
          href={RELEASE}
          className="link-quiet inline-flex min-h-[44px] items-center self-end text-[15px] max-mob:text-[13px]"
        >
          安装 Windows / macOS
        </a>
        <div
          data-reveal
          style={d(180)}
          className="my-auto w-full max-w-[560px] self-center py-6 max-mob:py-5"
        >
          <RecorderFragment />
        </div>
      </div>
    </header>
  );
}
