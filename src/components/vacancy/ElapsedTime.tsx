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
    <span className="text-sm font-medium text-green-600">⚡ {label}</span>
  );
}
