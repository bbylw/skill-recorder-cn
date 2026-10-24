import { CAPTURE } from '../data/content';
import { d } from '../lib/reveal';

export function Capture() {
  return (
    <section
      className="page-m grid gap-10 py-[52px] mob:grid-cols-[minmax(320px,430px)_minmax(0,1fr)] mob:gap-16 mob:py-[80px]"
      aria-labelledby="cap-title"
    >
      <div>
        <h2 id="cap-title" className="text-h2 max-mob:text-[24px]" data-reveal>
          采集了哪些内容
        </h2>
        <p className="mt-4 max-w-[34ch] text-soft" data-reveal style={d(70)}>
          六项都在本地完成；只有你点 Analyze，数据才会离开这台电脑。
        </p>
        <p className="mt-6 max-w-[42ch] text-small text-muted" data-reveal style={d(120)}>
          启用保护时，终端命令与完整的本地终端记录会先参与同一轮设备端机密信息 / PII
          扫描，之后才返回你请求的片段。录制终端只捕获这次录制中应用自有的终端：没有全局钩子、不改配置文件、不后台监控。
        </p>
      </div>

      <div>
        <ul className="grid" data-reveal style={d(60)}>
          {CAPTURE.map((row) => (
            <li key={row.name} className="cap-row">
              <span className="d" aria-hidden="true" />
              <span>{row.name}</span>
              <span className="v">{row.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-7 max-w-[52ch] border-0" data-reveal style={d(110)}>
          <strong className="font-medium text-[#ff7a8c]">不要把机密录进去。</strong>
          密码、令牌、API 密钥与凭据，不应在会话期间被录制、输入、粘贴、显示或旁白。
        </p>
      </div>
    </section>
  );
}
