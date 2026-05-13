"use client";

interface Props {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

export function ScrollButton({ targetId, className, children }: Props) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
