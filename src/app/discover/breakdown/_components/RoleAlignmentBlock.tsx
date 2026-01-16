"use client";

import { RankedRole } from "@/lib/ranking";
import {
  getRoleAlignmentDescription,
  getRoleAlignmentTitle,
} from "@/lib/roleAlignment";
import { RoleAlignmentMeter } from "./RoleAlignmentMeter";

export function RoleAlignmentBlock({ role }: { role: RankedRole }) {
  const score = Math.round(role.score);
  const clamped = Math.max(0, Math.min(100, score));
  const title = getRoleAlignmentTitle(role);
  const desc = getRoleAlignmentDescription(role);

  return (
    <section className="mt-14 py-14 rounded-[28px] border border-[#E7E0D6] bg-[#F2EEE6] p-10 shadow-sm">
      <h2 className="text-5xl font-serif tracking-tight">Role Alignment</h2>

      <RoleAlignmentMeter score={score} />

      <div className="mt-14">
        <h3 className="text-3xl font-serif tracking-tight">{title}</h3>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#5C5C5C]">
          {desc}
        </p>
      </div>
    </section>
  );
}
