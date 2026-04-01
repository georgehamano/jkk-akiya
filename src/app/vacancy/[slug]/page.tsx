import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchVacancies } from "@/lib/fetchVacancies";
import type { RoomDetail } from "@/types/vacancy";

const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";
const JKK_APPLY_URL = "https://www.to-kousya.or.jp/chintai/reco/index.html";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const name = decodeURIComponent(slug);
  return {
    title: `${name} — JKK空き家速報`,
    description: `${name}の空き家情報。間取り・戸数をリアルタイムで確認できます。`,
  };
}

export default async function VacancyDetailPage({ params }: Props) {
  const { slug } = await params;
  const name = decodeURIComponent(slug);

  const data = await fetchVacancies();
  const property = data?.properties.find((p) => p.name === name);

  if (!property) notFound();

  const roomEntries = Object.entries(property.rooms).filter(([, count]) => count > 0);
  const roomDetails = property.room_details ?? {};

  return (
    <div>
      {/* パンくず + タイトル */}
      <section className="bg-[#F8F9FA] py-16 border-b border-[#1A1A1A]/5">
        <div className="max-w-5xl mx-auto px-8">
          <nav className="flex items-center gap-2 text-sm text-[#6C757D] mb-6">
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">
              トップ
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">{property.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            {property.location && (
              <span className="inline-flex items-center gap-1 text-sm text-[#6C757D] bg-white border border-[#1A1A1A]/10 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {property.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-bold text-white bg-[#1A1A1A] px-3 py-1 rounded-full">
              現在 {property.total}戸空き
            </span>
          </div>

          <h1
            className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {property.name}
          </h1>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* 左: 画像 */}
            <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(26,26,26,0.06)] border border-[#1A1A1A]/5 aspect-[4/3] relative bg-[#E9ECEF]">
              {property.image_url ? (
                <Image
                  src={property.image_url}
                  alt={property.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[#6C757D] text-5xl">home</span>
                  <span className="text-[#6C757D] text-sm">写真準備中</span>
                </div>
              )}
            </div>

            {/* 右: 詳細 + CTA */}
            <div className="flex flex-col gap-6">

              {/* 空き室内訳 */}
              <div className="bg-[#F8F9FA] rounded-lg p-6 border border-[#1A1A1A]/5">
                <p className="text-xs text-[#6C757D] uppercase tracking-widest mb-4">現在の空き室</p>
                <div className="flex flex-col gap-4">
                  {roomEntries.map(([room, count]) => {
                    const detail: RoomDetail = roomDetails[room] ?? {};
                    return (
                      <div key={room}>
                        <div className="flex items-center justify-between">
                          <span className="text-[#1A1A1A] font-medium">{room}</span>
                          <span className="font-bold text-[#1A1A1A]">{count}戸</span>
                        </div>
                        {(detail.rent || detail.area) && (
                          <div className="flex flex-wrap gap-3 mt-1">
                            {detail.rent && (
                              <span className="text-sm text-[#6C757D]">
                                家賃 <span className="font-semibold text-[#1A1A1A]">{Number(detail.rent).toLocaleString()}円</span>
                              </span>
                            )}
                            {detail.fee && (
                              <span className="text-sm text-[#6C757D]">
                                共益費 <span className="font-semibold text-[#1A1A1A]">{Number(detail.fee).toLocaleString()}円</span>
                              </span>
                            )}
                            {detail.area && (
                              <span className="text-sm text-[#6C757D]">
                                <span className="font-semibold text-[#1A1A1A]">{detail.area}m²</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="h-px bg-[#E9ECEF]" />
                  <div className="flex items-center justify-between">
                    <span className="text-[#1A1A1A] font-bold">合計</span>
                    <span className="font-extrabold text-[#1A1A1A] text-lg">{property.total}戸</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3">
                <a
                  href={JKK_APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold py-4 rounded-lg text-sm transition-all duration-200 hover:bg-[#1A1A1A] hover:text-white active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                  JKKサイトで申し込む
                </a>
                <a
                  href={LINE_ADD_FRIEND_URL}
                  className="flex items-center justify-center gap-2 w-full bg-[#06C755] text-white font-bold py-4 rounded-lg text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                  空きが出たらLINEで通知を受け取る
                </a>
              </div>

              <p className="text-xs text-[#6C757D] leading-relaxed">
                ※ 申込みはJKK（東京都住宅供給公社）の公式サイトから行ってください。
                このサイトは非公式の情報サービスです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 一覧に戻る */}
      <section className="py-12 bg-[#F3F4F5]">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <Link
            href="/#vacancy-list"
            className="inline-flex items-center gap-2 text-[#6C757D] hover:text-[#1A1A1A] transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            空き家一覧に戻る
          </Link>
        </div>
      </section>
    </div>
  );
}
