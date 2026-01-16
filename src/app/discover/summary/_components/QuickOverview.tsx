// FILE: components/summary/QuickOverview.tsx
import { StatCard } from "./StatCard";
import { AlignmentBar } from "./AlignmentBar";
import type { RankedRole } from "@/lib/ranking";

interface QuickOverviewProps {
  ranked: RankedRole[];
  core: RankedRole[];
}

export function QuickOverview({ ranked, core }: QuickOverviewProps) {
  return (
    <div className="mt-10 rounded-[28px] border border-[#E7E0D6] bg-white/60 p-8">
      <h2 className="text-2xl font-semibold tracking-tight">Quick overview</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard
          label="Highest role"
          value={ranked[0]?.role.name ?? "N/A"}
          sub={`${Math.round(ranked[0]?.score ?? 0)} alignment`}
        />
        <StatCard
          label="Core roles"
          value={`${core.length}`}
          sub={core.map((r) => r.role.name).join(", ")}
        />
        <StatCard
          label="Lowest role"
          value={ranked[ranked.length - 1]?.role.name ?? "N/A"}
          sub={`${Math.round(ranked[ranked.length - 1]?.score ?? 0)} alignment`}
        />
      </div>

      <div className="mt-7">
        <AlignmentBar ranked={ranked} />
      </div>
    </div>
  );
}
