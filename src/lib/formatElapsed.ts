export function formatElapsed(updatedAt: string): string {
  const diff = Math.floor((Date.now() - new Date(updatedAt).getTime()) / 1000);
  if (diff < 60) return "たった今更新";
  if (diff < 3600) return `${Math.floor(diff / 60)}分前に更新`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前に更新`;
  return `${Math.floor(diff / 86400)}日前に更新`;
}
