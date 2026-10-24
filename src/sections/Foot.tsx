import { FOOTER_FINE, FOOTER_LINKS } from '../data/content';

export function Foot() {
  return (
    <footer className="site-footer">
      <div className="page-m">
        <div className="footer-main">
          <a href="#top" className="footer-brand" aria-label="技能记录器，返回顶部">
            <span className="brand-mark" aria-hidden="true"><i /></span>
            <span><strong>技能记录器</strong><small>Skill Recorder · Microsoft 开源项目</small></span>
          </a>
          <nav aria-label="页脚导航">
            <ul className="footer-links">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}><a href={link.href} rel="noreferrer" target="_blank">{link.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-fine">
          <p className="footer-legal">
            {FOOTER_FINE.map((item) => <a key={item.label} href={item.href} rel="noreferrer" target="_blank">{item.label}</a>)}
          </p>
          <p>© 2026 中文整理版，技术规范与发布说明以官方文档为准。</p>
        </div>
      </div>
    </footer>
  );
}
