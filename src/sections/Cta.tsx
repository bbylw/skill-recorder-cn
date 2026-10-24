import { useState } from 'react';
import type { FormEvent } from 'react';
import { CopySimpleIcon, DownloadSimpleIcon } from '@phosphor-icons/react';
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
${SESSION.list.map((step, index) => `${index + 1}. ${step}。`).join('\n')}

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
    setStatus(`已下载 ${file}，全程未上传任何内容`);
  };

  const copyMd = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus(`已复制 ${slug}.md，可直接粘贴使用`);
    } catch {
      setStatus('复制受限，请使用「下载 Markdown」保存示例文件');
    }
  };

  return (
    <section id="cta" className="cta-section section-block scroll-mt-24" aria-labelledby="cta-title">
      <div className="page-m">
        <div className="cta-shell">
          <div className="cta-main">
            <span className="section-kicker" data-reveal>本地交互演示</span>
            <h2 id="cta-title" data-reveal>录一次，<span>就有了。</span></h2>
            <p className="cta-lede" data-reveal style={d(70)}>
              调整名称与产物类型，实时查看 <code className="cta-code">{slug}.md</code>。所有内容只在浏览器中生成。
            </p>

            <div className="cta-preview" data-ui data-reveal style={d(110)}>
              <div className="cta-preview-bar">
                <span>只读预览 · {slug}.md</span>
                <span className="cta-preview-tag">{kind === 'skill' ? 'SKILL' : 'AUTOMATION'}</span>
              </div>
              <pre className="cta-preview-code">{markdown}</pre>
            </div>
          </div>

          <form className="dlg" data-ui onSubmit={submit} data-reveal style={d(140)}>
            <div className="dlg-head">
              <div><span>输出配置</span><h3>创建技能或自动化</h3></div>
              <span className="dlg-badge">不上传</span>
            </div>

            <label className="field" htmlFor="skill-name">技能标识符（name）</label>
            <input
              id="skill-name"
              name="skill-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="off"
              spellCheck={false}
            />

            <fieldset className="dlg-fieldset">
              <legend className="field">选择复用产物</legend>
              <div className="seg">
                <label>
                  <input type="radio" name="kind" value="skill" checked={kind === 'skill'} onChange={() => setKind('skill')} />
                  技能（SKILL.md）
                </label>
                <label>
                  <input type="radio" name="kind" value="automation" checked={kind === 'automation'} onChange={() => setKind('automation')} />
                  自动化
                </label>
              </div>
            </fieldset>

            {kind === 'automation' && (
              <fieldset className="dlg-fieldset dlg-schedule">
                <legend className="field">计划触发时间（schedule）</legend>
                <div className="dlg-presets">
                  {['每周一 09:00', '每天 08:30', '每周五 17:00'].map((preset) => (
                    <button key={preset} type="button" className="dlg-preset-chip" aria-pressed={scheduleLabel === preset} onClick={() => setScheduleLabel(preset)}>
                      {preset}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <p className="note">
              {kind === 'skill'
                ? '生成一份可由智能体按需执行的 SKILL.md，下载前可完整审阅。'
                : `生成带计划（${scheduleLabel}）的自动化，让同一份流程到点运行。`}
            </p>

            <div className="dlg-actions">
              <button className="go" type="submit" aria-label={`生成并下载 ${slug}.md`}>
                <DownloadSimpleIcon size={18} weight="bold" aria-hidden="true" /><span>下载 Markdown</span>
              </button>
              <button className="go-secondary" type="button" onClick={copyMd}>
                <CopySimpleIcon size={17} aria-hidden="true" /><span>复制 Markdown</span>
              </button>
            </div>

            <p className="status" role="status" aria-live="polite">{status}</p>

            <div className="dlg-foot">
              <span>准备录制真实任务？</span>
              <a href={RELEASE} target="_blank" rel="noreferrer">安装 Skill Recorder</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
