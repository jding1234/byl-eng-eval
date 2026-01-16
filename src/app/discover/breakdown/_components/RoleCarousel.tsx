"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { RankedRole } from "@/lib/ranking";
import type { RoleId } from "@/lib/types";
import { ROLE_ACCENT } from "@/lib/colors";
import { withAlpha } from "@/lib/colors";
import { useRoleCarouselScroll } from "../hooks/useRoleCarouselScroll";

export function RoleCarousel({
  roles,
  selectedId,
  onSelect,
}: {
  roles: RankedRole[];
  selectedId: string; // keep as-is to match your current file; ideally RoleId
  onSelect: (id: RoleId) => void;
}) {
  const { scrollerRef, canLeft, canRight, scrollLeft, scrollRight } =
    useRoleCarouselScroll(selectedId);

  const activeIndex = useMemo(
    () => roles.findIndex((r) => r.id === selectedId),
    [roles, selectedId]
  );

  return (
    <div className="relative mt-8 -mx-20">
      {/* Left chevron */}
      <button
        type="button"
        onClick={scrollLeft}
        disabled={!canLeft}
        className={[
          "absolute left-0 top-1/2 z-10 -translate-y-1/2",
          "grid h-10 w-10 place-items-center rounded-full border bg-white shadow-sm",
          "border-[#E7E0D6] transition",
          canLeft ? "hover:bg-[#F6F2EA]" : "opacity-40 cursor-not-allowed",
        ].join(" ")}
        aria-label="Scroll roles left"
      >
        ‹
      </button>

      {/* Right chevron */}
      <button
        type="button"
        onClick={scrollRight}
        disabled={!canRight}
        className={[
          "absolute right-0 top-1/2 z-10 -translate-y-1/2",
          "grid h-10 w-10 place-items-center rounded-full border bg-white shadow-sm",
          "border-[#E7E0D6] transition",
          canRight ? "hover:bg-[#F6F2EA]" : "opacity-40 cursor-not-allowed",
        ].join(" ")}
        aria-label="Scroll roles right"
      >
        ›
      </button>

      {/* Scroll area */}
      <div
        ref={scrollerRef}
        className="flex gap-2 overflow-x-auto overflow-y-visible px-12 pb-10 pt-6 scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {roles.map((r, i) => {
          const active = r.id === selectedId;
          const accent = ROLE_ACCENT[r.id] ?? "#111827";

          const isLeftNeighbor = i === activeIndex - 1;
          const isRightNeighbor = i === activeIndex + 1;

          const borderColor = active ? accent : "rgba(231, 224, 214, 1)";
          const bg = active ? withAlpha(accent, 0.12) : "rgba(255,255,255,0.7)";
          const glow = active
            ? `0 12px 28px ${withAlpha(accent, 0.18)}`
            : "0 8px 18px rgba(0,0,0,0.06)";

          return (
            <div
              key={r.id}
              className={[
                "flex-none transition-[margin] duration-200",
                isLeftNeighbor ? "mr-6" : "",
                isRightNeighbor ? "ml-6" : "",
              ].join(" ")}
            >
              <button
                data-role-id={r.id}
                onClick={() => onSelect(r.id)}
                className={[
                  "relative h-[130px] min-w-[210px] rounded-2xl border px-5 text-left transition-transform",
                  active
                    ? "scale-[1.2] z-30 transition-none"
                    : "hover:scale-[1.03]",
                ].join(" ")}
                style={{
                  borderColor,
                  background: bg,
                  boxShadow: glow,
                }}
                aria-pressed={active}
                type="button"
              >
                <div className="flex translate-y-2 items-start justify-between gap-3">
                  <div>
                    <div className="mt-1 text-lg text-[#1E1E1E]">
                      {r.role.name}
                    </div>
                  </div>

                  <div
                    className="grid h-16 w-16 -translate-x-4 translate-y-10 place-items-center rounded-full border bg-white"
                    style={{ borderColor: withAlpha(accent, 0.35) }}
                  >
                    <Image
                      src={`/roles/${r.id}.svg`}
                      alt={`${r.role.name} icon`}
                      width={1000}
                      height={1000}
                    />
                  </div>
                </div>

                <div className="mb-4 flex -translate-y-6 items-end justify-between">
                  <div
                    className="text-7xl font-serif"
                    style={{ color: withAlpha(accent, 0.18) }}
                  >
                    {r.rank}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
