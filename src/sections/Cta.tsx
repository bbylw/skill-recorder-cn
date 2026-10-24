import { useState } from 'react';
import type { FormEvent } from 'react';
import { SESSION } from '../data/content';
import { d } from '../lib/reveal';

type Kind = 'skill' | 'automation';

function buildMarkdown(name: string, kind: Kind) {
  const schedule = kind === 'automation' ? '\nschedule: 每周一 09:00' : '';
  return `---
name: ${name}
description: 按 tracker 逐个研究客户，写回表格并汇总到 Teams 频道${schedule}
---

# Weekly account research

## When to use
每周一早上，需要按 tracker 里的客户清单刷新研究结论时。

## Steps
${SESSION.list.map((step, i) => `${i + 1}. ${step}。`).join('\n')}

<!-- 示例文件 · 由技能记录器中文站的演示生成 · 没有上传任何内容 -->`;
}

function CreateDialog() {
  const [name, setName] = useState('weekly-account-research');
  const [kind, setKind] = useState<Kind>('skill');
  const [status, setStatus] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const slug = (name.trim() || 'weekly-account-research').replace(/\s+/g, '-').toLowerCase();
    const file = `${slug}.md`;
    const url = URL.createObjectURL(new Blob([buildMarkdown(slug, kind)], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(`已生成 ${file} · 示例文件，没有上传任何内容`);
  };

  return (
    <form className="dlg" data-ui onSubmit={submit}>
      <h3>创建技能</h3>

      <label className="field" htmlFor="skill-name">
        名称
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

      <fieldset className="m-0 mt-3.5 border-0 p-0">
        <legend className="field">产物</legend>
        <div className="seg">
          <label>
            <input
              type="radio"
              name="kind"
              value="skill"
              checked={kind === 'skill'}
              onChange={() => setKind('skill')}
            />
            技能
          </label>
          <label>
            <input
              type="radio"
              name="kind"
              value="automation"
              checked={kind === 'automation'}
              onChange={() => setKind('automation')}
            />
            自动化
          </label>
        </div>
      </fieldset>

      <p className="note">
        {kind === 'skill'
          ? '生成一份 SKILL.md：按需执行，安装前可只读查看。'
          : '生成一份带 schedule 的 SKILL.md：同一份流程按计划跑。'}
      </p>

      <button className="go" type="submit">
        生成 SKILL.md
      </button>
      <p className="status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}

export function Cta() {
  return (
    <section
      className="grid min-h-[62svh] gap-8 bg-accent py-14 text-white max-mob:min-h-0 max-mob:py-12 mob:grid-cols-[5fr_7fr] mob:px-10 mob:py-20"
      aria-labelledby="cta-title"
    >
      <div className="page-m flex flex-col justify-center max-mob:order-1 mob:pl-0">
        <h2
          id="cta-title"
          className="text-[clamp(44px,6.2vw,96px)] leading-[0.95] tracking-[-0.045em]"
          data-reveal
        >
          录一次，
          <br />
          就有了。
        </h2>
        <p className="mt-4 max-w-[42ch] text-[17px] text-[#ffe3e6]" data-reveal style={d(90)}>
          39 秒的会话，足够写成一份可复用的技能。
        </p>
      </div>
      <div className="page-m grid place-items-center max-mob:order-2 mob:pr-0">
        <div data-reveal style={d(140)} className="w-full max-w-[440px]">
          <CreateDialog />
        </div>
      </div>
    </section>
  );
}
