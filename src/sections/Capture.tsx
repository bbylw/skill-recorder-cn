import { useState } from 'react';
import {
  BrowserIcon,
  CaretDownIcon,
  ClipboardTextIcon,
  GlobeIcon,
  MicrophoneIcon,
  MonitorIcon,
  ShieldCheckIcon,
  TerminalWindowIcon,
  WarningIcon,
} from '@phosphor-icons/react';
import { CAPTURE } from '../data/content';
import { d } from '../lib/reveal';

function ChannelIcon({ id }: { id: string }) {
  const props = { size: 20, 'aria-hidden': true as const };
  if (id === 'url') return <GlobeIcon {...props} />;
  if (id === 'screen') return <MonitorIcon {...props} />;
  if (id === 'clipboard') return <ClipboardTextIcon {...props} />;
  if (id === 'voice') return <MicrophoneIcon {...props} />;
  if (id === 'terminal') return <TerminalWindowIcon {...props} />;
  return <BrowserIcon {...props} />;
}

export function Capture() {
  const [openId, setOpenId] = useState('terminal');

  return (
    <section id="capture" className="page-m section-block scroll-mt-24" aria-labelledby="cap-title">
      <div className="capture-layout">
        <div className="capture-intro">
          <span className="section-kicker" data-reveal>隐私与数据边界</span>
          <h2 id="cap-title" data-reveal><span>你的操作，</span><span>默认留在本机。</span></h2>
          <p className="capture-lede" data-reveal style={d(60)}>
            录制、存储、抽帧与旁白转写都在本机完成。只有你主动点击 <strong>Analyze</strong>，分析所需的数据才会离开电脑。
          </p>
          <p className="capture-detail" data-reveal style={d(90)}>
            启用保护时，终端内容先经过设备端机密信息与 PII 扫描。录制终端只捕获本次会话，没有全局钩子，也不监控已有终端。
          </p>

          <div className="privacy-pipe" data-ui data-reveal style={d(120)}>
            <div className="privacy-step">
              <ShieldCheckIcon size={22} aria-hidden="true" />
              <div><strong>本机闭环，默认状态</strong><p>屏幕快照、离线转写与完整终端日志</p></div>
              <span className="privacy-badge">0 字节上传</span>
            </div>
            <div className="privacy-step">
              <ShieldCheckIcon size={22} aria-hidden="true" />
              <div><strong>主动 Analyze 时</strong><p>先扫描，再发送分析所需的时间线与片段</p></div>
              <span className="privacy-badge">手动触发</span>
            </div>
          </div>

          <div className="secret-alert" data-reveal style={d(160)} role="note">
            <div className="secret-alert-head">
              <WarningIcon size={20} weight="fill" aria-hidden="true" />
              <strong>不要把机密信息录进去</strong>
            </div>
            <p>密码、访问令牌、API 密钥与凭据，不应在会话期间被录制、输入、粘贴、显示或旁白。</p>
          </div>
        </div>

        <div className="capture-channels">
          <div className="capture-channels-head" data-reveal>
            <h3>六项采集通道</h3>
            <span>点击条目查看处理细则</span>
          </div>
          <ul className="cap-list" data-reveal style={d(70)}>
            {CAPTURE.map((row) => {
              const isOpen = openId === row.id;
              return (
                <li key={row.id} className="cap-item" data-open={isOpen}>
                  <button
                    type="button"
                    className="cap-row"
                    aria-expanded={isOpen}
                    aria-controls={`capture-detail-${row.id}`}
                    onClick={() => setOpenId(isOpen ? '' : row.id)}
                  >
                    <span className="cap-icon"><ChannelIcon id={row.id} /></span>
                    <span className="cap-main"><span className="cap-name">{row.name}</span><span className="cap-scope">{row.scope}</span></span>
                    <span className="v">{row.value}</span>
                    <CaretDownIcon className="cap-caret" size={17} aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="cap-detail" id={`capture-detail-${row.id}`} role="region" aria-label={`${row.name}处理细则`}>
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
