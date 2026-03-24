const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

type Variant = "header" | "inline" | "footer";

const styles: Record<Variant, string> = {
  header: "bg-[#06C755] text-white px-4 py-2 text-sm",
  inline: "bg-green-50 border border-green-300 rounded-xl p-5 my-8",
  footer: "bg-[#06C755] text-white p-6 text-center",
};

export function LineCTABanner({ variant }: { variant: Variant }) {
  if (variant === "header") {
    return (
      <div className={styles.header}>
        <a href={LINE_ADD_FRIEND_URL} className="flex items-center gap-2 justify-center font-bold">
          <span>📲 空きが出た瞬間にLINEで通知 — 無料で受け取る</span>
        </a>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={styles.inline}>
        <p className="font-bold text-green-800 text-lg mb-1">サイトのリロードに限界を感じていませんか？</p>
        <p className="text-green-700 text-sm mb-3">
          AIが24時間監視し、空きが出た瞬間にLINEでお知らせします。完全無料。
        </p>
        <a
          href={LINE_ADD_FRIEND_URL}
          className="inline-block bg-[#06C755] text-white font-bold px-6 py-2 rounded-full text-sm"
        >
          LINEで最速通知を受け取る →
        </a>
      </div>
    );
  }

  return (
    <div className={styles.footer}>
      <p className="font-bold text-xl mb-2">JKKの空き家、最速でゲットしたいなら</p>
      <p className="text-sm mb-4 opacity-90">AIが10分おきに監視。空きが出た瞬間にあなたのLINEへ。</p>
      <a
        href={LINE_ADD_FRIEND_URL}
        className="inline-block bg-white text-[#06C755] font-bold px-8 py-3 rounded-full"
      >
        友だち追加（無料）
      </a>
    </div>
  );
}
