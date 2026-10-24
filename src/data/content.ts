export const REPO = 'https://github.com/microsoft/skill-recorder';
export const RELEASE = `${REPO}/releases/latest`;
export const COMMIT = 'b05d59036182e897e1a60e90651e775cf5f97e8d';
export const VERSION = 'v0.7.0';
export const RELEASED = '2026-09-21';

export const INSTALL = {
  win: `$commit="${COMMIT}"; $env:SKILL_RECORDER_COMMIT=$commit; irm "https://raw.githubusercontent.com/microsoft/skill-recorder/$commit/install.ps1" | iex`,
  unix: `commit="${COMMIT}"; curl -fsSL "https://raw.githubusercontent.com/microsoft/skill-recorder/$commit/install.sh" | SKILL_RECORDER_COMMIT="$commit" bash`,
};

export type Stage = {
  id: string;
  runIn: string;
  body: string;
  fragment: 'toolbar' | 'session' | 'steps' | 'file';
};

export const STAGES: Stage[] = [
  {
    id: 'record',
    runIn: '先录下来。',
    body: '按下录制，然后照常做事：切应用、开页面、复制一段文本、在终端里敲命令。它在后台记录，不打断你。',
    fragment: 'toolbar',
  },
  {
    id: 'control',
    runIn: '录的时候还能控制。',
    body: '常驻置顶的工具条显示捕获、麦克风与终端的状态；可以静音、换麦克风，最后确认结束，或者丢弃这次录制。',
    fragment: 'session',
  },
  {
    id: 'analyze',
    runIn: '分析。',
    body: '点 Analyze，Copilot 还原出一条总体意图和一份有序步骤。审阅、编辑，直改到读起来通顺准确。',
    fragment: 'steps',
  },
  {
    id: 'create',
    runIn: '最后一步，生成。',
    body: '一份 SKILL.md 按需执行，或同一份流程按计划跑。安装前可以只读查看完整文件，含 frontmatter。',
    fragment: 'file',
  },
];

export const SESSION = {
  name: 'Weekly account research',
  date: '7月30日 12:31',
  duration: '39s',
  size: '12.5 KB',
  steps: 6,
  intent: '逐个查完 tracker 里的客户，把结论写回表格，再把汇总发到 Teams 频道。',
  list: [
    '打开 research-tracker.xlsx，从第一个客户行开始',
    '搜索 Contoso 的近期新闻，记录融资与产品动作',
    '依次查完 Fabrikam 与 Northwind，各记一条结论',
    '把结论写回 notes 列，保留来源链接',
    '生成一段汇总，检查每个客户都有结论',
    '用 Teams 原生工具发到 Research 频道',
  ],
};

export const SKILL_MD = `---
name: weekly-account-research
description: 按 tracker 逐个研究客户，写回表格并汇总到 Teams
---

# Weekly account research

## When to use
每周一早上，需要按 tracker 里的客户清单刷新研究结论时。

## Steps
1. 打开 research-tracker.xlsx，定位到第一个客户所在行。
2. 用 web_fetch 搜索该客户的近期新闻，记录融资、产品与市场动作。
3. 把结论写回该客户的 notes 列，保留来源链接。
4. 重复第 2–3 步，处理其余客户行。`;

export type Feature = {
  id: string;
  title: string;
  lines: string[];
  panel: 'file' | 'schedule' | 'tools' | 'figure' | 'trace' | 'cli';
};

export const FEATURES: Feature[] = [
  {
    id: 'skill',
    title: '技能：一份 SKILL.md',
    lines: ['frontmatter 写清何时使用，正文写成有序步骤。', '安装或导出前，可以只读查看完整文件。'],
    panel: 'file',
  },
  {
    id: 'automation',
    title: '自动化：按计划跑',
    lines: ['同一份流程挂到时间表或触发器上，不用你再点一次。', '工具权限策略与安装流程保持不变。'],
    panel: 'schedule',
  },
  {
    id: 'tools',
    title: '原生工具优先',
    lines: ['调用 gh、web_fetch 与文件读写，而不是回放界面点击。', '所以你不在那台机器前，它也能跑。'],
    panel: 'tools',
  },
  {
    id: 'voice',
    title: '旁白在设备端转写',
    lines: ['说话比打字快：一边做一边讲，步骤就有了注释。', '音频与转写文本都不离开这台电脑。'],
    panel: 'figure',
  },
  {
    id: 'generalize',
    title: '从一次，到所有',
    lines: ['你录一份表单，就能教会 Agent 提交所有同类表单。', '它从这一个示例里归纳，而不是记住坐标。'],
    panel: 'trace',
  },
  {
    id: 'cli',
    title: '固定版本的 CLI',
    lines: ['登录走浏览器 OAuth，不需要设备码。', '更早的 1.0.71 不支持 --web-flow。'],
    panel: 'cli',
  },
];

export const CAPTURE = [
  { name: '窗口追踪', value: '应用与窗口切换' },
  { name: '浏览器 URL', value: '仅 macOS' },
  { name: '屏幕视频', value: '低帧率快照' },
  { name: '剪贴板', value: '文本预览' },
  { name: '旁白（可选）', value: '99 种语言' },
  { name: '录制终端', value: '仅本次会话' },
];

export const FAQ = [
  {
    q: '录制的内容什么时候离开我的电脑？',
    a: '录制、抽帧与旁白转写都在本机完成。只有你点 Analyze，事件时间线、屏幕图像、旁白文本与终端片段才会发到 GitHub 云端。',
    short: '录制与转写都在本地，只有 Analyze 会上传。',
  },
  {
    q: '支持 Windows 吗？',
    a: 'macOS 是首要支持平台；Windows 11（x64 与 ARM64）同样受支持，验证记录在 WINDOWS-VALIDATION.md。',
    short: 'macOS 优先，Windows 11 同样支持。',
  },
  {
    q: '安装需要先装 Git 或 Node.js 吗？',
    a: '不需要。一条命令会下载固定版本的 Node.js 运行时并在本机构建该发布提交，不全局安装任何东西，也不需要手动开发者搭建。',
    short: '不用，命令自带固定版本的 Node。',
  },
  {
    q: '登录为什么分成两步？',
    a: 'Windows 上的 Entra 租户提示只是路由选择，不是雇佣关系证明。先在浏览器完成 SSO，再授权 GitHub Copilot 应用；只有 SSO 不算授权。两步使用同一个浏览器配置文件。',
    short: '先浏览器 SSO，再授权 Copilot。',
  },
  {
    q: '登录超时或失败怎么办？',
    a: '登录可取消，五分钟后超时。浏览器登录失败时，应用会给出适用于内置 CLI 的手动命令（Windows 用 PowerShell）；手动登录后请自行重试分析。',
    short: '五分钟超时，失败时用手动命令。',
  },
  {
    q: '「查看 SKILL.md」会写入文件吗？',
    a: '不会。预览是只读的，显示含 frontmatter 的完整文件；关闭再打开不会重新生成，编辑计划会丢弃预览。查看只是让你看见生成的指令，不是安全保证。',
    short: '不会，预览只读且不写文件。',
  },
];

export const DOCS = [
  { label: '从源代码开发', value: 'Node.js 24 · npm ci · compliance:licenses · dev', href: `${REPO}/blob/main/INSTALL.md` },
  { label: '评测', value: 'npm run eval · eval:terminal · eval:builder', href: `${REPO}/blob/main/evals/README.md` },
  { label: '文档', value: 'INSTALL · RELEASING · evals · THIRD-PARTY-NOTICES', href: `${REPO}/blob/main/INSTALL.md` },
];

export const FOOTER_LINKS = [
  { label: '文档', href: `${REPO}/blob/main/INSTALL.md` },
  { label: 'GitHub', href: REPO },
  { label: 'Issues', href: `${REPO}/issues` },
  { label: 'SUPPORT', href: `${REPO}/blob/main/SUPPORT.md` },
  { label: 'SECURITY', href: `${REPO}/blob/main/SECURITY.md` },
];

export const FOOTER_FINE = [
  { label: 'MIT 许可', href: `${REPO}/blob/main/LICENSE` },
  { label: '贡献需签署 CLA', href: 'https://cla.opensource.microsoft.com' },
  { label: '开源行为准则', href: 'https://opensource.microsoft.com/codeofconduct/' },
  { label: '商标与品牌规范', href: 'https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general' },
];
