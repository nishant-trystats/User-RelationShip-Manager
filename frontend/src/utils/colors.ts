export function getNodeColor(popularity: number): string {
  const hue = Math.max(220 - popularity * 10, 0); // from blue to red
  return `hsl(${hue}, 80%, 55%)`;
}