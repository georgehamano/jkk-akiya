import type { Metadata } from "next";
import { JkkBenefits } from "@/components/JkkBenefits";

export const metadata: Metadata = {
  title: "運営者について | JKK空き家速報",
  description: "JKKへの入居を目指すひとりの母親が、3ヶ月の苦労の末に作ったサービスです。JKKの魅力と、このサービスが生まれた背景をご紹介します。",
};

export default function AboutPage() {
  return (
    <div>
      {/* ヒーロー */}
      <section className="bg-[#1A1A1A] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-white/50 text-xs sm:text-sm mb-5 tracking-widest uppercase">
            About this service
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.15] tracking-tighter mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            3ヶ月、毎朝6時に<br />スマホを開き続けた。
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            このサービスは、JKKへの入居を目指すひとりの母親が<br className="hidden sm:block" />
            「もうこんな思いを誰にもさせたくない」という気持ちで作りました。
          </p>
        </div>
      </section>

      {/* ストーリー */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <p className="text-[#6C757D] text-xs sm:text-sm mb-4 tracking-widest uppercase">運営者の話</p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-10 sm:mb-12"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            佐藤 由香里（39歳）
          </h2>

          <div className="space-y-6 text-[#1A1A1A]/80 leading-[1.9] text-base sm:text-lg">
            <p>
              離婚が決まったのは、下の子が小学2年生の春でした。夫と協議の末、私が2人の子ども（当時10歳・8歳）を引き取り、都内で新しい住まいを探すことになりました。
            </p>
            <p>
              当時の手取りは月22万円ほど。民間の賃貸で3LDKを借りようとすると、敷金・礼金・仲介手数料だけで60〜80万円かかります。引越し費用と合わせると、貯金が一気に底をつく計算でした。
            </p>
            <p>
              途方に暮れていたとき、ママ友から「JKKって知ってる？礼金も更新料も仲介手数料も全部0円だよ」と教えてもらいました。公式サイトを見ると、たしかに家賃も民間の7割程度。<strong className="text-[#1A1A1A]">「これしかない」</strong>と思いました。
            </p>
            <p>
              ところが、壁がありました。JKKの公式サイトには空き家一覧のページはありますが、<strong className="text-[#1A1A1A]">「空きが出たら教えてくれる」機能が存在しない</strong>のです。人気エリアの物件は掲載されてから数時間で埋まることもある。気づいたら「申し込み受付終了」の文字。
            </p>
            <p>
              それから3ヶ月、スマホのアラームを毎朝6時にセットして、出勤前に手動でページを確認し続けました。休日も、旅行中も。子どもを寝かしつけたあとに「もしかして更新されてるかも」と夜中にチェックすることも何度もありました。
            </p>
            <p>
              ある日、IT企業に勤める友人にそのことを話すと、「それ、自動化できるよ」と言われました。「毎日手動でやる必要ない。スクレイピングして、LINEに飛ばせばいい」と。
            </p>
            <p>
              それから2人で週末を使って開発しました。Pythonで定期的にJKKのサイトを監視し、変化があったらLINEに通知する仕組みを。私はエンジニアではないので、主にテストとUIのフィードバックを担当しました。
            </p>
            <p>
              最終的に、東村山市の3LDKに入居できたのは、サービスを動かし始めてから3週間後のことでした。通知が来て、30分以内に申し込みページを開いて、なんとか間に合いました。
            </p>
            <p>
              入居後、「このツール、他の人にも使ってもらえないかな」という話になり、このサービスを公開することにしました。<strong className="text-[#1A1A1A]">費用は私持ちです。無料で使い続けられる限り、無料で提供します。</strong>
            </p>
          </div>
        </div>
      </section>

      {/* JKKの魅力 */}
      <section className="py-16 sm:py-24 bg-[#F3F4F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-[#6C757D] text-xs sm:text-sm mb-4 tracking-widest uppercase">Why JKK</p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-10 sm:mb-14"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            JKKが選ばれる8つの理由
          </h2>
          <JkkBenefits />
        </div>
      </section>

      {/* 免責・注記 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <div className="bg-[#F8F9FA] rounded-lg p-6 sm:p-8 border border-[#1A1A1A]/5">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-3">ご注意</h3>
            <ul className="space-y-2 text-sm text-[#6C757D] leading-relaxed list-disc list-inside">
              <li>本サービスは東京都住宅供給公社（JKK東京）の非公式サービスです。JKK東京とは一切関係ありません。</li>
              <li>掲載情報はJKK東京の公式サイトから自動取得しています。正確性は保証できません。申し込みは必ず公式サイトでご確認ください。</li>
              <li>サービスの継続・通知の到達を保証するものではありません。重要な申し込みは公式サイトも定期的にご確認ください。</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
