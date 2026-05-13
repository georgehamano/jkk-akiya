import { Banknote, RefreshCw, Handshake, TrendingDown, Shield, Clock, Home, Heart } from "lucide-react";

const benefits = [
  {
    icon: Banknote,
    title: "礼金 0円",
    body: "民間賃貸では家賃1〜2ヶ月分を「お礼」として支払うのが慣習ですが、JKKには一切ありません。",
  },
  {
    icon: RefreshCw,
    title: "更新料 0円",
    body: "2年ごとに発生する更新料も不要。10年住めば家賃10〜20ヶ月分の差になる計算です。",
  },
  {
    icon: Handshake,
    title: "仲介手数料 0円",
    body: "JKKに直接申し込むため、不動産仲介業者への手数料（通常家賃1ヶ月分）がかかりません。",
  },
  {
    icon: TrendingDown,
    title: "家賃が相場より安い",
    body: "同じエリア・広さの民間物件と比べて、家賃が20〜35%程度安いケースが多く報告されています。公共性を重視した家賃設定が背景にあります。",
  },
  {
    icon: Shield,
    title: "東京都の公的機関が運営",
    body: "東京都住宅供給公社（JKK）は都が出資する公的機関。オーナートラブルや突然の立退き要求のリスクが低く、安心して長く住めます。",
  },
  {
    icon: Clock,
    title: "期間の定めなし・長期入居可",
    body: "定期借家契約ではなく普通借家契約が基本。「2年で退去してほしい」といったことはなく、腰を落ち着けて暮らせます。",
  },
  {
    icon: Home,
    title: "設備・共用部が充実",
    body: "エレベーター完備の中高層棟、駐輪場・駐車場、管理人常駐の団地も多数。民間の築古物件に比べ管理が行き届いています。",
  },
  {
    icon: Heart,
    title: "子育て・ファミリー向け物件が豊富",
    body: "3LDK以上のファミリータイプが多く、周辺に公園・学校が整った環境の物件も充実。子育て世帯に特に人気です。",
  },
];

export function JkkBenefits() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      {benefits.map(({ icon: Icon, title, body }) => (
        <div
          key={title}
          className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_8px_32px_rgba(26,26,26,0.05)]"
        >
          <Icon size={28} className="text-[#1A1A1A]" />
          <h3 className="text-base font-bold text-[#1A1A1A]">{title}</h3>
          <p className="text-sm text-[#6C757D] leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  );
}
