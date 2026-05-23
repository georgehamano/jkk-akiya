import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "src/content/guide");
const OUT_DIR = path.join(ROOT, "public/img/guide");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const FONT = `-apple-system, BlinkMacSystemFont, &quot;Hiragino Sans&quot;, &quot;Yu Gothic&quot;, &quot;Meiryo&quot;, sans-serif`;

const PALETTES = {
  navy:   { from: "#1E293B", to: "#475569", accent: "#94A3B8" },
  green:  { from: "#064E3B", to: "#047857", accent: "#6EE7B7" },
  orange: { from: "#9A3412", to: "#EA580C", accent: "#FED7AA" },
  red:    { from: "#7F1D1D", to: "#B91C1C", accent: "#FCA5A5" },
  purple: { from: "#581C87", to: "#7E22CE", accent: "#D8B4FE" },
  pink:   { from: "#831843", to: "#BE185D", accent: "#F9A8D4" },
  blue:   { from: "#1E3A8A", to: "#2563EB", accent: "#93C5FD" },
  amber:  { from: "#78350F", to: "#B45309", accent: "#FCD34D" },
};

const ARTICLES = {
  "jkk-what-is-akiya": {
    titleLines: ["JKK空き家とは？", "0円の仕組み"],
    palette: "navy",
    category: "はじめに",
  },
  "jkk-vs-minkan": {
    titleLines: ["民間賃貸 vs", "JKK空き家"],
    palette: "green",
    category: "比較",
  },
  "jkk-eligibility": {
    titleLines: ["JKKに申し込める", "人の条件"],
    palette: "navy",
    category: "入居資格",
  },
  "jkk-application-flow": {
    titleLines: ["申込みから", "入居までの流れ"],
    palette: "navy",
    category: "申込みフロー",
  },
  "jkk-required-documents": {
    titleLines: ["必要書類", "チェックリスト"],
    palette: "navy",
    category: "書類",
  },
  "jkk-guarantor": {
    titleLines: ["連帯保証人と", "保証会社の使い方"],
    palette: "navy",
    category: "保証",
  },
  "jkk-chusen-vs-senchaku": {
    titleLines: ["抽選 vs 先着順", "どっちが受かる？"],
    palette: "amber",
    category: "申込み戦略",
  },
  "jkk-rakusen-after": {
    titleLines: ["落選した時の", "次の一手"],
    palette: "red",
    category: "戦略",
  },
  "jkk-senkichijun-kouryaku": {
    titleLines: ["先着順攻略", "3つの準備"],
    palette: "red",
    category: "戦略",
  },
  "jkk-rent-prices": {
    titleLines: ["間取り別の", "家賃相場"],
    palette: "orange",
    category: "費用",
  },
  "jkk-move-out-cost": {
    titleLines: ["退去時費用と", "原状回復"],
    palette: "orange",
    category: "費用",
  },
  "jkk-rent-reduction": {
    titleLines: ["家賃減額制度の", "活用方法"],
    palette: "orange",
    category: "費用",
  },
  "jkk-renewal": {
    titleLines: ["契約更新の", "手続きと費用"],
    palette: "purple",
    category: "更新",
  },
  "jkk-popular-areas": {
    titleLines: ["人気エリア", "ランキング"],
    palette: "blue",
    category: "エリア",
  },
  "jkk-tama-area": {
    titleLines: ["多摩26市の", "穴場エリア"],
    palette: "blue",
    category: "エリア",
  },
  "jkk-family-friendly": {
    titleLines: ["ファミリー向け", "物件の選び方"],
    palette: "green",
    category: "ファミリー",
  },
  "jkk-single-living": {
    titleLines: ["単身者向け", "物件の選び方"],
    palette: "green",
    category: "単身",
  },
  "jkk-senior-housing": {
    titleLines: ["シニア向け住宅", "の特徴"],
    palette: "purple",
    category: "シニア",
  },
  "jkk-pet-diy": {
    titleLines: ["ペット・楽器・", "DIY可の物件"],
    palette: "pink",
    category: "特殊条件",
  },
  "jkk-notify-methods": {
    titleLines: ["更新情報を知る", "3つの方法"],
    palette: "pink",
    category: "通知",
  },
  "jkk-vacancy-fills-fast": {
    titleLines: ["人気物件を", "逃さない方法"],
    palette: "red",
    category: "速度",
  },
};

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function generateSvg({ titleLines, palette, category }) {
  const p = PALETTES[palette];
  const tagWidth = Math.max(120, category.length * 28 + 60);
  const titleSize = titleLines.some((l) => l.length > 10) ? 70 : 82;
  const titleGap = titleSize + 16;
  const baselineY = titleLines.length === 2 ? 360 : 410;

  return `<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(titleLines.join(" "))}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.from}"/>
      <stop offset="100%" stop-color="${p.to}"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="white" fill-opacity="0.06"/>
    </pattern>
  </defs>

  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#dots)"/>

  <circle cx="1080" cy="130" r="220" fill="white" fill-opacity="0.06"/>
  <circle cx="970" cy="90"  r="90"  fill="white" fill-opacity="0.05"/>
  <circle cx="1130" cy="600" r="140" fill="white" fill-opacity="0.04"/>

  <g transform="translate(80, 88)">
    <rect x="0" y="0" width="${tagWidth}" height="48" rx="24" fill="white" fill-opacity="0.15"/>
    <text x="${tagWidth / 2}" y="31" text-anchor="middle" fill="${p.accent}" font-family="${FONT}" font-size="22" font-weight="700" letter-spacing="0.05em">${escapeXml(category)}</text>
  </g>

  <text fill="white" font-family="${FONT}" font-weight="900" font-size="${titleSize}" style="letter-spacing:-0.025em">
    ${titleLines.map((l, i) => `<tspan x="80" y="${baselineY + i * titleGap}">${escapeXml(l)}</tspan>`).join("\n    ")}
  </text>

  <rect x="80" y="572" width="48" height="4" rx="2" fill="white" fill-opacity="0.6"/>
  <text x="80" y="618" fill="white" fill-opacity="0.85" font-family="${FONT}" font-size="24" font-weight="700">JKK空き家速報</text>
  <text x="80" y="648" fill="white" fill-opacity="0.55" font-family="${FONT}" font-size="16" font-weight="500" letter-spacing="0.1em">攻略ガイド / GUIDE</text>
</svg>`;
}

function upsertFrontmatterThumbnail(slug, thumbnailPath) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    console.warn(`! mdx not found: ${slug}`);
    return false;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    console.warn(`! no frontmatter: ${slug}`);
    return false;
  }
  const fmBody = fmMatch[1];
  if (/^thumbnail:/m.test(fmBody)) {
    const newFm = fmBody.replace(/^thumbnail:.*$/m, `thumbnail: "${thumbnailPath}"`);
    fs.writeFileSync(filePath, raw.replace(fmMatch[0], `---\n${newFm}\n---`));
  } else {
    const newFm = `${fmBody}\nthumbnail: "${thumbnailPath}"`;
    fs.writeFileSync(filePath, raw.replace(fmMatch[0], `---\n${newFm}\n---`));
  }
  return true;
}

const mdxFiles = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""));

const missing = mdxFiles.filter((s) => !ARTICLES[s]);
if (missing.length) {
  console.warn("Articles without thumbnail definition:", missing);
}

let generated = 0;
for (const [slug, data] of Object.entries(ARTICLES)) {
  if (!mdxFiles.includes(slug)) {
    console.warn(`! article not in content/: ${slug}`);
    continue;
  }
  const svg = generateSvg(data);
  const fileName = `${slug}.svg`;
  fs.writeFileSync(path.join(OUT_DIR, fileName), svg);
  const updated = upsertFrontmatterThumbnail(slug, `/img/guide/${fileName}`);
  if (updated) generated++;
  console.log(`✓ ${slug}`);
}

console.log(`\nGenerated ${generated} thumbnails into ${OUT_DIR}`);
