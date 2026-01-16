"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RankedRole, RoleTier } from "@/lib/ranking";
import { RoleId } from "@/lib/types";
import { articleFor } from "@/lib/roleAlignment";

import { TierTabs } from "./_components/TierTabs";
import { RoleCarousel } from "./_components/RoleCarousel";
import { RoleAlignmentBlock } from "./_components/RoleAlignmentBlock";

type Props = {
  userId: string;
  ranked: RankedRole[];
};

export default function BreakdownClient({ ranked }: Props) {
  const [selectedId, setSelectedId] = useState(ranked[0]?.id);

  const selected = useMemo(
    () => ranked.find((r) => r.id === selectedId) ?? ranked[0],
    [ranked, selectedId]
  );

  function handleSelectTier(tier: RoleTier) {
    const firstInTier = ranked.find((r) => r.tier === tier);
    if (firstInTier) {
      setSelectedId(firstInTier.id);
    }
  }
  return (
    <div className="min-h-screen bg-[#FBFAF7] text-[#1E1E1E]">
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="pt-8">
          <Link
            href="/discover/summary"
            className="inline-flex items-center gap-2 rounded-full border border-[#E7E0D6] bg-white px-4 py-2 text-sm shadow-sm hover:bg-[#F6F2EA]"
          >
            <span aria-hidden>‹</span>
            Back to Summary
          </Link>

          <TierTabs tier={selected.tier} onSelectTier={handleSelectTier} />
        </div>

        <RoleCarousel
          roles={ranked}
          selectedId={selected.id}
          onSelect={setSelectedId}
        />

        <main className="mt-12">
          <h1 className="text-5xl font-serif tracking-tight">
            Who <span className="italic">is</span>{" "}
            {articleFor(selected.role.name)} {selected.role.name}?
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-7 text-[#5C5C5C]">
            {selected.role.role_desc}
          </p>

          <h2 className="mt-12 text-5xl font-serif tracking-tight">
            You Feel Most Like You When...
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-7 text-[#5C5C5C]">
            {selected.role.most_like_when}
          </p>

          <h2 className="mt-12 text-5xl font-serif tracking-tight">
            Core Drive
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-7 text-[#5C5C5C]">
            {selected.role.core_drive}
          </p>

          <RoleAlignmentBlock role={selected} />
        </main>
      </div>
    </div>
  );
}
