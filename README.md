# Skill Recorder（技能记录器）

**把自己执行一次任务的过程录下来，再把它变成你的 AI 智能体可以重复使用的技能。**

> [!TIP]
> **想安装 Skill Recorder？[前往最新发布版本](https://github.com/microsoft/skill-recorder/releases/latest)。**
> 滚动到 **Commit-pinned installation（按提交固定版本安装）**，复制适用于你操作系统的完整命令。命令已经可以直接粘贴：你无需自行修改，也不必下载源代码。[下方的分步说明](#快速开始)。

Skill Recorder 会在你的屏幕上捕获一次真实的工作过程：点击操作、应用与窗口的切换、你访问过的页面、可选「录制终端」中的命令与输出，以及（如果你愿意）你的语音旁白。随后，它借助 **GitHub Copilot CLI** 把你 *实际做过的事* 还原成清晰的 **意图，外加一份有序的步骤清单**。在此基础上，只需一步，就能把这次单独的运行变成智能体可以复用的成果：

- **技能（Skill）**：一份 `SKILL.md` 流程说明，智能体可按需执行；或
- **自动化（Automation）**：同一份流程按计划或触发器运行。

两者都优先使用智能体的 **原生工具**（如 `gh` CLI 或 `web_fetch`），而不是回放界面点击，并且会从你这一个示例中归纳泛化——所以你录制自己提交 *一份* 表单，就能教会智能体提交 *所有* 同类表单。

<p align="center">
  <img src="https://raw.githubusercontent.com/microsoft/skill-recorder/main/docs/images/recorder.png" alt="Skill Recorder 捕获窗口：一个录制按钮、计时器、可选的旁白开关（含语言与麦克风设置）以及就绪检查" width="420">
  &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/microsoft/skill-recorder/main/docs/images/library.png" alt="Skill Recorder 会话视图：左侧为已录制的会话，右侧为还原出的意图与有序步骤" width="520">
</p>

## 工作原理

1. 🔴 **录制。** 点击录制（或随时按下 `⌘⇧R` / `Ctrl+Shift+R`），然后照常完成你的任务。Skill Recorder 会在后台于本地捕获你的屏幕与活动。
2. 🎛️ **控制。** 录制时，一个常驻置顶的小工具条会显示捕获、麦克风与录制终端的状态。你可以打开本次会话专属的终端、静音、取消静音或切换麦克风，最后确认结束或丢弃录制。
3. 🧠 **分析。** 点击 Analyze，GitHub Copilot 会还原出一条总体意图与一份有序步骤清单。审阅并编辑，直到读起来通顺准确。
4. ✨ **创建。** 基于一份已通过的分析，生成可复用的 **技能** 和/或一份按计划的 **自动化**。

对于技能，**Review SKILL.md（查看 SKILL.md）** 可在安装或导出前选择性地展示完整、只读的文件内容（含 frontmatter）。生成预览时不会写入任何技能文件。关闭后再重新打开不会重新生成；无论从哪个界面执行 Add/Export（添加/导出），使用的都是这份预览。编辑计划会丢弃预览。你也可以跳过查看、不加确认步骤，直接选择 Add/Export。查看只是让你能看见生成的指令，并不是安全保证。

<a id="快速开始"></a>

## 快速开始

Skill Recorder 以 **源代码发布（source release）** 的形式提供：一条命令会下载一个固定版本的 Node.js 运行时，在你的机器上构建出该发布版本对应的精确提交，并添加一个随时可重新启动的 **Skill Recorder (Source)** 应用。不会在全局安装任何东西。你需要一个具备 **Copilot 访问权限** 的 GitHub 账号；Copilot CLI 已随应用一同提供。

macOS 是首要支持平台。Windows 11（x64 与 ARM64）同样受支持（详见 [`WINDOWS-VALIDATION.md`](https://github.com/microsoft/skill-recorder/blob/main/WINDOWS-VALIDATION.md)）。

### 安装

打开 **[最新发布版本](https://github.com/microsoft/skill-recorder/releases/latest)**，并按以下步骤操作：

1. 在发布页面上，滚动到 **Commit-pinned installation（按提交固定版本安装）**。找到 **Windows 11 x64 或 ARM64** 或 **macOS 或 Ubuntu**，然后使用该代码块右上角的复制按钮，复制该小节中的 **完整命令**。
2. 从 Windows 开始菜单打开 **PowerShell**，或在 macOS / Ubuntu 上打开 **Terminal**。粘贴命令并按下 **Enter**。
3. 安装完成前请保持该窗口打开。安装程序会下载所需内容、在你的电脑上构建应用、创建快捷方式并启动 Skill Recorder。首次安装可能需要几分钟。

> [!IMPORTANT]
> **请从发布页面复制命令，而不是从技术文档复制模板。**
> 发布命令已包含正确的版本标识，无需替换任何内容。不要原样粘贴包含 `<40-character-release-commit>` 的命令。
> 你 **并不需要** Git、单独安装 Node.js，也无需 **Manual developer setup（手动开发者搭建）** 说明。**Assets** 下的 **Source code (zip)** 与 **Source code (tar.gz)** 链接并不是应用安装程序。

若想在运行前先审阅脚本，请改用发布页面上的 **inspect-first（先检查）说明**。安装仍需遵守你所在组织的策略。

**之后再次打开：** 在 Windows 上通过桌面或开始菜单中的 **Skill Recorder (Source)**；在 macOS 上可在 `~/Applications`、Spotlight 或 Launchpad 中找到；在 Ubuntu 上使用对应的应用入口。无需每次重新安装。包括 macOS / Ubuntu 后台运行在内的高级选项，见 [`INSTALL.md`](https://github.com/microsoft/skill-recorder/blob/main/INSTALL.md#commit-pinned-one-line-installation)。

### 然后开始录制

1. **授予屏幕录制权限。** 首次启动时，macOS 会请求屏幕录制权限；授予后即可开始录制。
2. **录制、分析、创建。** 完成任务后点击 Analyze。首次分析时，如果你尚未登录，Skill Recorder 会提供 **Sign in to Copilot（登录 Copilot）**。在浏览器中完成授权；应用会校验登录状态，并自动重试一次被中断的分析。没有需要关闭的登录终端窗口。取消登录或离开该分析，会导致自动重试无法进行。

在 Windows 上，本地的 Microsoft Entra 租户提示会让你在 **Microsoft Enterprise SSO（企业 SSO）** 与 **个人 GitHub 账号** 之间选择。这只是一个路由提示，并非雇佣关系的证明。Microsoft 登录分为两个独立步骤：先在浏览器中完成 SSO，再授权 GitHub Copilot 应用。当 SSO 跳转到 `github.com/enterprises/microsoft` 时，关闭该标签页，返回 Skill Recorder，并选择 **Authorize Copilot（授权 Copilot）**。仅完成 SSO 并不会授权该应用。两个步骤请使用同一个浏览器配置文件，以及已关联 Microsoft 的 GitHub 账号。如果没有该提示，或在 macOS / Linux 上，登录会直接进入标准的 GitHub 流程，无需输入工作邮箱。

授权步骤会通过 CLI 的 Web OAuth 流程打开默认浏览器，而不是使用设备码。保持同一个浏览器配置文件，GitHub 就能复用 SSO 的会话，从而无需输入代码即可批准 GitHub Copilot 应用。如果 GitHub 要求再次登录，请确认你使用的是同一个浏览器配置文件。授权完成后，关闭该标签页并返回 Skill Recorder；应用在继续之前会校验访问权限。

Skill Recorder 固定使用 Copilot CLI 1.0.78，它支持无需终端的 Web OAuth，并运行 `--no-auto-update login --web-flow`，使登录不依赖用户自动更新缓存中的其他 CLI 版本。更早的内置版本（如 1.0.71）不支持 `--web-flow`。

登录可被取消，并在五分钟后超时。如果浏览器登录失败，应用会显示错误，并给出一条适用于内置 CLI 的手动命令（Windows 上请使用 PowerShell）。手动登录后，请自行重试分析。从技能或自动化构建器中登录，不会自动重复进行构建或安装。

若想在运行前检查脚本、设置安装选项、更新或卸载，请见 [`INSTALL.md`](https://github.com/microsoft/skill-recorder/blob/main/INSTALL.md)。

> ⚠️ **不要把机密信息录进你的录制内容。** 不要录制、输入、粘贴或旁白密码、令牌、API 密钥或其他机密信息。选择 *Analyze（分析）* 会将录制数据发送到 GitHub 云端。Skill Recorder 会在每次录制前提醒你。详见 [采集了哪些内容](#采集了哪些内容)。

---

*以下内容面向想要了解细节，或想动手修改代码的人。*

<a id="采集了哪些内容"></a>

## 采集了哪些内容

录制、存储、抽帧，以及可选的旁白转写，全部 **在你的电脑上** 完成；录制过程中没有任何数据离开本地。只有当你选择 **Analyze（分析）** 时，Skill Recorder 才会把事件时间线（窗口/文档标题、URL、剪贴板预览、终端命令）、提取出的屏幕图像、旁白文本，以及分析期间请求的、有长度上限的终端输出片段，发送到 GitHub 云端交由 Copilot 处理。当启用保护时，终端命令与完整的本地终端记录会在返回任何所请求的片段之前，参与同一轮设备端的机密信息/PII 扫描。

应用内「Records your screen and activity（记录你的屏幕与活动）」面板会明确列出采集了哪些内容：

- **窗口追踪**：当前应用 / 窗口的切换。
- **浏览器 URL**：你所在的页面（macOS）。
- **屏幕视频**：由 Chromium 录制；仅当屏幕发生变化或到达心跳周期时，才保留低帧率快照。
- **剪贴板**：用于串联各步骤的、被复制文本的简短预览。
- **旁白** *（可选）*：语音评论，在 **设备端** 转写，支持 Whisper 的 99 种语言（首次使用时需一次性下载约 252 MB 的模型）。
- **录制终端** *（仅当从悬浮录制工具条打开时）*：命令、工作目录（cwd）、shell、退出状态、时长，以及完整的终端输出。该记录没有应用施加的大小上限，并计入已保存会话的存储占用。它只捕获该次录制中应用自有的终端——没有全局钩子、没有配置文件改动、没有后台命令监控，也不会观测已有的终端。

> ⚠️ **请不要采集机密信息。** 密码、访问令牌、API 密钥、凭证及其他机密信息，绝不应在会话期间被录制、输入、粘贴、显示、复制或旁白。

## 从源代码开发

**面向修改代码的开发者，而非安装应用的用户。** 若要使用 Skill Recorder，请改用 [安装](#快速开始)。

需要 **Node.js 24**。在检出某个发布版本修订后：

```bash
npm ci
npm run compliance:licenses
npm run dev
```

`npm run dev` 会启动 Vite，并以热重载方式启动 Electron 应用；`⌘⇧R`（macOS）/ `Ctrl+Shift+R`（Windows）可在任意位置切换录制。完整的手动搭建、构建与 `dist` 脚本，以及本地源码构建与可再分发包之间的许可边界，见 [`INSTALL.md`](https://github.com/microsoft/skill-recorder/blob/main/INSTALL.md)。修改版本、依赖、资源或发布内容的维护者，必须遵循 [`RELEASING.md`](https://github.com/microsoft/skill-recorder/blob/main/RELEASING.md)。

## 评估（Evals）

Copilot 的 **describer（描述器）** 与 **builders（构建器）** 拥有基于 fixture（测试样例）的评估套件；详见 [`evals/README.md`](https://github.com/microsoft/skill-recorder/blob/main/evals/README.md)。

```bash
npm run eval            # 针对合成录制对描述器打分
npm run eval:terminal   # 对索引化终端输出的使用与脱敏打分
npm run eval:builder    # 对技能/自动化泛化能力打分
```

## 文档

- **[INSTALL.md](https://github.com/microsoft/skill-recorder/blob/main/INSTALL.md):** 安装选项、先检查再安装、更新、卸载，以及手动开发者搭建。
- **[RELEASING.md](https://github.com/microsoft/skill-recorder/blob/main/RELEASING.md):** 维护者发布手册。
- **[evals/README.md](https://github.com/microsoft/skill-recorder/blob/main/evals/README.md):** describer / builder 评估工具。
- **[THIRD-PARTY-NOTICES.md](https://github.com/microsoft/skill-recorder/blob/main/THIRD-PARTY-NOTICES.md):** 捆绑依赖的许可证。

## 安全

请不要用公开的 GitHub Issue 报告安全漏洞。有关 Microsoft 的协同披露流程与上报渠道，请见 [`SECURITY.md`](https://github.com/microsoft/skill-recorder/blob/main/SECURITY.md)。

## 支持

通过 **[GitHub Issues](https://github.com/microsoft/skill-recorder/issues)** 提交缺陷与功能请求（请先搜索已有 Issue，避免重复）。支持范围仅限于 [`SUPPORT.md`](https://github.com/microsoft/skill-recorder/blob/main/SUPPORT.md) 中描述的资源。

## 许可证

[MIT](https://github.com/microsoft/skill-recorder/blob/main/LICENSE)

## 贡献

本项目欢迎贡献与建议。大多数贡献需要你同意一份贡献者许可协议（CLA），声明你有权、并且确实授予我们使用你的贡献的权利。详情请访问 [Contributor License Agreements（贡献者许可协议）](https://cla.opensource.microsoft.com)。

当你提交 pull request 时，一个 CLA 机器人会自动判断你是否需要提供 CLA，并相应地为 PR 做标注（例如状态检查、评论）。只需按机器人给出的指引操作即可。在使用我们 CLA 的所有仓库中，你只需完成一次。

本项目采用 [Microsoft Open Source Code of Conduct（Microsoft 开源行为准则）](https://opensource.microsoft.com/codeofconduct/)。了解更多信息，请参见 [Code of Conduct FAQ（行为准则常见问题）](https://opensource.microsoft.com/codeofconduct/faq/)，或通过 [opencode@microsoft.com](mailto:opencode@microsoft.com) 联系我们提出任何疑问或意见。

## 商标

本项目可能包含项目、产品或服务的商标或标识。对 Microsoft 商标或标识的授权使用，须遵守并遵循 [Microsoft's Trademark & Brand Guidelines（Microsoft 商标与品牌使用规范）](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general)。在本项目的修改版本中使用 Microsoft 商标或标识，不得造成混淆，也不得暗示 Microsoft 的赞助。任何第三方商标或标识的使用，均须遵守该第三方的政策。
