import { FOOTER_FINE, FOOTER_LINKS } from '../data/content';

export function Foot() {
  return (
    <footer className="page-m pb-7 pt-[9svh]">
      <div className="grid gap-4 border-0 mob:grid-cols-[1fr_auto_1fr] mob:items-baseline">
        <p className="text-micro text-muted">技能记录器 · Microsoft 开源项目，MIT 许可</p>
        <nav aria-label="页脚">
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
        <p className="text-micro text-muted mob:text-right">© 2026 · 中文整理版</p>
      </div>
      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-micro text-muted">
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
      <p className="mt-2 text-micro text-[#8c8c8c]">
        本站为中文整理版，内容以上游 README 与官方文档为准。
      </p>
    </footer>
  );
}
