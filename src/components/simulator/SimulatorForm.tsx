"use client";

import { useState } from "react";
import { LineCTABanner } from "@/components/cta/LineCTABanner";

// 一般賃貸の初期費用の目安（家賃の何ヶ月分か）
const GENERAL_DEPOSIT_MONTHS = 1;   // 敷金
const GENERAL_KEY_MONEY_MONTHS = 1; // 礼金
const GENERAL_AGENCY_FEE_MONTHS = 1; // 仲介手数料
const GENERAL_RENEWAL_FEE_MONTHS = 1; // 2年ごとの更新料
const YEARS = 5; // 比較年数

export function SimulatorForm() {
  const [rent, setRent] = useState("");
  const result = calculate(Number(rent.replace(/,/g, "")));

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          希望の家賃（月額）
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            placeholder="70000"
            className="border border-gray-300 rounded-lg px-4 py-2 text-lg w-44 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <span className="text-gray-500">円 / 月</span>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultCard
              label="JKK（礼金・更新料・仲介手数料0円）"
              initialCost={result.jkk.initial}
              totalCost={result.jkk.total}
              highlight
            />
            <ResultCard
              label="一般賃貸（相場目安）"
              initialCost={result.general.initial}
              totalCost={result.general.total}
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
            <p className="text-sm text-green-700 mb-1">{YEARS}年間でJKKを選ぶと</p>
            <p className="text-3xl font-bold text-green-700">
              {fmt(result.saving)}円 お得！
            </p>
            <p className="text-xs text-green-600 mt-1">※ 敷金は退去時に返却されるため除いて計算</p>
          </div>

          <LineCTABanner variant="inline" />
        </div>
      )}
    </div>
  );
}

function calculate(rent: number) {
  if (!rent || rent <= 0) return null;

  const jkkInitial = rent; // 敷金1ヶ月のみ
  const jkkTotal = jkkInitial + rent * 12 * YEARS;

  const generalInitial =
    rent * (GENERAL_DEPOSIT_MONTHS + GENERAL_KEY_MONEY_MONTHS + GENERAL_AGENCY_FEE_MONTHS);
  const renewals = Math.floor(YEARS / 2); // 2年ごとに更新
  const generalTotal =
    generalInitial + rent * 12 * YEARS + rent * GENERAL_RENEWAL_FEE_MONTHS * renewals;

  // 敷金は返ってくるので節約額の計算から除外
  const saving =
    rent * GENERAL_KEY_MONEY_MONTHS +
    rent * GENERAL_AGENCY_FEE_MONTHS +
    rent * GENERAL_RENEWAL_FEE_MONTHS * renewals;

  return { jkk: { initial: jkkInitial, total: jkkTotal }, general: { initial: generalInitial, total: generalTotal }, saving };
}

function ResultCard({
  label, initialCost, totalCost, highlight = false,
}: {
  label: string; initialCost: number; totalCost: number; highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${highlight ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}>
      <p className={`text-xs font-bold mb-3 ${highlight ? "text-green-700" : "text-gray-500"}`}>{label}</p>
      <div className="space-y-1 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>初期費用</span>
          <span className="font-bold">{fmt(initialCost)}円</span>
        </div>
        <div className="flex justify-between">
          <span>{YEARS}年間合計</span>
          <span className="font-bold">{fmt(totalCost)}円</span>
        </div>
      </div>
    </div>
  );
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("ja-JP");
}
