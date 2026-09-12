export type TripStop = {
  time: string;
  name: string;
  nameJa?: string;
  note?: string;
  navigationName?: string;
  badge?: string;
  important?: boolean;
  highlightTerms?: string[];
};

export type PrivateNote = { situation: string; action: string };

export type TripDay = {
  day: number;
  date: string;
  isoDate: string;
  weekday: string;
  theme: string;
  lodging: string;
  summaryPlaces: string[];
  stops: TripStop[];
  privateNotes: PrivateNote[];
  privateHighlightTerms?: string[];
};

export type Trip = {
  title: string;
  subtitle: string;
  dateRange: string;
  version: string;
  lastUpdated: string;
  days: TripDay[];
  lodging: Array<{
    nights: string;
    name: string;
    address: string;
    phone: string;
    mapcode: string;
    parking: Array<{ name: string; mapcode?: string }>;
  }>;
  importantReminders: string[];
};

export const trip: Trip = {
  title: '快樂的家沖繩之旅',
  subtitle: '五天四夜，一起去看海',
  dateRange: '2026.09.14 — 09.18',
  version: '09/12 行程版',
  lastUpdated: '2026.09.12',
  days: [
    {
      day: 1,
      date: '09.14',
      isoDate: '2026-09-14',
      weekday: '一',
      theme: '🌊 抵達沖繩，前往美國村',
      lodging: '沖繩索爾鎮公寓式酒店',
      summaryPlaces: ['那霸機場', '糸滿魚市場', '美國村', 'AEON 北谷'],
      stops: [
        { time: '07:45', name: '搭計程車前往機場', note: '預計 10:00 起飛。' },
        { time: '13:00', name: '抵達那霸機場', note: '依序處理入境審查、領行李與海關。', important: true },
        { time: '13:00–14:20', name: '入境、領行李、前往租車接駁點' },
        { time: '14:20–15:20', name: '租車接駁、取車與確認車況', note: '確認 ETC 卡、導航／CarPlay、保險、加油種類、車損照片、雨刷與右駕操作。' },
        { time: '15:20–15:50', name: '開車前往糸滿魚市場', highlightTerms: ['糸滿魚市場'] },
        { time: '16:00–17:00', name: '糸滿魚市場', nameJa: '糸満お魚センター', navigationName: '糸満お魚センター', note: '可買生魚片、海鮮丼、烤魚、炸物或海鮮小菜；若帶去美國村要準備冰塊。' },
        { time: '17:00–18:10', name: '開車前往美國村', highlightTerms: ['美國村'] },
        { time: '18:10–18:40', name: '入住、停車、休息' },
        { time: '18:40–19:30', name: '晚餐依體力三選一', note: 'AEON 超市熟食、壽司或沖繩居酒屋；步行約 10 分鐘。', badge: '彈性' },
        { time: '19:30–20:30', name: '美國村夜景散步', note: 'Depot Island 海邊、街景與拍照。' },
        { time: '20:30–21:30', name: 'AEON 北谷超市＋Lawson＋大國藥妝', note: '買 Day 2 早餐、飲料、礦泉水、車上零食、水果與日用品。' },
        { time: '21:30 後', name: '回住宿休息', note: '隔天需早起買飯糰並北上水族館。' },
      ],
      privateNotes: [
        { situation: '爸爸想逛 Golf 5 北谷店', action: '營業到 20:00，依取車與 Check-in 時間決定先看或隔天再買。' },
        { situation: '採買提醒', action: '記得找和牛泡麵。' },
      ],
      privateHighlightTerms: ['Golf 5 北谷店'],
    },
    {
      day: 2,
      date: '09.15',
      isoDate: '2026-09-15',
      weekday: '二',
      theme: '🐋 美麗海水族館，鯨鯊！',
      lodging: '沖繩索爾鎮公寓式酒店',
      summaryPlaces: ['美麗海水族館', 'Kaito 麵包', '許田休息站', '萬座毛', '美國村'],
      stops: [
        { time: '07:00–08:00', name: '買沖繩飯糰＋早餐', note: '飯糰 07:00 開門，並作為水族館行程的午餐。' },
        { time: '08:00–09:30', name: '開車前往美麗海水族館', note: '預留上廁所與塞車緩衝，抓 90 分鐘。', highlightTerms: ['美麗海水族館'] },
        { time: '09:30–10:30', name: '停車、洗手間、前往海豚劇場', note: '10:30 海豚秀。' },
        { time: '10:30–10:50', name: 'Okichan 海豚秀', note: '免費，約 20 分鐘。' },
        { time: '11:00–11:25', name: '海豚潟湖＋海龜館', note: '海牛館視體力。' },
        { time: '11:30–13:30', name: '美麗海水族館', note: '黑潮之海至少保留 30–40 分鐘；飯糰到館外美ら海 Plaza／活動會館吃。' },
        { time: '13:30–14:00', name: '商店、洗手間、回車上', note: '紀念品限時，避免壓縮後段。' },
        { time: '14:00–14:30', name: '開往 Kaito 麵包', highlightTerms: ['Kaito 麵包'] },
        { time: '14:30–15:00', name: 'Kaito 麵包', note: '買明天早餐。', navigationName: 'Kaito 麵包' },
        { time: '15:00–15:30', name: '開往許田休息站', note: '以導航即時車程為準；最晚 16:15 準備返回住宿。' },
        { time: '15:30–16:15', name: '許田休息站', note: '小吃、伴手禮、休息、廁所與海景。' },
        { time: '視時間', name: '萬座毛', note: '看海、拍照；時間或體力不足就取消。', badge: 'Bonus' },
        { time: '16:15–17:15', name: '返回美國村住宿' },
        { time: '17:30–18:00', name: '回房休息、換衣服' },
        { time: '18:00', name: '出發前往阿古豬火鍋店', note: '預留停車與報到時間。' },
        { time: '18:30', name: '阿古豬火鍋晚餐', note: '已訂位，是今日固定錨點。', badge: '已訂位', important: true },
        { time: '晚餐後', name: '美國村散步＋超市', note: '依體力決定；若 Day 3 自煮早餐，需採買食材。' },
      ],
      privateNotes: [
        { situation: '早上的飯糰', action: '06:30 起床，步行約 10 分鐘；店家 07:00 開。' },
        { situation: '10:30 海豚秀', action: '停 P1，照原計畫看完再進水族館。' },
        { situation: '午餐', action: '飯糰＋前晚食物；不要在水族館館內吃，優先找有遮蔭或室內休息區，太熱不要硬野餐。' },
        { situation: '12:30 前離開＋全家精神很好', action: 'Bonus：古宇利島＋蝦蝦飯，再去許田；萬座毛視時間。這個版本不太可能達成。' },
        { situation: '12:30–14:00 離開', action: '正常版：許田 → 萬座毛 → 美國村休息。' },
        { situation: '14:00–14:30 才離開', action: '許田縮短約 30 分鐘；萬座毛看時間與體力。' },
        { situation: '14:30 後才離開', action: '許田短停，取消萬座毛，直接回美國村。' },
        { situation: '累／下雨／強風', action: '直接南下；許田短停或取消萬座毛，提早回住宿。' },
        { situation: '16:15 左右', action: '不論下午玩到哪都開始收尾；犧牲休息時間時最晚 17:00。' },
        { situation: '18:30 阿古豬訂位', action: '今日最高優先級，不要為下午景點壓縮。' },
      ],
      privateHighlightTerms: ['水族館', '古宇利島', '許田', '萬座毛', '美國村', 'Golf 5', '阿古豬'],
    },
    {
      day: 3,
      date: '09.16',
      isoDate: '2026-09-16',
      weekday: '三',
      theme: '🏯 最大百貨公司 + 十年首里城',
      lodging: '鶴の宿 那覇',
      summaryPlaces: ['永旺夢樂城', '首里城', '達摩寺', '國際通'],
      stops: [
        { time: '08:00–09:00', name: '民宿自煮早餐', note: '前一天買麵包與食材；時間充裕可買莓果碗。' },
        { time: '09:00–10:00', name: '整理行李、休息、退房', note: '最晚 11:00 退房，目標 10:00 離開。' },
        { time: '10:00–10:30', name: '前往永旺夢樂城', highlightTerms: ['永旺夢樂城'] },
        { time: '10:30–13:30', name: 'AEON MALL Okinawa Rycom', navigationName: 'AEON MALL Okinawa Rycom', note: 'Day 3 主要行程；午餐在商場內解決，A&W／塔可飯。' },
        { time: '13:30–14:00', name: '前往首里城', note: '依實際離開 Rycom 的時間順延。', highlightTerms: ['首里城'] },
        { time: '14:00–15:00', name: '首里城免費區散步', note: '拍照、走主要免費區即可。' },
        { time: '15:00–15:15', name: '前往達摩寺', highlightTerms: ['達摩寺'] },
        { time: '15:15–15:45', name: '達摩寺', note: '簡單參拜、拍照。' },
        { time: '15:45–16:15', name: '前往壺屋民宿' },
        { time: '16:15–17:15', name: 'Check-in＋休息', note: '整理行李、坐下休息。' },
        { time: '17:30 起', name: '國際通散步、逛街', note: '先逛商店，晚餐再找鳥貴族或居酒屋。', highlightTerms: ['國際通'] },
        { time: '晚上', name: '鳥貴族或國際通居酒屋', badge: '彈性' },
        { time: '最後', name: 'MaxValu 牧志店', note: '補飲料、宵夜與隔天需要的東西。' },
      ],
      privateNotes: [
        { situation: '民宿廚房設備夠用', action: 'Day 3 早餐照原案自煮；確認冰箱、微波爐／烤箱、爐具與鍋具。' },
        { situation: '媽媽想吃莓果碗', action: '跟文 07:30 出發去 Pink Palace。' },
        { situation: '廚房不好用／不想煮', action: '改附近早餐店；松屋或 Lawson 當最後備案。' },
        { situation: 'Day 2 晚上採買', action: '買麵包、蛋、肉與可加熱的早餐材料。' },
        { situation: '爸爸想逛 Golf 5', action: '可讓爸爸去逛，我先送妹妹和媽媽。' },
        { situation: 'Rycom 很早逛完', action: '直接提早去首里城＋達摩寺，不另塞景點。' },
        { situation: '17:15 左右出發且精神好', action: '可沿壺屋通步行去國際通，回程再視情況搭計程車；17:30 後就不加壺屋通。' },
        { situation: '下午有人累', action: '首里城＋達摩寺控制在約 1.5 小時，不追加景點。' },
      ],
      privateHighlightTerms: ['Pink Palace', 'Golf 5', 'Rycom', '首里城', '達摩寺', '壺屋通', '國際通'],
    },
    {
      day: 4,
      date: '09.17',
      isoDate: '2026-09-17',
      weekday: '四',
      theme: '🌺 沖繩世界玉泉洞，燒肉之路',
      lodging: '鶴の宿 那覇',
      summaryPlaces: ['沖繩世界', '玉泉洞', 'Costco 南城', '國際通'],
      stops: [
        { time: '07:30–08:15', name: '民宿自煮早餐', note: 'Day 3 晚上先買食材；廚房不適合就改外食或便利商店。' },
        { time: '08:15–08:30', name: '整理、準備出發', note: '目標 08:30 前離開。' },
        { time: '09:00', name: '抵達沖繩世界', note: '停車、入園。', highlightTerms: ['沖繩世界'] },
        { time: '09:10–10:15', name: '玉泉洞', note: '慢慢走，不用趕。', highlightTerms: ['玉泉洞'] },
        { time: '10:15–10:30', name: '廁所＋前往表演場', note: '提前找位置。' },
        { time: '10:30–11:00', name: 'SUPER EISA 太鼓表演' },
        { time: '11:00–12:00', name: '王國村、古民家、工藝區' },
        { time: '12:00–13:00', name: '沖繩世界內午餐', note: '簡單吃。' },
        { time: '13:00–13:30', name: '前往 Costco 南城', note: '依當下進度，車程約 10 分鐘。', highlightTerms: ['Costco 南城'] },
        { time: '13:30–15:20', name: 'Costco 南城', navigationName: 'Costco 南城', note: '必去；最晚 16:00 離開，可視情況加油。', badge: '必去' },
        { time: '15:20–16:10', name: '開車返回民宿' },
        { time: '16:10–16:50', name: '洗澡、休息、換衣服' },
        { time: '17:00–17:10', name: '出門前往晚餐', note: '確認訂位資料，預留停車與步行。' },
        { time: '17:45', name: '燒肉本部牧場國際通店', note: '已訂位。', badge: '已訂位', important: true },
        { time: '晚餐後', name: '唐吉訶德＋國際通', note: '最後藥妝、伴手禮採買。', highlightTerms: ['唐吉訶德'] },
        { time: '回民宿後', name: '吹蠟燭＋打包行李', note: '行李秤重，整理託運物品。' },
      ],
      privateNotes: [
        { situation: 'Costco 14:30 前逛完', action: '看體力與天氣，可插入識名園。' },
        { situation: '接近那霸但還很早', action: '可考慮波上宮。' },
        { situation: '超級早＋天氣漂亮＋大家很有精神', action: '才考慮瀨長島。' },
        { situation: '16:00 後', action: '不新增任何景點，直接回民宿休息。' },
        { situation: '國際通／唐吉訶德', action: '記得買蛋糕，晚上吹蠟燭。' },
      ],
      privateHighlightTerms: ['Costco', '識名園', '波上宮', '瀨長島', '國際通', '唐吉訶德'],
    },
    {
      day: 5,
      date: '09.18',
      isoDate: '2026-09-18',
      weekday: '五',
      theme: '🧳 最後採買，準備平安回家',
      lodging: '回家',
      summaryPlaces: ['ASHIBINAA', '那霸機場', '高雄'],
      stops: [
        { time: '08:00–08:45', name: '起床、整理最後行李', note: '確認藥妝、液體與噴霧等託運物品。' },
        { time: '08:45–09:15', name: '早餐、Check-out', note: '巡房確認冰箱、浴室、插座與床下沒有遺漏。' },
        { time: '09:15–09:50', name: '前往 ASHIBINAA', note: '目標 10:00 開門前抵達。', highlightTerms: ['ASHIBINAA'] },
        { time: '10:00–10:50', name: 'ASHIBINAA 最後採買', navigationName: 'ASHIBINAA', note: '只買原先鎖定品項，不臨時大逛。', badge: '方案 A' },
        { time: '10:50–11:00', name: '回車上、整理戰利品' },
        { time: '11:00–11:20', name: '移動、加油＋還車', note: '加滿指定油種、歸還 ETC、確認車況；完成時間仍可能受排隊影響。' },
        { time: '11:20–11:40', name: '租車接駁前往那霸機場', note: '候車與交通可能使抵達時間延後。', highlightTerms: ['那霸機場'] },
        { time: '目標 11:40', name: '抵達機場國際線', note: '直接前往虎航櫃檯排隊，不先吃飯或逛店。' },
        { time: '預計 12:00', name: '虎航開櫃', note: '開櫃時間與線上報到適用性待確認。', badge: '待確認' },
        { time: '12:00–12:20', name: '報到與行李託運', note: '若延後，縮短或取消一般區午餐。' },
        { time: '12:20–12:35', name: '機場快速午餐', note: '只選不需候位的餐點；時間不足就取消。' },
        { time: '最晚 12:40', name: '開始前往國際線安檢', note: '自訂行程上限；現場人多或登機證要求更早時就提早。', important: true },
        { time: '12:40–13:20', name: '安檢、出境審查、前往登機門', note: '預留約 40 分鐘，不代表保證完成時間。' },
        { time: '目標 13:20', name: '抵達登機門、確認登機資訊' },
        { time: '14:00', name: 'IT289 那霸 → 高雄', badge: '固定錨點', important: true },
      ],
      privateNotes: [
        { situation: '方案 A：ASHIBINAA', action: '照主行程走；11:00 離開前往加油還車。若託運延誤，縮短或取消午餐。' },
        { situation: '方案 B：機場商店街', action: '早餐退房後直接加油還車；到機場一般區用餐／逛街，再依排隊狀況前往櫃檯。' },
        { situation: '兩方案取捨', action: 'ASHIBINAA 與機場商店街擇一，不把兩邊都排成完整購物行程。' },
        { situation: '12:40', action: '最晚開始前往安檢；不是航空公司截止時間，現場要求更早就提早。' },
        { situation: '託運晚於 12:20', action: '方案 A 取消一般區午餐；方案 B 縮短或取消託運後購物。' },
        { situation: '一般區午餐', action: '只有約 15 分鐘，早餐要正常吃並可先準備點心。' },
        { situation: '13:20 抵達登機門', action: '到登機門後才視時間與現場供應決定是否補食物。' },
      ],
      privateHighlightTerms: ['ASHIBINAA', '機場商店街'],
    },
  ],
  lodging: [
    {
      nights: '09/14–09/16',
      name: '沖繩索爾鎮公寓式酒店 Elsoltown Okinawa',
      address: '日本〒904-0115 Okinawa, Nakagami District, Chatan, Mihama, 2-7-8, 1F, 2F & 3F',
      phone: '+81 98-927-8029',
      mapcode: '33 526 787',
      parking: [{ name: '內建停車場' }],
    },
    {
      nights: '09/16–09/18',
      name: '鶴の宿 那覇',
      address: '1 Chome-33-13 Tsuboya, Naha, Okinawa 902-0065 日本',
      phone: '+81 90-9485-1705',
      mapcode: '33 128 780*47',
      parking: [
        { name: '付費停車場 A（住宿對面）', mapcode: '33 128 780*47' },
        { name: '沖縄県樋川立体駐車場', mapcode: '33 128 842*58' },
      ],
    },
  ],
  importantReminders: [
    'Day 2 阿古豬火鍋 18:30 已訂位。',
    'Day 4 燒肉本部牧場國際通店 17:45 已訂位。',
    'Day 5 IT289 14:00 那霸飛往高雄。',
    '航班、租車、住宿地址與聯絡資訊仍待補齊。',
  ],
};
