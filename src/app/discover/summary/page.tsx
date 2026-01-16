import Link from "next/link";
import { getAllRoles } from "@/lib/data/roles";
import { getUserResults } from "@/lib/data/users";
import { rankRoles } from "@/lib/ranking";

export default async function Summary() {
  const userId = "24601";

  const results = getUserResults(userId);
  if (!results) {
    return <div className="p-10">Results not found for user {userId}</div>;
  }

  const roles = getAllRoles();
  const ranked = rankRoles(roles, results);

  const core = ranked.filter((r) => r.tier === "core");
  const intermediate = ranked.filter((r) => r.tier === "moderate");
  const peripheral = ranked.filter((r) => r.tier === "peripheral");

  return (
    <div className="min-h-screen bg-[#FBFAF7] text-[#1E1E1E]">
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <header className="pt-10">
          <h1 className="text-5xl font-semibold tracking-tight">
            Your Role Results
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#5C5C5C]">
            These are your role alignments for user {userId}. Your core roles
            represent the strongest patterns, and your peripheral roles are the
            weakest match.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/discover/breakdown"
              className="inline-flex items-center justify-center rounded-full bg-[#10131a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:translate-y-[-2px] hover:bg-black"
            >
              View Role Breakdown
            </Link>

            <div className="text-sm text-[#6B7280]">
              Sorted highest to lowest. Top 4 are core. Bottom 3 are peripheral.
            </div>
          </div>
        </header>

        <div className="mt-10 rounded-[28px] border border-[#E7E0D6] bg-white/60 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Quick overview
          </h2>

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
              sub={`${Math.round(
                ranked[ranked.length - 1]?.score ?? 0
              )} alignment`}
            />
          </div>

          <div className="mt-7">
            <AlignmentStrip ranked={[...ranked].reverse()} />
          </div>
        </div>

        <Section
          title="Core roles"
          subtitle="Your strongest role alignments"
          actions={
            <Link
              href="/discover/breakdown"
              className="text-sm font-medium text-[#1E1E1E]/70 hover:text-[#1E1E1E]"
            >
              See details →
            </Link>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {core.map((r) => (
              <RoleCard key={r.id} r={r} emphasis="core" />
            ))}
          </div>
        </Section>

        <Section
          title="Intermediate roles"
          subtitle="Meaningful traits, but not your primary drivers"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {intermediate.map((r) => (
              <RoleCard key={r.id} r={r} emphasis="intermediate" />
            ))}
          </div>
        </Section>

        <Section title="Peripheral roles" subtitle="Your weakest matches">
          <div className="grid gap-4 md:grid-cols-2">
            {peripheral.map((r) => (
              <RoleCard key={r.id} r={r} emphasis="peripheral" />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">{subtitle}</p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E7E0D6] bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-[#6B7280] line-clamp-2">{sub}</div>
    </div>
  );
}

function AlignmentStrip({
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
        <span>Low</span>
        <span>Neutral</span>
        <span>High</span>
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

function RoleCard({
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

function RoleRow({
  r,
}: {
  r: { id: string; role: { name: string }; score: number; rank: number };
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E7E0D6] bg-white/70 px-5 py-4">
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
          Rank {r.rank}
        </div>
        <div className="mt-1 truncate text-base font-semibold">
          {r.role.name}
        </div>
      </div>

      <div className="ml-6 flex items-center gap-3">
        <div className="text-sm font-semibold text-[#1E1E1E]/70">
          {Math.round(r.score)}
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-full border border-[#1E1E1E]/10 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/roles/${r.id}.svg`} alt="" className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
