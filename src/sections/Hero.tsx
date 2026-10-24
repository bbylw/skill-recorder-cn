import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubLogoIcon,
  ListIcon,
  MicrophoneIcon,
  MoonIcon,
  ShieldCheckIcon,
  SunIcon,
  WrenchIcon,
  XIcon,
} from '@phosphor-icons/react';
import { RELEASE, REPO } from '../data/content';
import { d } from '../lib/reveal';
import { RecorderFragment } from '../components/RecorderFragment';

const NAV_ITEMS = [
  { href: '#how', label: '工作原理' },
  { href: '#showcase', label: '交互演练' },
  { href: '#features', label: '产物与特性' },
  { href: '#capture', label: '隐私与采集' },
  { href: '#faq', label: '常见问题' },
];

type Theme = 'light' | 'dark';

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem('skill-recorder-theme', theme);
    } catch {
      // Storage can be unavailable in restricted browsing modes.
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0b0c0e' : '#f4f5f6');
  }, [theme]);

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      aria-label={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
      title={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
    >
      {theme === 'dark' ? <SunIcon size={18} aria-hidden="true" /> : <MoonIcon size={18} aria-hidden="true" />}
    </button>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstMobileLink.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="site-nav">
      <div className="hero-topbar page-m">
        <a href="#top" className="brand-link" aria-label="技能记录器，返回顶部">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span className="brand-name">技能记录器</span>
          <span className="brand-en">Skill Recorder</span>
        </a>

        <nav aria-label="页面章节" className="desktop-nav">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}><a href={item.href} className="nav-link">{item.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="repo-link"
            aria-label="打开 microsoft/skill-recorder GitHub 仓库"
          >
            <GithubLogoIcon size={18} aria-hidden="true" />
            <span>microsoft/skill-recorder</span>
          </a>
          <ThemeToggle />
          <a href="#install" className="nav-install">安装 Skill Recorder</a>
          <button
            ref={menuButton}
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? '关闭章节导航' : '打开章节导航'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <XIcon size={20} aria-hidden="true" /> : <ListIcon size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" aria-label="移动端页面章节" className="mobile-nav" hidden={!open}>
        <ul className="page-m">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.href}>
              <a
                ref={index === 0 ? firstMobileLink : undefined}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowRightIcon size={17} aria-hidden="true" />
              </a>
            </li>
          ))}
          <li><a href="#install" className="mobile-install" onClick={() => setOpen(false)}>安装 Skill Recorder</a></li>
        </ul>
      </nav>
    </div>
  );
}

export function Hero() {
  return (
    <header className="hero-shell">
      <div className="hero-main">
        <div className="hero-copy">
          <div>
            <p className="hero-eyebrow" data-reveal>为 Agent 记录真实工作流</p>
            <h1 className="hero-h1">
              <span className="mask-line hero-line"><span style={d(0)}>把一次真实操作，</span></span>
              <span className="mask-line hero-line"><span style={d(100)}>录成 Agent 的技能。</span></span>
            </h1>
            <p className="hero-lede" data-reveal style={d(180)}>
              照常完成一次任务。本地记录操作，再由 GitHub Copilot 还原意图与步骤，生成可复用的 <code className="inline-code">SKILL.md</code> 或自动化。
            </p>
            <div className="hero-actions" data-reveal style={d(260)}>
              <a className="btn-primary" href="#install">
                <span>安装 Skill Recorder</span>
                <ArrowDownIcon size={17} weight="bold" aria-hidden="true" />
              </a>
              <a className="btn-secondary" href="#how">
                <span>查看工作流</span>
                <ArrowRightIcon size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-stage-right">
          <div className="hero-recorder" data-reveal style={d(140)}>
            <RecorderFragment />
          </div>
          <a className="release-link" href={RELEASE} target="_blank" rel="noreferrer">
            <span>源码发布版，支持 macOS、Windows 11 与 Ubuntu</span>
            <ArrowUpRightIcon size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      <dl className="hero-facts page-m" data-reveal style={d(320)}>
        <div className="hero-fact">
          <ShieldCheckIcon size={22} aria-hidden="true" />
          <div><dt>隐私边界</dt><dd>录制与转写都在本地</dd><span>只有主动 Analyze 才上传</span></div>
        </div>
        <div className="hero-fact">
          <MicrophoneIcon size={22} aria-hidden="true" />
          <div><dt>语音注释</dt><dd>99 种语言设备端转写</dd><span>边做边讲，音频不离机</span></div>
        </div>
        <div className="hero-fact">
          <WrenchIcon size={22} aria-hidden="true" />
          <div><dt>执行方式</dt><dd>原生工具调用与示例归纳</dd><span>不是脆弱的坐标回放</span></div>
        </div>
      </dl>
    </header>
  );
}
