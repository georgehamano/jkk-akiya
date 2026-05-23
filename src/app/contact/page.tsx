import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "お問い合わせ | JKK空き家速報",
  description:
    "JKK空き家速報へのお問い合わせはこちらから。サービスに関するご質問・ご要望・不具合のご報告を受け付けています。",
};

const contactEmail = "g-hamano@hammys.com";
const lineAddUrl = "https://lin.ee/Y5P8ovy";

export default function ContactPage() {
  return (
    <div>
      {/* ヒーロー */}
      <section className="bg-[#1A1A1A] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-white/50 text-xs sm:text-sm mb-4 tracking-widest uppercase">
            Contact
          </p>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            お問い合わせ
          </h1>
          <p className="text-white/60 text-sm sm:text-base mt-5 leading-relaxed">
            サービスに関するご質問・ご要望・不具合報告など、
            <br className="hidden sm:block" />
            お気軽にご連絡ください。
          </p>
        </div>
      </section>

      {/* 連絡方法 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-6">
          {/* メール */}
          <div className="border border-[#1A1A1A]/10 rounded-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white">
                <Mail size={18} />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">メールで問い合わせる</h2>
            </div>
            <p className="text-[#6C757D] text-sm sm:text-base leading-relaxed mb-4">
              ご質問・ご要望・不具合報告など、文章でじっくりお伝えいただけます。
              返信には数日いただく場合があります。
            </p>
            <a
              href={`mailto:${contactEmail}?subject=【JKK空き家速報】お問い合わせ`}
              className="inline-flex items-center gap-2 text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A] hover:opacity-70 transition-opacity"
            >
              {contactEmail}
            </a>
          </div>

          {/* LINE */}
          <div className="border border-[#1A1A1A]/10 rounded-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#06C755] flex items-center justify-center text-white">
                <MessageCircle size={18} className="fill-current" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">LINEで問い合わせる</h2>
            </div>
            <p className="text-[#6C757D] text-sm sm:text-base leading-relaxed mb-5">
              LINE公式アカウントを友だち追加して、トーク画面からメッセージを送ってください。
              空き家通知の登録もこちらから可能です。
            </p>
            <a
              href={lineAddUrl}
              className="inline-flex items-center gap-2 bg-[#06C755] text-white font-bold px-6 py-3 rounded-lg transition-all hover:opacity-90 active:scale-95"
            >
              <MessageCircle size={16} className="fill-current" />
              友だち追加（無料）
            </a>
          </div>

          {/* 注意事項 */}
          <div className="bg-[#F8F9FA] rounded-lg p-6 sm:p-8 border border-[#1A1A1A]/5">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-3">お問い合わせの前に</h3>
            <ul className="space-y-2 text-sm text-[#6C757D] leading-relaxed list-disc list-inside">
              <li>本サービスは東京都住宅供給公社（JKK東京）の非公式サービスです。JKKへの申込み・契約・物件に関する直接のお問い合わせはJKK東京の公式窓口にお願いします。</li>
              <li>個人情報の取扱いについては <a href="/privacy" className="underline">プライバシーポリシー</a> をご確認ください。</li>
              <li>返信は数日かかる場合があります。営業・勧誘目的のお問い合わせはご遠慮ください。</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
