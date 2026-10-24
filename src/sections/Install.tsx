import { useState } from 'react';
import { COMMIT, DOCS, INSTALL, RELEASE, RELEASED, VERSION } from '../data/content';
import { d } from '../lib/reveal';

function CopyButton({ text, label, target }: { text: string; label: string; target: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'selected' | 'fail'>('idle');

  const selectCommand = () => {
    const pre = document.getElementById(target);
    if (!pre) return false;
    const range = document.createRange();
    range.selectNodeContents(pre);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    return true;
  };

  const copy = async () => {
    let next: 'done' | 'selected' | 'fail';
    try {
      await navigator.clipboard.writeText(text);
      next = 'done';
    } catch {
      next = selectCommand() ? 'selected' : 'fail';
    }
    setState(next);
    window.setTimeout(() => setState('idle'), 2600);
  };

  return (
    <button
      type="button"
      className="copy"
      onClick={copy}
      aria-label={`复制 ${label} 的命令`}
      title={state === 'selected' ? '命令已选中，按 Ctrl+C 复制' : undefined}
    >
      {state === 'done' ? '已复制 ✓' : state === 'selected' ? '已选中' : '复制命令'}
    </button>
  );
}

export function Install() {
  const [osTab, setOsTab] = useState<'all' | 'win' | 'unix'>('all');

  return (
    <section
      id="install"
      className="page-m scroll-mt-6 border-b border-hairline py-[64px] mob:py-[96px]"
      aria-labelledby="install-title"
    >
      <div className="section-head flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-7">
        <div>
          <h2 id="install-title" className="text-h2 max-mob:text-[26px]" data-reveal>
            安装与快速开始
          </h2>
          <p className="mt-2 max-w-[58ch] text-small text-muted" data-reveal style={d(60)}>
            按提交固定版本安装（Commit-pinned installation）：一行命令自动下载独立 Node 运行时并在本机构建，不污染全局环境。
          </p>
        </div>
        <a
          href={RELEASE}
          target="_blank"
          rel="noreferrer"
          className="top-pill-link inline-flex min-h-[36px] items-center gap-2 px-3 text-[13px]"
          data-reveal
          style={d(90)}
        >
          <span>前往 GitHub 最新发布页 ({VERSION})</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="mt-10 grid gap-10 mob:mt-12 mob:grid-cols-[minmax(280px,34%)_minmax(0,1fr)] mob:gap-14">
        {/* Left Column: Technical Spec Sheet + Developer & Evals Links */}
        <div className="max-mob:order-2 flex flex-col justify-between gap-8">
          <div className="spec-card" data-reveal>
            <div className="spec-head">RELEASE SPECIFICATION · 发布规格</div>
            <dl className="spec-dl">
              <div className="spec-row">
                <dt>支持平台</dt>
                <dd>macOS (首要) · Windows 11 x64 / ARM64 · Ubuntu</dd>
              </div>
              <div className="spec-row">
                <dt>当前版本</dt>
                <dd className="tabular-nums">
                  {VERSION} · 发布于 {RELEASED}
                </dd>
              </div>
              <div className="spec-row">
                <dt>固定提交</dt>
                <dd className="font-mono text-[12.5px] text-ink">{COMMIT.slice(0, 12)}…</dd>
              </div>
              <div className="spec-row">
                <dt>内置 CLI</dt>
                <dd>Copilot CLI 1.0.78 (--web-flow)</dd>
              </div>
              <div className="spec-row">
                <dt>账号要求</dt>
                <dd>具备 Copilot 访问权限的 GitHub 账号</dd>
              </div>
              <div className="spec-row">
                <dt>无需预装</dt>
                <dd>不需要 Git、Node.js 或手动开发者搭建</dd>
              </div>
            </dl>
          </div>

          <div className="spec-card" data-reveal style={d(100)}>
            <div className="spec-head">DEVELOPER & EVALS · 源码开发与评测</div>
            <div className="divide-y divide-[#222]">
              {DOCS.map((doc) => (
                <a
                  key={doc.label}
                  className="doc-link-item block py-3.5 transition-colors hover:text-white"
                  href={doc.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[14.5px] font-medium text-ink">{doc.label}</span>
                    <span className="text-micro text-muted">↗</span>
                  </div>
                  <span className="mt-1 block font-mono text-[12px] text-muted">{doc.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Commands + 3-Step Guide + Two-step Auth Notice */}
        <div className="max-mob:order-1">
          <div className="term" data-ui data-reveal>
            <div className="term-topbar">
              <div className="term-tabs" role="tablist" aria-label="操作系统命令筛选">
                <button
                  type="button"
                  role="tab"
                  aria-selected={osTab === 'all'}
                  className="term-tab"
                  onClick={() => setOsTab('all')}
                >
                  全部显示
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={osTab === 'win'}
                  className="term-tab"
                  onClick={() => setOsTab('win')}
                >
                  Windows 11 (PowerShell)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={osTab === 'unix'}
                  className="term-tab"
                  onClick={() => setOsTab('unix')}
                >
                  macOS / Ubuntu (Terminal)
                </button>
              </div>
              <span className="term-pin">COMMIT PINNED · {COMMIT.slice(0, 7)}</span>
            </div>

            {(osTab === 'all' || osTab === 'win') && (
              <div className="term-block">
                <div className="mb-[6px] flex items-center justify-between gap-4">
                  <span className="lab">Windows 11 (x64 或 ARM64) · PowerShell</span>
                  <CopyButton text={INSTALL.win} label="Windows" target="cmd-win" />
                </div>
                <pre className="cmd" id="cmd-win" data-prompt="PS>">
                  {INSTALL.win}
                </pre>
              </div>
            )}

            {(osTab === 'all' || osTab === 'unix') && (
              <div className="term-block">
                <div className="mb-[6px] flex items-center justify-between gap-4">
                  <span className="lab">macOS 或 Ubuntu · Terminal</span>
                  <CopyButton text={INSTALL.unix} label="macOS 与 Ubuntu" target="cmd-unix" />
                </div>
                <pre className="cmd mb-0" id="cmd-unix" data-prompt="$">
                  {INSTALL.unix}
                </pre>
              </div>
            )}
          </div>

          {/* 3-Step Quickstart Cards */}
          <div className="mt-6 grid gap-3.5 mob:grid-cols-3" data-reveal style={d(80)}>
            <div className="install-step">
              <span className="install-step-num">STEP 01 · 复制命令</span>
              <p className="mt-1.5 text-[13.5px] leading-[1.55] text-soft">
                直接复制上方或发布页中的完整命令。不要复制文档中含 <code className="inline-code">&lt;40-char&gt;</code> 的模板，也不要下载 Source code (zip)。
              </p>
            </div>
            <div className="install-step">
              <span className="install-step-num">STEP 02 · 自动构建</span>
              <p className="mt-1.5 text-[13.5px] leading-[1.55] text-soft">
                粘贴到终端回车并保持窗口打开。脚本会自动拉取固定 Node 运行时、构建精确提交并启动应用。
              </p>
            </div>
            <div className="install-step">
              <span className="install-step-num">STEP 03 · 随时重开</span>
              <p className="mt-1.5 text-[13.5px] leading-[1.55] text-soft">
                之后再次打开：Windows 在桌面或开始菜单找 <strong className="text-ink">Skill Recorder (Source)</strong>；macOS 在 <code className="inline-code">~/Applications</code> 或 Spotlight。
              </p>
            </div>
          </div>

          {/* Important Notice & Inspect-First Link */}
          <div className="install-notes mt-6" data-reveal style={d(120)}>
            <p className="text-[14.5px] leading-[1.65] text-soft">
              <strong className="font-medium text-ink">首次分析与两步登录说明：</strong>
              首次点击 Analyze 时会通过浏览器 Web OAuth 登录 Copilot。在 Windows 上若遇到 Entra 租户提示，请先在浏览器完成企业 SSO，跳转后关闭标签页返回应用再点{' '}
              <strong className="font-medium text-ink">Authorize Copilot</strong>（两步需使用同一浏览器配置文件）。
            </p>
            <p className="mt-3 text-micro text-muted">
              若想在运行前先审阅安装脚本，请前往{' '}
              <a
                className="text-ink underline decoration-1 underline-offset-4 hover:text-white"
                href={RELEASE}
                rel="noreferrer"
                target="_blank"
              >
                GitHub 发布页 ({VERSION})
              </a>{' '}
              查看 inspect-first 说明与 SHA-256 校验值。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
