const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

type Variant = "inline" | "footer";

export function LineCTABanner({ variant }: { variant: Variant }) {
  if (variant === "inline") {
    return (
      <div className="bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)] p-8 my-10">
        <p
          className="font-bold text-[#1A1A1A] text-lg mb-2"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          サイトのリロードに限界を感じていませんか？
        </p>
        <p className="text-[#6C757D] text-sm mb-5">
          AIが24時間監視し、空きが出た瞬間にLINEでお知らせします。完全無料。
        </p>
        <a
          href={LINE_ADD_FRIEND_URL}
          className="inline-flex items-center gap-2 bg-[#06C755] text-white font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            chat
          </span>
          LINEで最速通知を受け取る
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] text-white py-24 px-8 text-center">
      <p
        className="font-extrabold text-4xl mb-4 tracking-tighter"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        JKKの空き家、最速でゲットしたいなら
      </p>
      <p className="text-sm mb-10 text-white/70">AIが10分おきに監視。空きが出た瞬間にあなたのLINEへ。</p>
      <a
        href={LINE_ADD_FRIEND_URL}
        className="inline-flex items-center gap-3 bg-[#06C755] text-white font-bold px-12 py-6 rounded-lg text-xl transition-all hover:opacity-90 active:scale-95 shadow-xl shadow-black/20"
      >
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          chat
        </span>
        友だち追加（無料）
      </a>
    </div>
  );
}
