/**
 * 引越し侍（A8.net）アフィリエイトバナー。
 * 掲載ガイドライン準拠のため、独自のコピー（数値・「安い」等）は付けず、
 * A8公式のバナー画像をそのまま使用する。景表法（ステマ規制）対応として
 * 「広告」表記を明示し、有料リンクには rel="nofollow sponsored" を付与する。
 */
export function AffiliateBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-[10px] tracking-widest text-[#6C757D] mb-1">広告</span>
      <a
        href="https://px.a8.net/svt/ejp?a8mat=2NDSV7+6NXQCA+ZXM+I7NE9"
        rel="nofollow sponsored"
        target="_blank"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={300}
          height={250}
          alt="引越し侍"
          src="https://www20.a8.net/svt/bgt?aid=160207459403&wid=002&eno=01&mid=s00000004657003059000&mc=1"
          className="max-w-full h-auto"
        />
      </a>
      {/* インプレッション計測ピクセル */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={1}
        height={1}
        alt=""
        src="https://www17.a8.net/0.gif?a8mat=2NDSV7+6NXQCA+ZXM+I7NE9"
        aria-hidden="true"
      />
    </div>
  );
}
