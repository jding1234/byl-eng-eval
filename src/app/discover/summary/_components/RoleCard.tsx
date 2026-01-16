// FILE: components/summary/RoleCard.tsx
import { RoleIcon } from "./RoleIcon";
import { AlignmentBar } from "./AlignmentBar";
import type { RankedRole } from "@/lib/ranking";

export function RoleCard({
  r,
  emphasis,
}: {
  r: {
    id: string;
    role: { name: string; role_desc: string };
    score: number;
    rank: number;
  };
  emphasis: "core" | "intermediate" | "peripheral";
}) {
  const bg =
    emphasis === "core"
      ? "bg-[#F1E9F6]" // highlighted
      : emphasis === "intermediate"
      ? "bg-white" // neutral
      : "bg-[#FBFAF7]"; // peripheral (paper background)

  return (
    <div
      className={[
        "relative rounded-2xl border border-[#E7E0D6] p-6 shadow-sm",
        bg,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#6B7280]">
            Rank {r.rank}
          </div>
          <div className="mt-1 text-2xl font-semibold">{r.role.name}</div>

          {/* Summary */}
          <div className="mt-2 text-sm leading-6 text-[#5C5C5C] line-clamp-3">
            {r.role.role_desc}
          </div>
        </div>

        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-[#1E1E1E]/10 bg-white">
          <img
            src={`/roles/${r.id}.svg`}
            alt={`${r.role.name} icon`}
            className="h-16 w-16"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
          Alignment
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E7E0D6]">
            <div
              className="h-full bg-[#1E1E1E]/50"
              style={{
                width: `${Math.max(0, Math.min(100, Math.round(r.score)))}%`,
              }}
            />
          </div>
          <div className="text-sm font-semibold text-[#1E1E1E]/70">
            {Math.round(r.score)}
          </div>
        </div>
      </div>
    </div>
  );
}
