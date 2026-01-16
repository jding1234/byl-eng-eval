export function AlignmentBar({
  ranked,
}: {
  ranked: Array<{
    id: string;
    score: number;
    tier: "core" | "moderate" | "peripheral";
  }>;
}) {
  return (
    <div className="rounded-2xl border border-[#E7E0D6] bg-white/70 p-4">
      <div className="mb-3 flex justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
        <span>Highest</span>
        <span>Lowest</span>
      </div>

      <div className="flex gap-2">
        {ranked.map((r) => {
          const score = Math.round(r.score);
          const tone =
            r.tier === "core"
              ? "bg-emerald-300"
              : r.tier === "peripheral"
              ? "bg-rose-300"
              : "bg-amber-300";

          return (
            <div
              key={r.id}
              className={[
                "flex-1 rounded-xl border border-[#E7E0D6] px-2 py-2",
                tone,
              ].join(" ")}
              title={`${r.id}: ${score}`}
            >
              <div className="text-xs text-[#6B7280]">{score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
