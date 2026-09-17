import statsJson from "@/data/property-stats.json";

export type PropertyStat = {
  observations: number;
  median_hours: number;
  median_label: string;
  max_hours: number;
  within_1h_pct: number;
  peak_hour: number | null;
  peak_weekday: number | null;
  last_seen: string;
  first_seen: string;
};

export type StatsMeta = {
  period_from: string;
  period_to: string;
  observation_count: number;
  event_count: number;
  overall_median_hours: number;
  property_count: number;
};

const data = statsJson as unknown as {
  meta: StatsMeta;
  properties: Record<string, PropertyStat>;
};

export const statsMeta = data.meta;

export function getPropertyStat(name: string): PropertyStat | null {
  return data.properties[name] ?? null;
}

const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"];

export function weekdayLabel(i: number | null): string | null {
  return i === null || i === undefined ? null : WEEKDAYS[i] ?? null;
}

/** 全体中央値と比べた競争の激しさ。記事内の文言生成に使う。 */
export type Competition = {
  level: "very-high" | "high" | "medium" | "low";
  label: string;
  advice: string;
};

export function judgeCompetition(stat: PropertyStat): Competition {
  const h = stat.median_hours;
  if (h < 1) {
    return {
      level: "very-high",
      label: "非常に高い",
      advice:
        "募集が出てから1時間以内に埋まることがほとんどです。通知を受け取ってその場で申し込める準備がないと、現実的に間に合いません。",
    };
  }
  if (h < 12) {
    return {
      level: "high",
      label: "高い",
      advice:
        "半日以内に埋まる傾向があります。見つけてから書類を準備していては間に合わないため、事前準備を済ませたうえで通知を待つのが前提です。",
    };
  }
  if (h < 72) {
    return {
      level: "medium",
      label: "中程度",
      advice:
        "1〜3日程度は募集が残る傾向です。通知を受けてから検討する時間はありますが、週末をまたぐと消えている可能性があります。",
    };
  }
  return {
    level: "low",
    label: "低め",
    advice:
      "数日以上募集が続く傾向があります。内見を挟んで比較検討したい方でも間に合いやすく、じっくり判断できる物件です。",
  };
}
