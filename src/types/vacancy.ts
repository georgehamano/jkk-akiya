export type RoomDetail = {
  area?: string;
  rent?: string;
  fee?: string;
};

export type Property = {
  name: string;
  total: number;
  rooms: Record<string, number>;
  room_details?: Record<string, RoomDetail>;
  image_url?: string;
  location?: string;
  // 詳細ページから取得した追加情報
  images?: string[];
  transport?: string;
  built?: string;
  floors?: string;
  total_units?: string;
  term?: string;
  notes?: string;
};

export type VacancyData = {
  updated_at: string; // ISO 8601 (JST)
  properties: Property[];
};
