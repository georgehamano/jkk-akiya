const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

type Variant = "inline" | "footer";

export function LineCTABanner({ variant }: { variant: Variant }) {
  if (variant === "inline") {
    return (
      <div className="bg-white border border-gray-200 rounded-[4px] p-8 my-10 shadow-sm">
        <p className="font-bold text-[#001F5B] text-lg mb-2">
          サイトのリロードに限界を感じていませんか？
        </p>
        <p className="text-[#6C757D] text-sm mb-5">
          AIが24時間監視し、空きが出た瞬間にLINEでお知らせします。完全無料。
        </p>
        <a
          href={LINE_ADD_FRIEND_URL}
          className="inline-block bg-[#001F5B] text-white font-bold px-6 py-2 rounded-[4px] text-sm"
        >
          LINEで最速通知を受け取る →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#001F5B] text-white p-12 text-center">
      <p className="font-bold text-2xl mb-3">JKKの空き家、最速でゲットしたいなら</p>
      <p className="text-sm mb-6 text-white/80">AIが10分おきに監視。空きが出た瞬間にあなたのLINEへ。</p>
      <a
        href={LINE_ADD_FRIEND_URL}
        className="inline-block bg-white text-[#001F5B] font-bold px-8 py-3 rounded-[4px]"
      >
        友だち追加（無料）
      </a>
    </div>
  );
}
