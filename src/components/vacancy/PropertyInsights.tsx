import { Activity, Clock, CalendarClock, TrendingUp } from "lucide-react";
import {
  getPropertyStat,
  judgeCompetition,
  statsMeta,
  weekdayLabel,
} from "@/lib/propertyStats";

/**
 * 当サイトの観測履歴から算出した、この物件だけの募集傾向を表示する。
 * JKK公式には存在しない独自の分析。
 */
export function PropertyInsights({ name }: { name: string }) {
  const stat = getPropertyStat(name);
  if (!stat || stat.observations < 2) return null;

  const comp = judgeCompetition(stat);
  const wd = weekdayLabel(stat.peak_weekday);
  const overall = statsMeta.overall_median_hours;
  const ratio = stat.median_hours / overall;
  const vsOverall =
    ratio >= 2
      ? `全物件の中央値（${overall}時間）の約${ratio.toFixed(1)}倍で、比較的長く残る`
      : ratio <= 0.5
        ? `全物件の中央値（${overall}時間）の約${(1 / ratio).toFixed(1)}分の1で、かなり早く埋まる`
        : `全物件の中央値（${overall}時間）と同程度`;

  return (
    <section className="py-12 sm:py-16 bg-[#F3F4F5] border-t border-[#1A1A1A]/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={18} className="text-[#1A1A1A]" />
          <h2
            className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            この物件の募集傾向【当サイト独自データ】
          </h2>
        </div>
        <p className="text-sm text-[#6C757D] mb-8">
          当サイトはJKKの空き家情報を約25分間隔で自動記録しています。
          {statsMeta.period_from}〜{statsMeta.period_to}の{statsMeta.observation_count.toLocaleString()}回の観測から、
          <strong className="text-[#1A1A1A]">{name}</strong>の傾向を集計しました。
        </p>

        {/* 指標カード */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <StatCard
            icon={<TrendingUp size={16} />}
            label="募集が出た回数"
            value={`${stat.observations}回`}
            note={`${stat.first_seen}以降`}
          />
          <StatCard
            icon={<Clock size={16} />}
            label="募集が残る時間"
            value={stat.median_label}
            note="中央値"
          />
          <StatCard
            icon={<Activity size={16} />}
            label="1時間以内に消えた割合"
            value={`${stat.within_1h_pct}%`}
            note={`競争率は${comp.label}`}
          />
          <StatCard
            icon={<CalendarClock size={16} />}
            label="出やすいタイミング"
            value={
              stat.peak_hour !== null ? `${stat.peak_hour}時台` : "—"
            }
            note={wd ? `${wd}曜が最多` : ""}
          />
        </div>

        {/* 読み解き */}
        <div className="bg-white rounded-lg border border-[#1A1A1A]/5 p-6 sm:p-8">
          <h3 className="font-bold text-[#1A1A1A] mb-3">データの読み解き</h3>
          <div className="flex flex-col gap-3 text-sm text-[#1A1A1A] leading-relaxed">
            <p>
              観測期間中、この物件では<strong>{stat.observations}回</strong>の募集を確認しました。
              募集が掲載され続けた時間は中央値で<strong>{stat.median_label}</strong>で、{vsOverall}物件です。
              最も長かったケースでは約{(stat.max_hours / 24).toFixed(1)}日間掲載が続きました。
            </p>
            <p>{comp.advice}</p>
            {stat.peak_hour !== null && wd && (
              <p>
                募集が確認された時間帯は<strong>{stat.peak_hour}時台</strong>、曜日は
                <strong>{wd}曜</strong>が最多でした。JKKの業務時間内に処理されるため、
                平日の日中に募集が出る傾向があります。この時間帯に通知を受け取れる状態にしておくと、見逃しを減らせます。
              </p>
            )}
            <p className="text-xs text-[#6C757D] pt-2 border-t border-[#E9ECEF]">
              ※ 当サイトが自動収集したJKK公開情報（{statsMeta.period_from}〜{statsMeta.period_to}、
              {statsMeta.observation_count.toLocaleString()}回の観測・{statsMeta.event_count.toLocaleString()}件の募集記録）を独自に集計した参考値です。
              観測間隔の制約上、25分未満の掲載は捕捉できていない場合があります。
              最新の募集状況は必ずJKK公式サイトでご確認ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-[#1A1A1A]/5 p-4 sm:p-5">
      <div className="flex items-center gap-1.5 text-[#6C757D] mb-2">
        {icon}
        <span className="text-xs leading-tight">{label}</span>
      </div>
      <p className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight leading-none">
        {value}
      </p>
      {note && <p className="text-xs text-[#6C757D] mt-1.5">{note}</p>}
    </div>
  );
}
