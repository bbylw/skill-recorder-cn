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
  stepNo: string;
  badge: string;
  runIn: string;
  body: string;
  meta: string;
  fragment: 'toolbar' | 'session' | 'steps' | 'file';
};

export const STAGES: Stage[] = [
  {
    id: 'record',
    stepNo: '01',
    badge: 'RECORD · 本地捕获',
    runIn: '先录下来。',
    body: '按下录制（或 ⌘⇧R / Ctrl+Shift+R），然后照常做事：切应用、开页面、复制一段文本、在终端里敲命令。它在后台于本地记录，不打断你。',
    meta: '0 字节上传 · 仅屏幕变化或心跳时保留低帧率快照',
    fragment: 'toolbar',
  },
  {
    id: 'control',
    stepNo: '02',
    badge: 'CONTROL · 实时掌控',
    runIn: '录的时候还能控制。',
    body: '常驻置顶的小工具条实时显示捕获、麦克风与录制终端状态；可以打开会话专属终端、静音或切换麦克风，最后确认结束或丢弃录制。',
    meta: '无全局钩子 · 不修改 Shell 配置文件 · 随时可丢弃',
    fragment: 'session',
  },
  {
    id: 'analyze',
    stepNo: '03',
    badge: 'ANALYZE · 意图还原',
    runIn: '分析。',
    body: '点击 Analyze，GitHub Copilot 把你实际做过的事还原成一条总体意图和一份有序步骤清单。审阅、增删或直接编辑，直改到读起来通顺准确。',
    meta: 'Copilot CLI 1.0.78 · 设备端先完成机密信息 / PII 扫描',
    fragment: 'steps',
  },
  {
    id: 'create',
    stepNo: '04',
    badge: 'CREATE · 一步复用',
    runIn: '最后一步，生成。',
    body: '基于已通过的分析，一步生成按需执行的 SKILL.md 技能，或挂到时间表上按计划跑的自动化。安装或导出前可只读查看含 frontmatter 的完整文件。',
    meta: 'Review SKILL.md 只读预览 · 生成预览不写入磁盘文件',
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

export const OTHER_SESSIONS = [
  {
    name: 'Triage incoming GitHub issues',
    date: '7月29日 16:14',
    duration: '52s',
    size: '18.2 KB',
    steps: 5,
    status: '已生成 SKILL.md',
  },
  {
    name: 'Export monthly expense CSV',
    date: '7月28日 09:40',
    duration: '27s',
    size: '9.1 KB',
    steps: 4,
    status: '已设为每周五自动化',
  },
];

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
4. 重复第 2-3 步，处理其余客户行。`;

export const AUTOMATION_MD = `---
name: weekly-account-research
description: 按 tracker 逐个研究客户，写回表格并汇总到 Teams
schedule: "0 9 * * 1" # 每周一 09:00 自动触发
permissions:
  - web_fetch
  - fs:read_write
  - mcp:teams.post_message
---

# Weekly account research (Automation)

## Trigger
每周一 09:00 自动执行，无需人工点击。

## Steps
1. 读取 research-tracker.xlsx 中待更新的客户行。
2. 调用 web_fetch 检索近期融资、产品与市场动态。
3. 写回 notes 列并附带来源 URL，汇总发送至 Teams #Research。`;

export type Feature = {
  id: string;
  tag: string;
  title: string;
  lines: string[];
  panel: 'file' | 'schedule' | 'tools' | 'figure' | 'trace' | 'cli';
};

export const FEATURES: Feature[] = [
  {
    id: 'skill',
    tag: 'OUTPUT 01 · 技能文件',
    title: '技能：一份 SKILL.md',
    lines: [
      'YAML frontmatter 写清何时使用，正文写成结构化有序步骤。',
      '安装或导出前可只读预览完整文件；生成预览不会往磁盘写入任何文件。',
    ],
    panel: 'file',
  },
  {
    id: 'automation',
    tag: 'OUTPUT 02 · 计划任务',
    title: '自动化：按计划跑',
    lines: [
      '把同一份已验证的流程挂到时间表或触发器上，到点自动执行。',
      '工具权限策略与技能安装流程保持完全一致。',
    ],
    panel: 'schedule',
  },
  {
    id: 'tools',
    tag: 'EXECUTION · 原生工具',
    title: '原生工具优先，拒绝脆弱回放',
    lines: [
      '优先调用 gh CLI、web_fetch、文件读写与 MCP 工具，而不是回放鼠标坐标点击。',
      '即使窗口换了位置、甚至你不在那台机器前，流程依然稳定运行。',
    ],
    panel: 'tools',
  },
  {
    id: 'voice',
    tag: 'ON-DEVICE · 离线语音',
    title: '旁白在设备端离线转写',
    lines: [
      '说话比打字快：一边操作一边口述意图，步骤就自带上下文注释。',
      '基于设备端 Whisper 支持 99 种语言，录音与转写全程不离开本机。',
    ],
    panel: 'figure',
  },
  {
    id: 'generalize',
    tag: 'GENERALIZE · 示例归纳',
    title: '从做一次，到会做一类',
    lines: [
      '录制自己提交一份表单或查一家客户，就能教会 Agent 处理所有同类任务。',
      'Copilot 从单次示例中归纳参数与规律，而非机械死记硬背。',
    ],
    panel: 'trace',
  },
  {
    id: 'cli',
    tag: 'AUTH & RUNTIME · 固定版本',
    title: '固定搭载 Copilot CLI 1.0.78',
    lines: [
      '内置 --no-auto-update login --web-flow，走浏览器 Web OAuth，无需输入设备码。',
      '隔离本地缓存旧版本（如不支持 --web-flow 的 1.0.71），五分钟超时可随时取消。',
    ],
    panel: 'cli',
  },
];

export type CaptureItem = {
  id: string;
  name: string;
  value: string;
  scope: string;
  detail: string;
};

export const CAPTURE: CaptureItem[] = [
  {
    id: 'window',
    name: '窗口追踪',
    value: '应用与窗口切换',
    scope: '本地时间线',
    detail: '记录当前焦点应用与窗口/文档标题切换，帮助串联跨应用操作上下文。',
  },
  {
    id: 'url',
    name: '浏览器 URL',
    value: '仅 macOS',
    scope: '活动页面地址',
    detail: '在 macOS 上捕获当前访问的页面地址，让 Copilot 能改用原生 web_fetch。',
  },
  {
    id: 'screen',
    name: '屏幕视频',
    value: '低帧率快照',
    scope: '变化与心跳抽帧',
    detail: '由 Chromium 在本地录制；仅当画面发生变化或到达心跳周期时才保留关键帧快照。',
  },
  {
    id: 'clipboard',
    name: '剪贴板',
    value: '文本简短预览',
    scope: '跨步数据串联',
    detail: '保留复制文本的简短预览，用于理解数据如何从浏览器或终端流向表格与文档。',
  },
  {
    id: 'voice',
    name: '旁白（可选）',
    value: '99 种语言 · 离线',
    scope: 'Whisper 设备端',
    detail: '语音评论在本地通过 Whisper 转写（首次下载约 252 MB 模型），原始音频不上传。',
  },
  {
    id: 'terminal',
    name: '录制终端',
    value: '仅本次会话专属',
    scope: '命令 + cwd + 脱敏扫描',
    detail: '仅当从悬浮工具条打开时捕获命令、cwd、退出码与输出；无全局钩子，分析前经设备端 PII/机密扫描。',
  },
];

export const FAQ = [
  {
    q: '录制的内容什么时候离开我的电脑？',
    a: '录制、存储、抽帧与旁白转写全部在本机完成，录制期间没有任何数据离开本地。只有当你主动点击 Analyze 时，事件时间线、关键帧屏幕图像、旁白文本与有长度上限的终端输出片段才会发往 GitHub 云端交由 Copilot 处理。',
    short: '录制与转写都在本地，只有点 Analyze 才会上传。',
    tag: '隐私与数据边界',
  },
  {
    q: '支持 Windows 和 Linux 吗？',
    a: 'macOS 是首要支持平台；Windows 11（x64 与 ARM64）同样受官方支持（验证细节见仓库 WINDOWS-VALIDATION.md），安装脚本亦支持 Ubuntu 桌面环境。',
    short: 'macOS 首要支持，Windows 11 (x64/ARM64) 与 Ubuntu 同样可用。',
    tag: '平台兼容性',
  },
  {
    q: '安装需要先装 Git 或 Node.js 吗？',
    a: '完全不需要。Skill Recorder 以源代码发布（source release）形式提供：一条固定提交的命令会自动下载固定版本的 Node.js 运行时，在本机构建精确版本并生成可随时重开的 Skill Recorder (Source) 快捷方式，不在全局污染任何环境。',
    short: '不需要，一行命令自带独立 Node 运行时并在本机构建。',
    tag: '零依赖安装',
  },
  {
    q: 'Windows 上登录为什么分成两步？',
    a: 'Windows 上的 Microsoft Entra 租户提示只是路由选择（企业 SSO 或个人 GitHub 账号），并非雇佣关系证明。登录分为两步：先在浏览器完成 SSO（跳转到 github.com/enterprises/microsoft 后即可关闭标签页），再返回应用点击 Authorize Copilot 完成 Web OAuth 授权。两步请保持同一个浏览器配置文件。',
    short: '先完成浏览器 SSO 会话，再点 Authorize Copilot 授权应用。',
    tag: '身份验证与 SSO',
  },
  {
    q: '登录超时或浏览器授权失败怎么办？',
    a: '登录过程可随时取消，默认五分钟后超时。如果浏览器 Web OAuth 登录失败，应用会直接显示错误并提供适用于内置 Copilot CLI (1.0.78) 的手动登录命令（Windows 使用 PowerShell）；手动完成登录后，重新点击 Analyze 即可。',
    short: '五分钟超时保护；失败时应用会给出内置 CLI 的手动登录命令。',
    tag: '故障恢复',
  },
  {
    q: '「查看 SKILL.md」会往电脑写入文件吗？',
    a: '不会。Review SKILL.md 展示的是含 YAML frontmatter 的完整只读预览；生成预览时不会写入任何技能文件。关闭再打开不会重新生成，后续执行 Add/Export 使用的正是这份预览；若返回修改步骤计划则会丢弃旧预览。',
    short: '不会，预览完全只读且不写盘，直到你确认导出或添加。',
    tag: '文件安全',
  },
];

export const DOCS = [
  {
    label: '从源代码开发',
    value: 'Node.js 24 · npm ci · npm run compliance:licenses · npm run dev',
    href: `${REPO}/blob/main/INSTALL.md`,
  },
  {
    label: '评估套件（Evals）',
    value: 'npm run eval · eval:terminal · eval:builder（基于 fixture 打分）',
    href: `${REPO}/blob/main/evals/README.md`,
  },
  {
    label: '官方文档索引',
    value: 'INSTALL · WINDOWS-VALIDATION · RELEASING · THIRD-PARTY-NOTICES',
    href: `${REPO}/blob/main/INSTALL.md`,
  },
];

export const FOOTER_LINKS = [
  { label: '安装指南', href: `${REPO}/blob/main/INSTALL.md` },
  { label: '最新发布', href: RELEASE },
  { label: 'GitHub 仓库', href: REPO },
  { label: 'Issues', href: `${REPO}/issues` },
  { label: 'SUPPORT', href: `${REPO}/blob/main/SUPPORT.md` },
  { label: 'SECURITY', href: `${REPO}/blob/main/SECURITY.md` },
];

export const FOOTER_FINE = [
  { label: 'MIT 许可证', href: `${REPO}/blob/main/LICENSE` },
  { label: '贡献者许可协议 (CLA)', href: 'https://cla.opensource.microsoft.com' },
  { label: 'Microsoft 开源行为准则', href: 'https://opensource.microsoft.com/codeofconduct/' },
  { label: '商标与品牌使用规范', href: 'https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general' },
];
