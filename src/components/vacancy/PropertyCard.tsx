import type { Property } from "@/types/vacancy";

// TODO: アフィリエイトリンクが決まったら href を差し替える
const MOVING_ESTIMATE_URL = "#";

export function PropertyCard({ property }: { property: Property }) {
  const roomEntries = Object.entries(property.rooms).filter(([, count]) => count > 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-bold text-gray-900 text-base leading-snug">{property.name}</h3>
        <span className="shrink-0 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
          {property.total}戸空き
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {roomEntries.map(([room, count]) => (
          <span
            key={room}
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
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
          className="flex-1 text-center bg-[#06C755] text-white text-sm font-bold py-2 rounded-lg"
        >
          物件を見る
        </a>
        <a
          href={MOVING_ESTIMATE_URL}
          className="flex-1 text-center bg-orange-500 text-white text-sm font-bold py-2 rounded-lg"
        >
          引越し見積もり
        </a>
      </div>
    </div>
  );
}
