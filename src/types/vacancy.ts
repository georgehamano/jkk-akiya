export type Property = {
  name: string;
  total: number;
  rooms: Record<string, number>;
};

export type VacancyData = {
  updated_at: string; // ISO 8601 (JST)
  properties: Property[];
};
