// FILE: components/summary/PageHeader.tsx
import Link from "next/link";

interface PageHeaderProps {
  userId: string;
}

export function PageHeader({ userId }: PageHeaderProps) {
  return (
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
  );
}
