"use client";
import type { RoleTier } from "@/lib/ranking";

export function TierTabs({
  tier,
  onSelectTier,
}: {
  tier: RoleTier;
  onSelectTier: (tier: RoleTier) => void;
}) {
  const tabs = [
    { key: "core" as const, label: "Core Roles" },
    { key: "moderate" as const, label: "Intermediate Roles" },
    { key: "peripheral" as const, label: "Peripheral Roles" },
  ];

  return (
    <div className="max-w-[500px] border-b border-[#E7E0D6] bg-[#FBFAF7]">
      <div className="mx-1 mt-8 flex gap-12 text-sm text-[#6B7280] ">
        {tabs.map((t) => {
          const active = t.key === tier;
          return (
            <button
              key={t.key}
              onClick={() => onSelectTier(t.key)}
              className={`relative pb-2 ${
                tier === t.key ? "font-bold text-[#1E1E1E]" : "text-[#6B7280]"
              }`}
            >
              {t.label}

              {tier === t.key && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1E1E1E]/60" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
