/**
 * JKKの募集データは "265300" のような単一値のほかに
 * "265300～266500"（範囲）や "66.18～66.78" のような表記が混在する。
 * そのまま Number() に通すと NaN になるため、範囲を保ったまま整形する。
 */

const RANGE_SEPARATORS = /[～~〜]/;

/** 金額を「265,300〜266,500」のように整形する。数値化できない場合は null。 */
export function formatYen(value?: string | number | null): string | null {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  const parts = raw
    .split(RANGE_SEPARATORS)
    .map((p) => p.replace(/[,\s円]/g, ""))
    .filter(Boolean);
  if (parts.length === 0) return null;

  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isFinite(n))) return null;

  return nums.map((n) => n.toLocaleString("ja-JP")).join("〜");
}

/** 面積を「66.18〜66.78」のように整形する。数値化できない場合は null。 */
export function formatArea(value?: string | number | null): string | null {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  const parts = raw
    .split(RANGE_SEPARATORS)
    .map((p) => p.replace(/[,\s]|m²|㎡/g, ""))
    .filter(Boolean);
  if (parts.length === 0) return null;

  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isFinite(n))) return null;

  return nums.join("〜");
}
