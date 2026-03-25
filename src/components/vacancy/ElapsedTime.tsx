"use client";

import { useEffect, useState } from "react";
import { formatElapsed } from "@/lib/formatElapsed";

export function ElapsedTime({ updatedAt }: { updatedAt: string }) {
  const [label, setLabel] = useState(formatElapsed(updatedAt));

  useEffect(() => {
    const id = setInterval(() => setLabel(formatElapsed(updatedAt)), 60_000);
    return () => clearInterval(id);
  }, [updatedAt]);

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1A1A1A]">
      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
        bolt
      </span>
      {label}
    </span>
  );
}
