import { useState } from 'react';
import { CAPTURE } from '../data/content';
import { d } from '../lib/reveal';

export function Capture() {
  const [openId, setOpenId] = useState<string>('terminal');

  return (
    <section
      id="capture"
      className="page-m scroll-mt-6 border-b border-hairline py-[64px] mob:py-[96px]"
      aria-labelledby="cap-title"
    >
      <div className="grid gap-12 mob:grid-cols-[minmax(320px,430px)_minmax(0,1fr)] mob:gap-16">
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-micro text-muted">PRIVACY & TELEMETRY BOUNDARY</span>
            <h2 id="cap-title" className="mt-2 text-h2 max-mob:text-[26px]" data-reveal>
              采集了哪些内容
            </h2>
            <p className="mt-4 max-w-[38ch] text-[17px] leading-[1.6] text-soft" data-reveal style={d(60)}>
              录制、存储、抽帧与旁白转写全部在<strong>本机</strong>完成；只有当你主动点击{' '}
              <strong className="font-medium text-ink">Analyze</strong>，数据才会离开这台电脑。
            </p>
            <p className="mt-4 max-w-[42ch] text-small leading-[1.65] text-muted" data-reveal style={d(100)}>
              启用保护时，终端命令与完整的本地终端记录会先参与同一轮设备端机密信息 / PII
              扫描，之后才返回分析所请求的、有长度上限的片段。录制终端只捕获本次录制中应用自有的终端：没有全局钩子、不改配置文件、不后台监控已有终端。
            </p>

            {/* Local vs Cloud Boundary Diagram */}
            <div className="privacy-pipe mt-7" data-ui data-reveal style={d(140)}>
              <div className="privacy-step">
                <span className="privacy-dot local" aria-hidden="true" />
                <div>
                  <strong className="text-[13.5px] font-medium text-ink">本机闭环（默认）</strong>
                  <p className="text-[12.5px] text-muted">屏幕快照 · Whisper 语音转写 · 完整终端日志</p>
                </div>
                <span className="privacy-badge">0 字节上传</span>
              </div>
              <div className="privacy-step">
                <span className="privacy-dot scan" aria-hidden="true" />
                <div>
                  <strong className="text-[13.5px] font-medium text-ink">点击 Analyze 时</strong>
                  <p className="text-[12.5px] text-muted">设备端 PII / 机密脱敏扫描 → 发送时间线与脱敏片段至 GitHub Copilot</p>
                </div>
                <span className="privacy-badge">手动触发</span>
              </div>
            </div>
          </div>

          <div className="secret-alert mt-7" data-reveal style={d(180)} role="note">
            <div className="secret-alert-head">
              <span className="secret-dot" aria-hidden="true" />
              <strong className="font-medium text-[#ff8a9a]">不要把机密信息录进去</strong>
            </div>
            <p className="mt-1.5 text-[13.5px] leading-[1.55] text-soft">
              密码、访问令牌、API 密钥与凭据，绝不应在会话期间被录制、输入、粘贴、显示、复制或旁白。Skill Recorder 会在每次录制前提醒你。
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between text-micro text-muted" data-reveal>
            <span>RECORDS YOUR SCREEN AND ACTIVITY · 6 项采集通道</span>
            <span>点击条目查看本地处理细则</span>
          </div>

          <ul className="cap-list" data-reveal style={d(80)}>
            {CAPTURE.map((row) => {
              const isOpen = openId === row.id;
              return (
                <li key={row.id} className="cap-item" data-open={isOpen}>
                  <button
                    type="button"
                    className="cap-row"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? '' : row.id)}
                  >
                    <span className="d" aria-hidden="true" />
                    <span className="cap-name">{row.name}</span>
                    <span className="cap-scope max-mob:hidden">{row.scope}</span>
                    <span className="v">{row.value}</span>
                  </button>
                  {isOpen && (
                    <div className="cap-detail">
                      <p>{row.detail}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
