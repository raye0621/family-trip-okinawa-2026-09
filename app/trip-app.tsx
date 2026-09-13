'use client';

import { useEffect, useMemo, useState } from 'react';
import type { trip as tripData } from '../data/trip';

type Trip = typeof tripData;

const quickLinks = [
  { label: '每日行程', icon: '旅', href: '#days', tone: 'coral' },
  { label: '住宿資訊', icon: '宿', href: '#lodging', tone: 'blue' },
  { label: '重要提醒', icon: '醒', href: '#reminders', tone: 'yellow' },
  { label: '小冊閱讀', icon: '冊', href: './booklet/', tone: 'green' },
];

function getDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

function daysBetween(from: string, to: string) {
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / dayInMilliseconds);
}

function highlightFirstMentions(text: string, terms: string[], seen: Set<string>, showKokusaiGuide?: () => void) {
  const matchedTerms = showKokusaiGuide && text.includes('國際通')
    ? [...new Set([...terms, '國際通'])]
    : terms;
  if (!matchedTerms.length) return text;

  const escapedTerms = matchedTerms
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${escapedTerms.join('|')})`, 'g');

  return text.split(pattern).map((part, index) => {
    if (!matchedTerms.includes(part) || seen.has(part)) return part;
    seen.add(part);
    if (part === '國際通' && showKokusaiGuide) {
      return <button className="inline-guide-link" type="button" onClick={showKokusaiGuide} key={`${part}-${index}`}>{part}</button>;
    }
    return <span className="name-highlight" key={`${part}-${index}`}>{part}</span>;
  });
}

function CopyableRouteTerm({ children, onCopy }: { children: string; onCopy: (value: string) => void }) {
  return <button className="route-copy-term" type="button" onClick={() => onCopy(children)}>{children}</button>;
}

function PrivateNotesList({ day, onShowKokusaiGuide }: { day: Trip['days'][number]; onShowKokusaiGuide: () => void }) {
  const seen = new Set<string>();
  const terms = day.privateHighlightTerms ?? [];

  return (
    <div className="private-list">
      {day.privateNotes.map((note, index) => (
        <article key={`${note.situation}-${index}`}>
          <strong>{highlightFirstMentions(note.situation, terms, seen, onShowKokusaiGuide)}</strong>
          <p>{highlightFirstMentions(note.action, terms, seen, onShowKokusaiGuide)}</p>
        </article>
      ))}
    </div>
  );
}

export function TripApp({ trip }: { trip: Trip }) {
  const [ownerMode, setOwnerMode] = useState(false);
  const [copied, setCopied] = useState('');
  const [previewDay, setPreviewDay] = useState<number | null>(null);
  const [showKokusaiGuide, setShowKokusaiGuide] = useState(false);
  const buildVersion = process.env.NEXT_PUBLIC_BUILD_VERSION ?? trip.version;

  const today = getDateKey(new Date());
  const activeDay = useMemo(
    () => previewDay ? trip.days.find((day) => day.day === previewDay) : trip.days.find((day) => day.isoDate === today),
    [previewDay, today, trip.days],
  );
  const [openDays, setOpenDays] = useState<number[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('owner') === '1') localStorage.setItem('okinawa-owner-mode', '1');
    if (params.get('family') === '1') localStorage.removeItem('okinawa-owner-mode');
    const requestedPreviewDay = Number(params.get('previewDay'));
    const syncMode = window.setTimeout(() => {
      setOwnerMode(localStorage.getItem('okinawa-owner-mode') === '1');
      if (trip.days.some((day) => day.day === requestedPreviewDay)) {
        setPreviewDay(requestedPreviewDay);
        setOpenDays((current) => current.includes(requestedPreviewDay) ? current : [...current, requestedPreviewDay].slice(-2));
      }
    }, 0);
    return () => window.clearTimeout(syncMode);
  }, [trip.days]);

  useEffect(() => {
    if (!showKokusaiGuide) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowKokusaiGuide(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [showKokusaiGuide]);

  const tripEnded = today > trip.days[trip.days.length - 1].isoDate;
  const overviewDay = activeDay ?? (tripEnded ? trip.days[trip.days.length - 1] : trip.days[0]);
  const overviewState = activeDay ? 'today' : tripEnded ? 'complete' : 'upcoming';
  const overviewKicker = activeDay ? '今日摘要' : tripEnded ? 'JOURNEY COMPLETE' : 'TRIP STARTS SOON';
  const overviewTitle = activeDay
    ? activeDay.theme
    : tripEnded ? '旅程完成，平安歸來 ～' : `距離出發還有 ${Math.max(0, daysBetween(today, trip.days[0].isoDate))} 天`;
  const overviewIntro = activeDay
    ? ''
    : tripEnded ? '五天四夜的沖繩家族旅行' : `第一天｜${overviewDay.theme.replaceAll('＋', '・')}`;
  const overviewCta = activeDay ? '今日詳細' : tripEnded ? '回顧行程' : '看第一天';

  function updateOpenDay(day: number, isOpen: boolean) {
    setOpenDays((current) => {
      const otherOpenDays = current.filter((openDay) => openDay !== day);
      return isOpen ? [...otherOpenDays, day].slice(-2) : otherOpenDays;
    });
  }

  function showOverviewDay() {
    setOpenDays((current) => current.includes(overviewDay.day) ? current : [...current, overviewDay.day].slice(-2));
    window.requestAnimationFrame(() => {
      document.getElementById(`day-${overviewDay.day}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  async function copyNavigation(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(''), 1800);
  }

  function leaveOwnerMode() {
    localStorage.removeItem('okinawa-owner-mode');
    setOwnerMode(false);
  }

  return (
    <>
      {copied && <div className="copy-toast" role="status">已複製：{copied}</div>}
      {ownerMode && <div className="owner-bar"><span>我的模式 · 顯示個人備忘錄</span><button type="button" onClick={leaveOwnerMode}>切回家人模式</button></div>}

      {showKokusaiGuide && (
        <div className="route-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowKokusaiGuide(false);
        }}>
          <section className="route-modal" role="dialog" aria-modal="true" aria-labelledby="route-modal-title">
            <button className="route-modal-close" type="button" aria-label="關閉國際通路線導覽" onClick={() => setShowKokusaiGuide(false)}>×</button>
            <p className="section-kicker">KOKUSAI STREET WALK</p>
            <h2 id="route-modal-title">國際通逛街建議路線</h2>
            <p className="route-modal-intro">國際通逛街路線導覽：</p>
            <ol className="route-steps">
              <li>
                <span className="route-number">①</span>
                <div><h3><CopyableRouteTerm onCopy={copyNavigation}>壺屋通</CopyableRouteTerm><span>｜陶器老街</span></h3><p>從住宿往西走，逛壺屋燒、器皿、風獅爺與特色小店。</p></div>
              </li>
              <li>
                <span className="route-number">②</span>
                <div><h3>市場區<span>｜老那霸商店街</span></h3><p>進入 <CopyableRouteTerm onCopy={copyNavigation}>平和通り商店街</CopyableRouteTerm>、<CopyableRouteTerm onCopy={copyNavigation}>第一牧志公設市場</CopyableRouteTerm>、<CopyableRouteTerm onCopy={copyNavigation}>市場本通</CopyableRouteTerm>，雜貨與傳統市場。</p></div>
              </li>
              <li>
                <span className="route-number">③</span>
                <div><h3><CopyableRouteTerm onCopy={copyNavigation}>むつみ橋</CopyableRouteTerm><span>｜接回國際通</span></h3><p>從市場區一路往北，最後由 <CopyableRouteTerm onCopy={copyNavigation}>むつみ橋</CopyableRouteTerm> 附近接回國際通主街。</p></div>
              </li>
              <li>
                <span className="route-number">④</span>
                <div><h3>國際通<span>｜集中購物</span></h3><p>往縣廳前方向逛，<CopyableRouteTerm onCopy={copyNavigation}>鳥貴族</CopyableRouteTerm> 在接近終點處。逛累或買太多時，可從國際通西段直接搭計程車回住宿。</p></div>
              </li>
            </ol>
            <p className="route-copy-hint">點紅色地名即可複製</p>
          </section>
        </div>
      )}

      <section className="hero">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="shell hero-inner">
          <p className="eyebrow">OUR FAMILY TRIP · OKINAWA</p><h1>{trip.title}</h1><p className="subtitle">{trip.subtitle}</p>
          <div className="date-pill">{trip.dateRange}</div><div className="sea-mark" aria-hidden="true"><span>〰</span><span>〰</span><span>〰</span></div>
        </div>
      </section>

      <div className="shell page-content">
        <section className={`today-overview ${overviewState}`} aria-labelledby="overview-title">
          <div className="overview-orbit" aria-hidden="true" />
          <div className="overview-heading">
            <p className="overview-kicker">{overviewKicker}</p>
            <span className="overview-day">{overviewDay.date.replaceAll('.', '')} DAY{overviewDay.day}</span>
          </div>
          <h2 id="overview-title">{overviewTitle}</h2>
          {overviewIntro && <p className="overview-intro">{overviewIntro}</p>}
          <ul className="overview-places" aria-label="今日主要地點">
            {overviewDay.summaryPlaces.map((place) => <li key={place}>{place === '國際通' ? <button className="inline-guide-link" type="button" onClick={() => setShowKokusaiGuide(true)}>{place}</button> : place}</li>)}
          </ul>
          <button className="overview-cta" type="button" onClick={showOverviewDay}>{overviewCta}<span aria-hidden="true">→</span></button>
        </section>

        <nav className="quick-grid" aria-label="旅行資訊快速入口">
          {quickLinks.map((item) => <a className={`quick-card ${item.tone}`} href={item.href} key={item.label}><span className="quick-icon">{item.icon}</span><span>{item.label}</span><span aria-hidden="true">→</span></a>)}
        </nav>

        <section id="days" className="days-section" aria-labelledby="days-title">
          <div className="section-heading"><div><p className="section-kicker">5 DAYS IN OKINAWA</p><h2 id="days-title">五日行程</h2></div></div>
          <div className="day-list">
            {trip.days.map((day) => (
              <article
                className={`day-card ${activeDay?.day === day.day ? 'is-today' : ''} ${openDays.includes(day.day) ? 'is-open' : ''}`}
                id={`day-${day.day}`}
                key={day.day}
              >
                <button
                  className="day-summary"
                  type="button"
                  aria-expanded={openDays.includes(day.day)}
                  aria-controls={`day-panel-${day.day}`}
                  onClick={() => updateOpenDay(day.day, !openDays.includes(day.day))}
                >
                  <div className="day-number"><span>DAY</span><strong>{day.day}</strong></div>
                  <div className="day-date"><strong>{day.date}</strong><span>星期{day.weekday}</span></div>
                  <div className="day-copy"><h3>{day.theme}</h3><p>{day.stops.length} 個行程 · {day.lodging}</p></div>
                  <span className="expand-label">展開</span>
                </button>
                <div className="day-content" id={`day-panel-${day.day}`} aria-hidden={!openDays.includes(day.day)}>
                  <div className="day-content-inner">
                    <div className="timeline">
                      {day.stops.map((stop, index) => (
                        <article className={stop.important ? 'important-stop' : ''} key={`${stop.time}-${stop.name}-${index}`}>
                          <time>{stop.time}</time>
                          <div className="stop-copy">
                            <div className="stop-title"><h4>{highlightFirstMentions(stop.name, stop.highlightTerms ?? [], new Set(), () => setShowKokusaiGuide(true))}</h4>{stop.badge && <span className="stop-badge">{stop.badge}</span>}</div>
                            {stop.nameJa && <p className="japanese-name">{stop.nameJa}</p>}{stop.note && <p>{stop.note}</p>}
                            {stop.navigationName && <button className="copy-button" type="button" onClick={() => copyNavigation(stop.navigationName!)}>複製導航名稱</button>}
                          </div>
                        </article>
                      ))}
                    </div>
                    {ownerMode && day.privateNotes.length > 0 && (
                      <section className="private-notes" aria-label={`Day ${day.day} 我看的備忘錄`}>
                        <div className="private-heading"><span>只在我的模式顯示</span><h4>我看的備忘錄</h4></div>
                        <PrivateNotesList day={day} onShowKokusaiGuide={() => setShowKokusaiGuide(true)} />
                      </section>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="lodging" className="content-section">
          <div className="section-heading"><div><p className="section-kicker">STAY</p><h2>住宿資訊</h2></div></div>
          <div className="info-grid">
            {trip.lodging.map((stay) => (
              <article className="info-card" key={stay.nights}>
                <strong>{stay.nights}</strong><h3>{stay.name}</h3>
                <dl className="lodging-details">
                  <div><dt>地址</dt><dd>{stay.address}</dd></div>
                  <div><dt>電話</dt><dd><a href={`tel:${stay.phone.replaceAll(' ', '')}`}>{stay.phone}</a></dd></div>
                  <div><dt>Mapcode</dt><dd><b>{stay.mapcode}</b><button className="copy-button" type="button" onClick={() => copyNavigation(stay.mapcode)}>複製</button></dd></div>
                  <div>
                    <dt>停車</dt>
                    <dd>
                      <ol className="parking-list">
                        {stay.parking.map((parking) => (
                          <li key={parking.name}>
                            <span>{parking.name}</span>
                            {parking.mapcode && <span><b>{parking.mapcode}</b><button className="copy-button" type="button" onClick={() => copyNavigation(parking.mapcode!)}>複製</button></span>}
                          </li>
                        ))}
                      </ol>
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
        <section id="reminders" className="reminder-card"><p className="section-kicker">DON&apos;T FORGET</p><h2>重要提醒</h2><ul>{trip.importantReminders.map((reminder) => <li key={reminder}>{highlightFirstMentions(reminder, [], new Set(), () => setShowKokusaiGuide(true))}</li>)}</ul></section>
        <section className="pending-grid">
          <article><span>車</span><div><h3>自駕資訊</h3><p>租車公司、地址、電話與加油資訊待補。</p></div></article>
          <article><span>SOS</span><div><h3>緊急資訊</h3><p>保險、同行聯絡人與緊急電話待補。</p></div></article>
        </section>
        <footer><strong>OKINAWA · 2026</strong><a href="./booklet/">小冊閱讀 →</a><span>版本 {buildVersion}</span></footer>
      </div>
    </>
  );
}
