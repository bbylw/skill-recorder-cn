import { useState } from 'react';
import { COMMIT, DOCS, INSTALL, RELEASE, RELEASED, VERSION } from '../data/content';

function CopyButton({ text, label, target }: { text: string; label: string; target: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'selected' | 'fail'>('idle');

  const selectCommand = () => {
    // clipboard permission can be refused; select the command so it can be copied by hand
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
    <button type="button" className="copy" onClick={copy} aria-label={`复制 ${label} 的命令`} title={state === 'selected' ? '命令已选中，按 Ctrl+C 复制' : undefined}>
      {state === 'done' ? '已复制' : state === 'selected' ? '已选中' : '复制'}
    </button>
  );
}

export function Install() {
  return (
    <section id="install" className="page-m scroll-mt-6 py-[52px] mob:py-[80px]" aria-labelledby="install-title">
      <h2 id="install-title" className="text-h2 max-mob:text-[24px]" data-reveal>
        安装
      </h2>

      <div className="mt-9 grid gap-10 mob:grid-cols-[minmax(240px,30%)_minmax(0,1fr)] mob:gap-14">
        <div className="max-mob:order-2">
        <dl className="m-0">
          <div className="mb-5">
            <dt className="text-micro text-muted">平台</dt>
            <dd className="m-0 mt-0.5 text-small">macOS · Windows 11 x64 / ARM64 · Ubuntu</dd>
          </div>
          <div className="mb-5">
            <dt className="text-micro text-muted">版本</dt>
            <dd className="m-0 mt-0.5 text-small">
              {VERSION} · {RELEASED}
            </dd>
          </div>
          <div className="mb-5">
            <dt className="text-micro text-muted">提交</dt>
            <dd className="m-0 mt-0.5 text-small">b05d590</dd>
          </div>
          <div className="mb-5">
            <dt className="text-micro text-muted">账号</dt>
            <dd className="m-0 mt-0.5 text-small">具备 Copilot 访问权限的 GitHub 账号</dd>
          </div>
          <div>
            <dt className="text-micro text-muted">不需要</dt>
            <dd className="m-0 mt-0.5 text-small">Git、Node.js、手动开发者搭建</dd>
          </div>
        </dl>

        <div className="mt-9">
          <p className="mb-1 text-micro text-muted">文档与源码</p>
          {DOCS.map((doc) => (
            <a
              key={doc.label}
              className="block py-2.5 transition-colors hover:text-white"
              href={doc.href}
              rel="noreferrer"
              target="_blank"
            >
              <span className="block text-small">{doc.label}</span>
              <span className="mt-0.5 block text-micro text-muted">{doc.value}</span>
            </a>
          ))}
        </div>
        </div>

        <div className="max-mob:order-1">
          <div className="term" data-ui data-reveal>
            <div className="mb-[6px] flex items-center justify-between gap-4">
              <span className="lab">Windows 11 · PowerShell</span>
              <CopyButton text={INSTALL.win} label="Windows" target="cmd-win" />
            </div>
            <pre className="cmd" id="cmd-win" data-prompt="PS&gt;">{INSTALL.win}</pre>

            <div className="mb-[6px] flex items-center justify-between gap-4">
              <span className="lab">macOS · Ubuntu · Terminal</span>
              <CopyButton text={INSTALL.unix} label="macOS 与 Ubuntu" target="cmd-unix" />
            </div>
            <pre className="cmd" id="cmd-unix" data-prompt="$">{INSTALL.unix}</pre>
          </div>

          <p className="mt-5 max-w-[58ch] text-soft leading-[1.7]">
            <strong className="font-medium text-ink">从发布页复制，不要照文档里的模板手打。</strong>
            发布命令已经包含正确的版本标识，不需要替换任何内容。也不需要 Git 或 Node.js，不用走
            Manual developer setup；Assets 里的 Source code (zip / tar.gz) 不是安装程序。
          </p>
          <p className="mt-4 max-w-[58ch] text-soft leading-[1.7]">
            想先审阅再运行，用发布页上的 inspect-first 说明。再次打开：Windows 用桌面或开始菜单里的
            Skill Recorder (Source)，macOS 在 ~/Applications、Spotlight 或 Launchpad，无需每次重装。
          </p>

          <p className="mt-5 text-micro text-muted">
            固定提交 <span className="text-ink">{COMMIT.slice(0, 7)}</span> ·{' '}
            <a className="underline decoration-1 underline-offset-4 hover:text-ink" href={RELEASE} rel="noreferrer" target="_blank">
              前往发布页
            </a>
            {' '}查看 inspect-first 与校验值。
          </p>
        </div>
      </div>
    </section>
  );
}
