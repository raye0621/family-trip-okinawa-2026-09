import { trip } from '../data/trip';
import { OfflineReady } from './offline-ready';

const quickLinks = [
  { label: '每日行程', icon: '旅', href: '#days', tone: 'coral' },
  { label: '今晚住宿', icon: '宿', href: '#lodging', tone: 'blue' },
  { label: '美食清單', icon: '食', href: '#food', tone: 'yellow' },
  { label: '自駕提醒', icon: '車', href: '#driving', tone: 'green' },
];

export default function Home() {
  return (
    <main>
      <OfflineReady />
      <section className="hero">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="shell hero-inner">
          <p className="eyebrow">OUR FAMILY TRIP · OKINAWA</p>
          <h1>{trip.title}</h1>
          <p className="subtitle">{trip.subtitle}</p>
          <div className="date-pill">{trip.dateRange}</div>
          <div className="sea-mark" aria-hidden="true"><span>〰</span><span>〰</span><span>〰</span></div>
        </div>
      </section>

      <div className="shell page-content">
        <section className="status-card" aria-labelledby="status-title">
          <div>
            <p className="section-kicker">TRIP STATUS</p>
            <h2 id="status-title">準備出發去沖繩</h2>
            <p>行程資料匯入後，這裡會顯示今天、下一站與今晚住宿。</p>
          </div>
          <span className="status-badge">{trip.version}</span>
        </section>

        <nav className="quick-grid" aria-label="旅行資訊快速入口">
          {quickLinks.map((item) => (
            <a className={`quick-card ${item.tone}`} href={item.href} key={item.label}>
              <span className="quick-icon">{item.icon}</span><span>{item.label}</span><span aria-hidden="true">→</span>
            </a>
          ))}
        </nav>

        <section id="days" className="days-section" aria-labelledby="days-title">
          <div className="section-heading">
            <div><p className="section-kicker">5 DAYS IN OKINAWA</p><h2 id="days-title">五日行程</h2></div>
            <p>點選日期查看當天完整資訊</p>
          </div>
          <div className="day-list">
            {trip.days.map((item, index) => (
              <article className="day-card" key={item.day}>
                <div className="day-number"><span>DAY</span><strong>{item.day}</strong></div>
                <div className="day-date"><strong>{item.date}</strong><span>星期{item.weekday}</span></div>
                <div className="day-copy"><h3>{item.theme}</h3><p>{item.stops.length ? `${item.stops.length} 個主要行程` : '詳細行程待匯入'}</p></div>
                <span className="day-arrow" aria-hidden="true">{index === 0 ? '準備中' : '→'}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="info-grid">
          <article id="lodging" className="info-card">
            <p className="section-kicker">STAY</p><h2>住宿資訊</h2>
            <p>飯店名稱、入住日期與導航名稱會集中在這裡。</p><span className="pending">待匯入</span>
          </article>
          <article id="driving" className="info-card accent">
            <p className="section-kicker">DRIVE SAFE</p><h2>沖繩自駕提醒</h2>
            <p>靠左行駛、取車資訊、加油與停車提醒。</p><span className="pending">待匯入</span>
          </article>
        </section>

        <footer><strong>OKINAWA · 2026</strong><a href="/booklet">B5 小冊預覽 →</a><span>同一份資料，陪我們一路旅行</span></footer>
      </div>
    </main>
  );
}
