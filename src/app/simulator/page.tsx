import { SimulatorForm } from "@/components/simulator/SimulatorForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "家賃・初期費用シミュレーター — JKK空き家速報",
  description: "JKKと一般賃貸の初期費用・総支払額を比較。礼金・更新料・仲介手数料0円でどれだけお得かを可視化します。",
};

export default function SimulatorPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">家賃・初期費用シミュレーター</h1>
      <p className="text-gray-500 text-sm mb-6">
        JKKは礼金・更新料・仲介手数料がすべて0円。希望の家賃を入力して、一般賃貸との差額を確認してみましょう。
      </p>
      <SimulatorForm />
    </div>
  );
}
