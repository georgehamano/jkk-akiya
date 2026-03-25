import type { Property } from "@/types/vacancy";

// TODO: アフィリエイトリンクが決まったら href を差し替える
const MOVING_ESTIMATE_URL = "#";

export function PropertyCard({ property }: { property: Property }) {
  const roomEntries = Object.entries(property.rooms).filter(([, count]) => count > 0);

  return (
    <div className="bg-white rounded-[4px] shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-2 mb-4">
        <h3 className="font-bold text-[#001F5B] text-base leading-snug">{property.name}</h3>
        <span className="shrink-0 border border-[#001F5B] text-[#001F5B] text-xs font-bold px-2 py-1 rounded-[4px]">
          {property.total}戸空き
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {roomEntries.map(([room, count]) => (
          <span
            key={room}
            className="bg-[#F8F9FA] text-[#6C757D] text-xs px-2 py-1 rounded-[4px]"
          >
            {room}: {count}戸
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <a
          href="https://www.to-kousya.or.jp/chintai/reco/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center border border-[#001F5B] text-[#001F5B] text-sm font-bold py-2 rounded-[4px]"
        >
          物件を見る
        </a>
        <a
          href={MOVING_ESTIMATE_URL}
          className="flex-1 text-center border border-[#001F5B] text-[#001F5B] text-sm font-bold py-2 rounded-[4px]"
        >
          引越し見積もり
        </a>
      </div>
    </div>
  );
}
