import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Banknote, RefreshCw, Handshake, ArrowRight, Bell, MapPin, CheckCircle } from "lucide-react";
import { VacancyDashboard } from "@/components/vacancy/VacancyDashboard";
import { fetchVacancies } from "@/lib/fetchVacancies";
import { getAllArticles } from "@/lib/mdx";

const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

export default async function Home() {
  // サーバーサイドで初期データを取得してヒーローのカウンターに表示
  const initialData = await fetchVacancies().catch(() => null);
  const propertyCount = initialData?.properties.length ?? 0;
  const unitCount = initialData?.properties.reduce((s, p) => s + p.total, 0) ?? 0;
  const latestArticles = getAllArticles().slice(0, 3);

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-[#1A1A1A] py-24 md:py-32">
        {/* 背景画像 — desktop */}
        <Image
          src="/img/jkk-main-img.png"
          alt=""
          fill
          className="object-cover object-center scale-105 hidden md:block"
          priority
        />
        {/* 背景画像 — mobile */}
        <Image
          src="/img/jkk-main-img-sp.png"
          alt=""
          fill
          className="object-cover object-center scale-105 block md:hidden"
          priority
        />
        {/* 暗幕オーバーレイ（文字視認性確保） */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左: テキスト */}
          <div>
            <p className="text-white/60 text-sm mb-4 tracking-widest uppercase">
              東京都住宅供給公社 — 非公式監視サービス
            </p>
            <h1
              className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tighter mb-8"
            >
              JKKの空き家が出た瞬間、<br />あなたのLINEに届く。
            </h1>
            <p className="text-lg text-white/70 mb-12 leading-relaxed max-w-lg">
              礼金・更新料・仲介手数料0円の物件を誰よりも早くつかむ。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={LINE_ADD_FRIEND_URL}
                className="bg-[#06C755] text-white px-10 py-5 rounded-lg text-lg font-bold flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg shadow-black/30"
              >
                <MessageCircle size={20} className="fill-current" />
                LINE友だち追加（無料）
              </a>
              <a
                href="#vacancy-list"
                className="border-2 border-white/40 text-white px-10 py-5 rounded-lg text-lg font-bold transition-all hover:bg-white/10 active:scale-95 text-center"
              >
                物件一覧を見る
              </a>
            </div>
          </div>

          {/* 右: 物件カウンター */}
          <div className="flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-[0_24px_60px_rgba(0,0,0,0.3)] p-12 text-center w-full max-w-sm">
              <p className="text-[#6C757D] text-sm mb-6 uppercase tracking-widest">現在の空き家</p>
              <div className="mb-8">
                <span className="text-8xl font-extrabold text-[#1A1A1A] tracking-tighter leading-none">
                  {propertyCount}
                </span>
                <span className="text-2xl font-bold text-[#6C757D] ml-2">物件</span>
              </div>
              <div className="h-px bg-[#E9ECEF] mb-8" />
              <div>
                <span className="text-5xl font-extrabold text-[#1A1A1A] tracking-tighter leading-none">
                  {unitCount}
                </span>
                <span className="text-xl font-bold text-[#6C757D] ml-2">戸</span>
              </div>
              <p className="text-[#6C757D] text-xs mt-6">リアルタイム更新中</p>
            </div>
          </div>
        </div>
      </section>

      {/* 信頼セクション（3カラム） */}
      <section className="py-24 bg-[#F3F4F5]">
        <div className="max-w-7xl mx-auto px-8">
          <h2
            className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-12"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            JKKの魅力
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start gap-4 p-8 bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)]">
              <Banknote size={36} className="text-[#1A1A1A]" />
              <h3 className="text-xl font-bold text-[#1A1A1A]">礼金0円</h3>
              <p className="text-[#6C757D] leading-relaxed">
                JKKの物件は礼金が不要。初期費用を大幅に抑えてスタートできます。
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 p-8 bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)]">
              <RefreshCw size={36} className="text-[#1A1A1A]" />
              <h3 className="text-xl font-bold text-[#1A1A1A]">更新料0円</h3>
              <p className="text-[#6C757D] leading-relaxed">
                2年ごとの更新料も不要。長く住むほど一般賃貸との差は広がります。
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 p-8 bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)]">
              <Handshake size={36} className="text-[#1A1A1A]" />
              <h3 className="text-xl font-bold text-[#1A1A1A]">仲介手数料0円</h3>
              <p className="text-[#6C757D] leading-relaxed">
                仲介業者を介さず直接申込み。仲介手数料がかからないのも大きなメリット。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LINE通知セクション */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 左: テキスト */}
            <div>
              <p className="text-[#6C757D] text-sm mb-4 tracking-widest uppercase">LINE通知サービス</p>
              <h2
                className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-6"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                気になる区だけ、<br />通知を受け取る。
              </h2>
              <p className="text-[#6C757D] leading-relaxed mb-10">
                LINEで友だち追加するだけで、空きが出た瞬間に通知が届きます。
                住みたい区だけに絞れるので、不要な通知はゼロ。
              </p>
              <div className="flex flex-col gap-4 mb-10">
                {[
                  { icon: MessageCircle, step: "1", text: "LINEで友だち追加（無料）" },
                  { icon: MapPin,        step: "2", text: "希望の区をメッセージで送るだけで登録完了" },
                  { icon: Bell,          step: "3", text: "その区に空きが出たら即座にLINE通知" },
                ].map(({ icon: Icon, step, text }) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {step}
                    </span>
                    <Icon size={18} className="text-[#6C757D] flex-shrink-0" />
                    <span className="text-[#1A1A1A] font-medium">{text}</span>
                  </div>
                ))}
              </div>
              <a
                href={LINE_ADD_FRIEND_URL}
                className="inline-flex items-center gap-3 bg-[#06C755] text-white font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg shadow-[#06C755]/20"
              >
                <MessageCircle size={20} className="fill-current" />
                友だち追加（無料）
              </a>
            </div>

            {/* 右: 対応区一覧 */}
            <div className="bg-[#F8F9FA] rounded-lg border border-[#1A1A1A]/5 p-8">
              <p className="text-xs text-[#6C757D] uppercase tracking-widest mb-5">通知対応エリア（東京23区 + 市部）</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "千代田区","中央区","港区","新宿区","文京区","台東区","墨田区","江東区",
                  "品川区","目黒区","大田区","世田谷区","渋谷区","中野区","杉並区","豊島区",
                  "北区","荒川区","板橋区","練馬区","足立区","葛飾区","江戸川区",
                  "八王子市","立川市","武蔵野市","三鷹市","府中市","調布市","町田市",
                ].map((ward) => (
                  <span
                    key={ward}
                    className="inline-flex items-center gap-1 text-xs text-[#1A1A1A] bg-white border border-[#1A1A1A]/10 px-3 py-1 rounded-full"
                  >
                    <CheckCircle size={11} className="text-[#06C755]" />
                    {ward}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 攻略ガイドセクション */}
      {latestArticles.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2
                  className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  JKK攻略ガイド
                </h2>
              </div>
              <Link
                href="/guide"
                className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1 hover:opacity-60 transition-opacity"
              >
                すべて見る
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/guide/${article.slug}`}
                  className="bg-[#F8F9FA] rounded-lg border border-[#1A1A1A]/5 p-6 transition-transform duration-200 hover:-translate-y-1 block"
                >
                  <p className="text-xs text-[#6C757D] mb-3">{article.date}</p>
                  <h3
                    className="font-bold text-[#1A1A1A] leading-snug mb-2"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#6C757D] line-clamp-2">{article.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 物件一覧セクション */}
      <section id="vacancy-list" className="py-32 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-4">
                現在の空き家一覧
              </h2>
              <p className="text-[#6C757D]">
                今すぐ申し込める空き家を表示しています。
              </p>
            </div>
          </div>
          <VacancyDashboard />
        </div>
      </section>
    </div>
  );
}
