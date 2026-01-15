import { Role, RoleId, Results } from '@/lib/types'

export type RoleTier = "core" | "moderate" | "peripheral";

export type RankedRole = {
  id: RoleId;
  score: number;
  rank: number; // 1 is highest
  tier: RoleTier;
  isHighest: boolean;
  isLowest: boolean;
  role: Role;
};

export function rankRoles(roles: Role[], results: Results): RankedRole[] {
  const scored = roles.map((role) => ({
    id: role.id,
    score: results[role.id] ?? 0,
    role,
  }));

  scored.sort((a, b) => b.score - a.score);

  const n = scored.length;

  return scored.map((r, idx) => {
    const rank = idx + 1;
    const tier: RoleTier = 
      rank <= 4 ? "core" : rank > n - 3 ? "peripheral" : "moderate";


    return {
      ...r,
      rank,
      tier,
      isHighest: rank === 1,
      isLowest: rank === n,

    };
  });
}