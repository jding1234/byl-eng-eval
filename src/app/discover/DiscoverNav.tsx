"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DiscoverNav() {
  const pathname = usePathname();

  const isSummary = pathname === "/discover/summary";
  const isBreakdown = pathname.startsWith("/discover/breakdown");

  return (
    <div className="max-w-[970px] mx-auto border-b border-[#E7E0D6] bg-[#FBFAF7]">
      <div className="mx-auto flex max-w-[970px] items-center gap-10  pt-6 pb-2 text-sm">
        <NavLink href="/discover/summary" active={isSummary}>
          Summary
        </NavLink>

        <NavLink href="/discover/breakdown" active={isBreakdown}>
          Role Breakdown
        </NavLink>
      </div>
    </div>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative ${
        active
          ? "font-bold text-[#1E1E1E]"
          : "text-[#6B7280] hover:text-[#1E1E1E]"
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#1E1E1E]/70" />
      )}
    </Link>
  );
}
