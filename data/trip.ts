export type TripDay = {
  day: number;
  date: string;
  weekday: string;
  theme: string;
  stops: Array<{
    time: string;
    name: string;
    nameJa?: string;
    note?: string;
    navigationName?: string;
    status?: 'confirmed' | 'pending';
  }>;
};

export const trip = {
  title: '沖繩家族旅行',
  subtitle: '五天四夜，一起去看海',
  dateRange: '2026.09.14 — 09.18',
  version: '行程資料待匯入',
  days: [
    { day: 1, date: '09.14', weekday: '一', theme: '抵達沖繩', stops: [] },
    { day: 2, date: '09.15', weekday: '二', theme: '行程待確認', stops: [] },
    { day: 3, date: '09.16', weekday: '三', theme: '行程待確認', stops: [] },
    { day: 4, date: '09.17', weekday: '四', theme: '行程待確認', stops: [] },
    { day: 5, date: '09.18', weekday: '五', theme: '回家', stops: [] },
  ] satisfies TripDay[],
  lodging: [],
  food: [],
  shopping: [],
  drivingNotes: [],
  packingNotes: [],
  emergency: [],
};
