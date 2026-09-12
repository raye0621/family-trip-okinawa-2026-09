import { trip } from '../../data/trip';
import './booklet.css';

export default function BookletPage() {
  return (
    <main className="booklet">
      <section className="book-page cover">
        <div className="cover-sun" />
        <p>OUR FAMILY TRIP</p>
        <div>
          <h1>沖繩<br />家族旅行</h1>
          <p className="cover-subtitle">{trip.subtitle}</p>
        </div>
        <strong>{trip.dateRange}</strong>
      </section>

      <section className="book-page overview">
        <header><p>ITINERARY</p><h2>五日行程總覽</h2></header>
        <div className="overview-list">
          {trip.days.map((day) => (
            <article key={day.day}>
              <div className="book-day"><span>DAY</span><strong>{day.day}</strong></div>
              <div><p>{day.date} · 星期{day.weekday}</p><h3>{day.theme}</h3><span>{day.stops.length ? `${day.stops.length} 個主要行程` : '詳細內容待匯入'}</span></div>
            </article>
          ))}
        </div>
        <aside>這份小冊與手機版共用同一份行程資料。</aside>
      </section>

      {trip.days.map((day) => (
        <section className="book-page day-page" key={day.day}>
          <header>
            <div className="large-day"><span>DAY</span>{day.day}</div>
            <div><p>{day.date} · 星期{day.weekday}</p><h2>{day.theme}</h2></div>
          </header>
          {day.stops.length ? (
            <div className="book-timeline">
              {day.stops.map((stop) => <article key={`${stop.time}-${stop.name}`}><time>{stop.time}</time><div><h3>{stop.name}</h3>{stop.nameJa && <p>{stop.nameJa}</p>}{stop.note && <p>{stop.note}</p>}</div></article>)}
            </div>
          ) : (
            <div className="empty-content"><span>〰 〰 〰</span><h3>行程內容待匯入</h3><p>收到既有旅行資料後，這一頁會自動排成適合閱讀的每日版面。</p></div>
          )}
          <footer><span>OKINAWA 2026</span><span>{day.day + 2}</span></footer>
        </section>
      ))}

      <a className="back-to-app" href="../">← 回到手機版</a>
    </main>
  );
}
