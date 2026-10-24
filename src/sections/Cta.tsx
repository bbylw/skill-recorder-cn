import { useState } from 'react';
import type { FormEvent } from 'react';
import { RELEASE, SESSION } from '../data/content';
import { d } from '../lib/reveal';

type Kind = 'skill' | 'automation';

function buildMarkdown(name: string, kind: Kind, scheduleLabel: string) {
  const slug = (name.trim() || 'weekly-account-research').replace(/\s+/g, '-').toLowerCase();
  const schedule = kind === 'automation' ? `\nschedule: "${scheduleLabel}"` : '';
  return `---
name: ${slug}
description: 按 tracker 逐个研究客户，写回表格并汇总到 Teams 频道${schedule}
---

# Weekly account research

## When to use
${kind === 'automation' ? `按计划自动触发（${scheduleLabel}），刷新 tracker 里的客户研究结论。` : '每周一早上，需要按 tracker 里的客户清单刷新研究结论时。'}

## Steps
${SESSION.list.map((step, i) => `${i + 1}. ${step}。`).join('\n')}

<!-- 示例文件 · 由技能记录器中文站的演示生成 · 没有上传任何内容 -->`;
}

export function Cta() {
  const [name, setName] = useState('weekly-account-research');
  const [kind, setKind] = useState<Kind>('skill');
  const [scheduleLabel, setScheduleLabel] = useState('每周一 09:00');
  const [status, setStatus] = useState('');

  const slug = (name.trim() || 'weekly-account-research').replace(/\s+/g, '-').toLowerCase();
  const markdown = buildMarkdown(slug, kind, scheduleLabel);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const file = `${slug}.md`;
    const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(`已生成并下载 ${file} · 纯本地演示，未上传任何内容`);
  };

  const copyMd = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus(`已复制 ${slug}.md 到剪贴板 · 可直接粘贴体验`);
    } catch {
      setStatus('请点击「生成并下载 SKILL.md」保存示例文件');
    }
  };

  return (
    <section
      id="cta"
      className="cta-section scroll-mt-6 border-b border-hairline bg-accent py-16 text-white max-mob:py-12 mob:py-20"
      aria-labelledby="cta-title"
    >
      <div className="page-m grid items-center gap-10 mob:grid-cols-[1.05fr_0.95fr] mob:gap-14">
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <span className="cta-kicker" data-reveal>
              READY TO BUILD · 从一次操作到可复用资产
            </span>
            <h2
              id="cta-title"
              className="mt-3 text-[clamp(44px,5.6vw,84px)] leading-[0.96] tracking-[-0.04em]"
              data-reveal
            >
              录一次，
              <br />
              就有了。
            </h2>
            <p className="mt-4 max-w-[44ch] text-[17.5px] leading-[1.55] text-[#ffe3e6]" data-reveal style={d(80)}>
              39 秒的真实会话，足够写成一份 Agent 随时可调用的技能或定时执行的自动化。在右侧试试调整参数，实时查看生成的{' '}
              <code className="cta-code">{slug}.md</code>。
            </p>
          </div>

          {/* Live Synchronized SKILL.md Preview */}
          <div className="cta-preview mt-8" data-ui data-reveal style={d(130)}>
            <div className="cta-preview-bar">
              <span>只读预览 · {slug}.md</span>
              <span className="cta-preview-tag">{kind === 'skill' ? 'SKILL (按需)' : `AUTOMATION (${scheduleLabel})`}</span>
            </div>
            <pre className="cta-preview-code">{markdown}</pre>
          </div>
        </div>

        <div className="grid place-items-center mob:justify-end">
          <div data-reveal style={d(150)} className="w-full max-w-[460px]">
            <form className="dlg" data-ui onSubmit={submit}>
              <div className="dlg-head">
                <h3>创建技能或自动化</h3>
                <span className="dlg-badge">交互演示</span>
              </div>

              <label className="field" htmlFor="skill-name">
                技能标识符 (name)
              </label>
              <input
                id="skill-name"
                name="skill-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="off"
                spellCheck={false}
              />

              <fieldset className="m-0 mt-4 border-0 p-0">
                <legend className="field">选择复用产物</legend>
                <div className="seg">
                  <label>
                    <input
                      type="radio"
                      name="kind"
                      value="skill"
                      checked={kind === 'skill'}
                      onChange={() => setKind('skill')}
                    />
                    技能 (SKILL.md)
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="kind"
                      value="automation"
                      checked={kind === 'automation'}
                      onChange={() => setKind('automation')}
                    />
                    自动化 (Automation)
                  </label>
                </div>
              </fieldset>

              {kind === 'automation' && (
                <div className="mt-3.5">
                  <label className="field" htmlFor="skill-schedule">
                    计划触发时间 (schedule)
                  </label>
                  <div className="dlg-presets">
                    {['每周一 09:00', '每天 08:30', '每周五 17:00'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className="dlg-preset-chip"
                        aria-pressed={scheduleLabel === preset}
                        onClick={() => setScheduleLabel(preset)}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="note">
                {kind === 'skill'
                  ? '生成一份 SKILL.md：智能体可按需执行，安装或导出前可只读查看完整文件。'
                  : `生成一份带计划（${scheduleLabel}）的自动化：同一份流程到点自动运行。`}
              </p>

              <div className="dlg-actions">
                <button className="go" type="submit">
                  生成并下载 {slug}.md
                </button>
                <button className="go-secondary" type="button" onClick={copyMd}>
                  复制 Markdown
                </button>
              </div>

              {status && (
                <p className="status" role="status" aria-live="polite">
                  {status}
                </p>
              )}

              <div className="dlg-foot">
                <span>准备在你的电脑上录制真实任务？</span>
                <a href={RELEASE} target="_blank" rel="noreferrer">
                  前往发布页安装 →
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
