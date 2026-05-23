import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | JKK空き家速報",
  description:
    "JKK空き家速報のプライバシーポリシー。取得する情報・利用目的・Cookie・Google AdSense・LINE Messaging APIの取り扱いについて記載しています。",
};

const updatedDate = "2026年5月23日";
const operator = "JKK空き家速報 運営事務局";
const contactEmail = "g-hamano@hammys.com";

export default function PrivacyPage() {
  return (
    <div>
      {/* ヒーロー */}
      <section className="bg-[#1A1A1A] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-white/50 text-xs sm:text-sm mb-4 tracking-widest uppercase">
            Privacy Policy
          </p>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            プライバシーポリシー
          </h1>
          <p className="text-white/60 text-sm mt-4">最終更新日：{updatedDate}</p>
        </div>
      </section>

      {/* 本文 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <div className="prose prose-gray max-w-none">
            <p>
              {operator}（以下「当方」といいます）は、本ウェブサイト「JKK空き家速報」（以下「本サービス」といいます）における、利用者の個人情報の取扱いについて以下のとおりプライバシーポリシーを定めます。
            </p>

            <h2>1. 取得する情報</h2>
            <p>本サービスでは、以下の情報を取得することがあります。</p>
            <ul>
              <li>
                <strong>LINE Messaging APIを通じて取得する情報</strong>：
                利用者がLINE公式アカウントを友だち追加した際に発行されるユーザー識別子（LINE user ID）、および利用者が当方アカウントに送信したメッセージ内容（地域指定など）。
              </li>
              <li>
                <strong>アクセスログ</strong>：
                IPアドレス、ブラウザの種類、参照元URL、アクセス日時、閲覧したページなど。
              </li>
              <li>
                <strong>Cookie等の識別子</strong>：
                サイト解析および広告配信のためのCookieおよび類似の技術によって自動取得される情報。
              </li>
            </ul>

            <h2>2. 利用目的</h2>
            <p>取得した情報は、以下の目的のためにのみ利用します。</p>
            <ul>
              <li>JKK空き家の新着情報を利用者にLINEで通知するため</li>
              <li>利用者の地域指定など、通知設定を管理するため</li>
              <li>サービスの品質改善およびアクセス解析のため</li>
              <li>不正利用の防止およびトラブル対応のため</li>
            </ul>

            <h2>3. 第三者提供</h2>
            <p>
              当方は、法令に基づく場合を除き、利用者の同意なく個人情報を第三者に提供することはありません。
            </p>

            <h2>4. Cookie（クッキー）について</h2>
            <p>
              本サービスでは、利用者の利便性向上・アクセス解析・広告配信のためにCookieを使用しています。Cookieとは、ウェブサイトを利用したときに、ブラウザに保存される情報のことです。
            </p>
            <p>
              利用者はブラウザの設定によりCookieの受け取りを拒否することができますが、その場合、本サービスの一部機能が利用できなくなる可能性があります。
            </p>

            <h2>5. Google AdSenseについて</h2>
            <p>
              本サービスでは、第三者配信の広告サービス「Google AdSense」を利用する場合があります。Googleなどの第三者広告配信事業者は、利用者の興味に応じた広告を表示するためにCookieを使用することがあります。
            </p>
            <p>
              Cookieを使用することで、当サイトや他サイトへのアクセスに関する情報を元に広告が配信されます。利用者は
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">広告のカスタマイズ設定（Google広告設定）</a>
              にて、パーソナライズ広告を無効にすることができます。
            </p>
            <p>
              また、第三者配信事業者によるCookieの使用については、
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Googleの広告ポリシー</a>
              をご確認ください。
            </p>

            <h2>6. アクセス解析ツールについて</h2>
            <p>
              本サービスでは、サイトの利用状況を把握するためにGoogle Analyticsなどのアクセス解析ツールを使用する場合があります。これらのツールはCookieを使用して、個人を特定する情報を含まない形でデータを収集します。
            </p>
            <p>
              収集されたデータはGoogleのプライバシーポリシーに基づいて管理されます。詳細は
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Googleのプライバシーポリシー</a>
              をご覧ください。
            </p>

            <h2>7. LINE Messaging APIについて</h2>
            <p>
              本サービスではLINE Messaging APIを利用して、空き家情報の通知を行います。LINEを通じた情報のやり取りに関しては、
              <a href="https://line.me/ja/terms/policy/" target="_blank" rel="noopener noreferrer">LINEヤフー株式会社のプライバシーポリシー</a>
              にも準拠します。
            </p>
            <p>
              利用者はいつでもLINE公式アカウントの「ブロック」または「友だち削除」を行うことで、本サービスからの通知を停止できます。ブロック後は当方からの新規メッセージ送信はできなくなります。
            </p>

            <h2>8. 個人情報の管理</h2>
            <p>
              当方は、利用者の個人情報を適切に管理し、紛失・破壊・改ざん・漏えいの防止に努めます。
            </p>

            <h2>9. 個人情報の開示・訂正・削除</h2>
            <p>
              利用者本人からの個人情報の開示・訂正・削除のご要望には、ご本人確認の上、合理的な範囲で速やかに対応します。お問い合わせ先は下記「11. お問い合わせ」をご覧ください。
            </p>

            <h2>10. 免責事項</h2>
            <p>
              本サービスは東京都住宅供給公社（JKK東京）の非公式サービスです。掲載情報の正確性・通知の到達は保証しません。重要な申込みは必ず公式サイトでご確認ください。
            </p>

            <h2>11. お問い合わせ</h2>
            <p>本ポリシーに関するお問い合わせは下記までお願いします。</p>
            <ul>
              <li>運営者：{operator}</li>
              <li>
                メール：
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
              <li>
                お問い合わせフォーム：<a href="/contact">こちら</a>
              </li>
            </ul>

            <h2>12. プライバシーポリシーの改定</h2>
            <p>
              本ポリシーは、法令変更やサービス内容の変更に応じて改定されることがあります。改定後の内容は本ページに掲載した時点から効力を有します。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
