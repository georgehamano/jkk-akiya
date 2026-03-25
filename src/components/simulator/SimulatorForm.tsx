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
      <div className="bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)] p-6 mb-6">
        <label className="block text-sm font-bold text-[#1A1A1A] mb-3">
          希望の家賃（月額）
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            placeholder="70000"
            className="border border-[#1A1A1A]/20 rounded-[4px] px-4 py-3 text-lg w-44 focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white"
          />
          <span className="text-[#6C757D]">円 / 月</span>
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

          <div className="bg-[#F0F0F0] border border-[#1A1A1A]/10 rounded-[4px] p-6 text-center">
            <p className="text-sm text-[#6C757D] mb-2">{YEARS}年間でJKKを選ぶと</p>
            <p
              className="text-4xl font-extrabold text-[#1A1A1A] tracking-tighter"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {fmt(result.saving)}円 お得！
            </p>
            <p className="text-xs text-[#6C757D] mt-2">※ 敷金は退去時に返却されるため除いて計算</p>
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
    <div
      className={`rounded-[4px] border p-5 ${
        highlight
          ? "bg-[#F0F0F0] border-[#1A1A1A]"
          : "bg-white border-[#1A1A1A]/10 shadow-[0_12px_40px_rgba(26,26,26,0.06)]"
      }`}
    >
      <p
        className={`text-xs font-bold mb-4 ${highlight ? "text-[#1A1A1A]" : "text-[#6C757D]"}`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {label}
      </p>
      <div className="space-y-2 text-sm text-[#6C757D]">
        <div className="flex justify-between">
          <span>初期費用</span>
          <span className={`font-bold ${highlight ? "text-[#1A1A1A]" : "text-[#1A1A1A]"}`}>
            {fmt(initialCost)}円
          </span>
        </div>
        <div className="flex justify-between">
          <span>{YEARS}年間合計</span>
          <span className={`font-bold ${highlight ? "text-[#1A1A1A]" : "text-[#1A1A1A]"}`}>
            {fmt(totalCost)}円
          </span>
        </div>
      </div>
    </div>
  );
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("ja-JP");
}
