import { COMMIT, FOOTER_FINE, FOOTER_LINKS, VERSION } from '../data/content';

export function Foot() {
  return (
    <footer className="page-m pb-10 pt-[7svh]">
      <div className="grid gap-4 border-0 mob:grid-cols-[1fr_auto_1fr] mob:items-baseline">
        <p className="inline-flex items-center gap-2 text-micro text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-ink">技能记录器 · Skill Recorder</span>
          <span>· Microsoft 开源项目 (MIT)</span>
        </p>

        <nav aria-label="页脚导航">
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-small">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  className="text-ink transition-opacity hover:opacity-70"
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-micro text-muted tabular-nums mob:text-right">
          {VERSION} ({COMMIT.slice(0, 7)}) · © 2026 中文整理版
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-4">
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-micro text-muted">
          {FOOTER_FINE.map((item) => (
            <a
              key={item.label}
              className="underline decoration-[#3a3a3a] underline-offset-4 transition-colors hover:text-ink hover:decoration-muted"
              href={item.href}
              rel="noreferrer"
              target="_blank"
            >
              {item.label}
            </a>
          ))}
        </p>
        <p className="text-micro text-[#8c8c8c]">
          本站为中文整理版，技术规范与发布说明以上游 README 及官方文档为准。
        </p>
      </div>
    </footer>
  );
}
