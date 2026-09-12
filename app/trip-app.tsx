'use client';

import { useEffect, useMemo, useState } from 'react';
import type { trip as tripData } from '../data/trip';

type Trip = typeof tripData;

const quickLinks = [
  { label: '每日行程', icon: '旅', href: '#days', tone: 'coral' },
  { label: '住宿資訊', icon: '宿', href: '#lodging', tone: 'blue' },
  { label: '重要提醒', icon: '醒', href: '#reminders', tone: 'yellow' },
  { label: 'B5 小冊', icon: '冊', href: './booklet/', tone: 'green' },
];

export function TripApp({ trip }: { trip: Trip }) {
  const [ownerMode, setOwnerMode] = useState(false);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('owner') === '1') localStorage.setItem('okinawa-owner-mode', '1');
    if (params.get('family') === '1') localStorage.removeItem('okinawa-owner-mode');
    const syncMode = window.setTimeout(() => setOwnerMode(localStorage.getItem('okinawa-owner-mode') === '1'), 0);
    return () => window.clearTimeout(syncMode);
  }, []);

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' });
  const activeDay = useMemo(() => trip.days.find((day) => day.isoDate === today), [today, trip.days]);
  const tripStarted = today >= trip.days[0].isoDate;
  const tripEnded = today > trip.days[trip.days.length - 1].isoDate;

  async function copyNavigation(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(''), 1800);
  }

  function leaveOwnerMode() {
    localStorage.removeItem('okinawa-owner-mode');
    setOwnerMode(false);
  }

  const statusTitle = activeDay
    ? `今天是 Day ${activeDay.day}｜${activeDay.theme}`
    : tripEnded ? '旅行平安完成，歡迎回家' : tripStarted ? '今天是行程間的休息日' : '準備出發去沖繩';

  return (
    <>
      {copied && <div className="copy-toast" role="status">已複製：{copied}</div>}
      {ownerMode && <div className="owner-bar"><span>我的模式 · 顯示個人備忘錄</span><button type="button" onClick={leaveOwnerMode}>切回家人模式</button></div>}

      <section className="hero">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="shell hero-inner">
          <p className="eyebrow">OUR FAMILY TRIP · OKINAWA</p><h1>{trip.title}</h1><p className="subtitle">{trip.subtitle}</p>
          <div className="date-pill">{trip.dateRange}</div><div className="sea-mark" aria-hidden="true"><span>〰</span><span>〰</span><span>〰</span></div>
        </div>
      </section>

      <div className="shell page-content">
        <section className="status-card" aria-labelledby="status-title">
          <div><p className="section-kicker">TRIP STATUS</p><h2 id="status-title">{statusTitle}</h2><p>{activeDay ? `今晚住宿：${activeDay.lodging}` : '行程、住宿與重要提醒都已整理在這裡。'}</p></div>
          <span className="status-badge">{trip.version}</span>
        </section>

        <nav className="quick-grid" aria-label="旅行資訊快速入口">
          {quickLinks.map((item) => <a className={`quick-card ${item.tone}`} href={item.href} key={item.label}><span className="quick-icon">{item.icon}</span><span>{item.label}</span><span aria-hidden="true">→</span></a>)}
        </nav>

        <section id="days" className="days-section" aria-labelledby="days-title">
          <div className="section-heading"><div><p className="section-kicker">5 DAYS IN OKINAWA</p><h2 id="days-title">五日行程</h2></div><p>展開日期查看完整資訊</p></div>
          <div className="day-list">
            {trip.days.map((day) => (
              <details className={`day-card ${activeDay?.day === day.day ? 'is-today' : ''}`} key={day.day} open={activeDay?.day === day.day}>
                <summary>
                  <div className="day-number"><span>DAY</span><strong>{day.day}</strong></div>
                  <div className="day-date"><strong>{day.date}</strong><span>星期{day.weekday}</span></div>
                  <div className="day-copy"><h3>{day.theme}</h3><p>{day.stops.length} 個行程 · {day.lodging}</p></div>
                  <span className="expand-label">展開</span>
                </summary>
                <div className="timeline">
                  {day.stops.map((stop, index) => (
                    <article className={stop.important ? 'important-stop' : ''} key={`${stop.time}-${stop.name}-${index}`}>
                      <time>{stop.time}</time>
                      <div className="stop-copy">
                        <div className="stop-title"><h4>{stop.name}</h4>{stop.badge && <span>{stop.badge}</span>}</div>
                        {stop.nameJa && <p className="japanese-name">{stop.nameJa}</p>}{stop.note && <p>{stop.note}</p>}
                        {stop.navigationName && <button className="copy-button" type="button" onClick={() => copyNavigation(stop.navigationName!)}>複製導航名稱</button>}
                      </div>
                    </article>
                  ))}
                </div>
                {ownerMode && day.privateNotes.length > 0 && (
                  <section className="private-notes" aria-label={`Day ${day.day} 我看的備忘錄`}>
                    <div className="private-heading"><span>只在我的模式顯示</span><h4>我看的備忘錄</h4></div>
                    <div className="private-list">{day.privateNotes.map((note, index) => <article key={`${note.situation}-${index}`}><strong>{note.situation}</strong><p>{note.action}</p></article>)}</div>
                  </section>
                )}
              </details>
            ))}
          </div>
        </section>

        <section id="lodging" className="content-section"><div className="section-heading"><div><p className="section-kicker">STAY</p><h2>住宿資訊</h2></div></div><div className="info-grid">{trip.lodging.map((stay) => <article className="info-card" key={stay.nights}><strong>{stay.nights}</strong><h3>{stay.name}</h3><p>{stay.detail}</p></article>)}</div></section>
        <section id="reminders" className="reminder-card"><p className="section-kicker">DON&apos;T FORGET</p><h2>重要提醒</h2><ul>{trip.importantReminders.map((reminder) => <li key={reminder}>{reminder}</li>)}</ul></section>
        <section className="pending-grid">
          <article><span>車</span><div><h3>自駕資訊</h3><p>租車公司、地址、電話與加油資訊待補。</p></div></article>
          <article><span>SOS</span><div><h3>緊急資訊</h3><p>保險、同行聯絡人與緊急電話待補。</p></div></article>
        </section>
        <footer><strong>OKINAWA · 2026</strong><a href="./booklet/">B5 小冊預覽 →</a><span>更新：{trip.lastUpdated}</span></footer>
      </div>
    </>
  );
}
