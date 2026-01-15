"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RankedRole, RoleTier } from "@/lib/ranking";
import { RoleId } from "@/lib/types";

type Props = {
  userId: string;
  ranked: RankedRole[];
};

const ROLE_ACCENT: Record<string, string> = {
  builder: "#0369A1",
  caretaker: "#14532D",
  challenger: "#B45309",
  connector: "#115E59",
  expert: "#059669",
  innovator: "#4C1D95",
  leader: "#92400E",
  organizer: "#1D4ED8",
  strategist: "#0F172A",
  supporter: "#BE123C",
};

function withAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function BreakdownClient({ ranked }: Props) {
  const [selectedId, setSelectedId] = useState(ranked[0]?.id);

  const selected = useMemo(
    () => ranked.find((r) => r.id === selectedId) ?? ranked[0],
    [ranked, selectedId]
  );

  return (
    <div className="min-h-screen bg-[#FBFAF7] text-[#1E1E1E]">
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="pt-8">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 rounded-full border border-[#E7E0D6] bg-white px-4 py-2 text-sm shadow-sm hover:bg-[#F6F2EA]"
          >
            <span aria-hidden>‹</span>
            Back to Summary
          </Link>

          <TierTabs tier={selected.tier} />
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

function articleFor(word: string) {
  const lower = word.toLowerCase();

  if (lower.startsWith("honest") || lower.startsWith("hour")) return "an";
  if (lower.startsWith("uni") || lower.startsWith("use")) return "a";

  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function TierTabs({ tier }: { tier: RoleTier }) {
  const tabs = [
    { key: "core" as const, label: "Core Roles" },
    { key: "moderate" as const, label: "Intermediate Roles" },
    { key: "peripheral" as const, label: "Peripheral Roles" },
  ];

  return (
    <div className="mt-8 flex gap-12 text-sm text-[#6B7280]">
      {tabs.map((t) => {
        const active = t.key === tier;
        return (
          <div key={t.key} className="relative pb-2">
            <span className={active ? "font-medium text-[#1E1E1E]" : ""}>
              {t.label}
            </span>
            {active && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1E1E1E]/60" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function RoleCarousel({
  roles,
  selectedId,
  onSelect,
}: {
  roles: RankedRole[];
  selectedId: string;
  onSelect: (id: RoleId) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const activeIndex = roles.findIndex((r) => r.id === selectedId);

  function updateScrollButtons() {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < maxScrollLeft - 2);
  }

  useEffect(() => {
    updateScrollButtons();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateScrollButtons();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateScrollButtons());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  function scrollByCards(dir: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.max(260, Math.floor(el.clientWidth * 0.7));
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  function scrollSelectedIntoView(id: string) {
    const el = scrollerRef.current;
    if (!el) return;

    const target = el.querySelector<HTMLButtonElement>(
      `button[data-role-id="${id}"]`
    );
    if (!target) return;

    const left = target.offsetLeft;
    const right = left + target.offsetWidth;
    const viewLeft = el.scrollLeft;
    const viewRight = viewLeft + el.clientWidth;

    if (left < viewLeft + 20) {
      el.scrollTo({ left: Math.max(0, left - 20), behavior: "smooth" });
    } else if (right > viewRight - 20) {
      el.scrollTo({ left: right - el.clientWidth + 20, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (selectedId) scrollSelectedIntoView(selectedId);
  }, [selectedId]);

  return (
    <div className="mt-8 -mx-20 relative">
      {/* Left chevron */}
      <button
        type="button"
        onClick={() => scrollByCards("left")}
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
        onClick={() => scrollByCards("right")}
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
        className="flex gap-2 overflow-x-auto overflow-y-visible pb-10 pt-6 px-12 scroll-smooth"
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
                key={r.id}
                data-role-id={r.id}
                onClick={() => onSelect(r.id)}
                className={[
                  "relative min-w-[210px] h-[130px] rounded-2xl border px-5 text-left transition-transform",
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
              >
                <div className="flex translate-y-2 items-start justify-between gap-3">
                  <div>
                    <div className="mt-1 text-lg text-[#1E1E1E]">
                      {r.role.name}
                    </div>
                  </div>

                  <div
                    className="grid h-16 w-16 translate-y-10 -translate-x-4 place-items-center rounded-full border bg-white"
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

                <div className="mb-4 flex items-end justify-between -translate-y-6">
                  <div
                    className="text-7xl font-serif"
                    style={{ color: withAlpha(accent, 0.18) }}
                  >
                    {r.rank}
                  </div>
                </div>

                {/* Optional: small accent underline for active */}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoleAlignmentBlock({ role }: { role: RankedRole }) {
  const score = Math.round(role.score);
  const clamped = Math.max(0, Math.min(100, score));

  const title = role.isHighest
    ? "Understanding Your Highest Role Alignment"
    : role.isLowest
    ? "Understanding Your Lowest Role Alignment"
    : role.tier === "core"
    ? "Understanding Your High Role Alignment"
    : role.tier === "peripheral"
    ? "Understanding Your Low Role Alignment"
    : "Understanding Your Role Alignment";

  function getRankDesc(r: {
    isHighest: boolean;
    isLowest: boolean;
    tier: string;
    role: any;
  }) {
    if (r.isHighest) return r.role.top_rank_desc;
    if (r.isLowest) return r.role.bottom_rank_desc;
    if (r.tier === "core") return r.role.core_rank_desc;
    if (r.tier === "peripheral") return r.role.peripheral_rank_desc;
    return "";
  }

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  function RoleAlignmentMeter({ score }: { score: number }) {
    const s = clamp(score, 0, 100);
    const left = Math.min(50, s);
    const right = Math.max(50, s);
    const width = right - left;
    const isLow = s < 50;

    const low = "#F2C9CC";
    const neutral = "#F6E2B6";
    const high = "#D6EAD8";

    // Base: split at 50 so no red influences past 50
    const leftHalf = `linear-gradient(90deg, ${low} 0%, ${neutral} 100%)`;
    const rightHalf = `linear-gradient(90deg, ${neutral} 0%, ${high} 100%)`;

    // Only round the FAR edge (not the neutral edge)
    const farEdgeRadius = 32;
    const position = score;
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Meter Container */}
        <div className="mt-4">
          {/* Labels */}
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-600">Low</span>
            <span className="text-lg text-gray-600 mb-8">Neutral</span>
            <span className="text-lg text-gray-600">High</span>
          </div>

          {/* Gradient Bar */}
          <div className="relative h-24 rounded-3xl overflow-visible">
            {/* Background gradient - full meter from red to yellow to green */}
            <div
              className="absolute -top-2 right-0 bottom-0 left-0 rounded-3xl opacity-50"
              style={{
                background:
                  "linear-gradient(to right, #f5d5d5 0%, #fef5e0 50%, #d4e8d4 100%)",
              }}
            />

            {/* Progress bar from neutral (50) to current score */}
            {position !== 50 && (
              <div
                className="absolute -top-2 right-0 bottom-0 left-0 transition-all duration-500 ease-out flex items-center pr-6"
                style={{
                  left: position >= 50 ? "50%" : `${position}%`,
                  right: position >= 50 ? `${100 - position}%` : "50%",
                  borderRadius:
                    position >= 50 ? "0 1.5rem 1.5rem 0" : "1.5rem 0 0 1.5rem",
                  background:
                    "linear-gradient(to right, #e88888 0%, #f5e5a0 50%, #a0d4a0 100%)",
                  backgroundSize: "100vw 100%",
                  backgroundPosition:
                    position >= 50 ? `-${50}vw 0` : `-${position}vw 0`,
                  justifyContent: position >= 50 ? "flex-end" : "flex-start",
                  paddingLeft: position >= 50 ? "0" : "1.5rem",
                  paddingRight: position >= 50 ? "1.5rem" : "0",
                }}
              >
                {/* Score indicator */}
                <div className="text-6xl font-serif text-gray-700 drop-shadow-sm">
                  {score}
                </div>
              </div>
            )}

            {/* Score indicator for exactly 50 */}
            {position === 50 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 ml-4">
                <div className="text-6xl font-serif text-gray-700 drop-shadow-sm">
                  {score}
                </div>
              </div>
            )}

            {/* Neutral marker line */}
            <div className="absolute left-1/2 -top-8 -bottom-8 w-px bg-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  const desc = getRankDesc(role);

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
