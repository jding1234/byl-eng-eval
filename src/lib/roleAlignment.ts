import type { RankedRole } from "@/lib/ranking";

export function getRoleAlignmentTitle(role: RankedRole) {
  if (role.isHighest) return "Understanding Your Highest Role Alignment";
  if (role.isLowest) return "Understanding Your Lowest Role Alignment";
  if (role.tier === "core") return "Understanding Your High Role Alignment";
  if (role.tier === "peripheral") return "Understanding Your Low Role Alignment";
  return "";
}

export function getRoleAlignmentDescription(role: RankedRole) {
  if (role.isHighest) return role.role.top_rank_desc;
  if (role.isLowest) return role.role.bottom_rank_desc;
  if (role.tier === "core") return role.role.core_rank_desc;
  if (role.tier === "peripheral") return role.role.peripheral_rank_desc;
  return "";
}

export function articleFor(word: string) {
  const lower = word.toLowerCase();

  if (lower.startsWith("honest") || lower.startsWith("hour")) return "an";
  if (lower.startsWith("uni") || lower.startsWith("use")) return "a";

  return /^[aeiou]/i.test(word) ? "an" : "a";
}