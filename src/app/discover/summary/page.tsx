// FILE: app/summary/page.tsx
import Link from "next/link";
import { getAllRoles } from "@/lib/data/roles";
import { getUserResults } from "@/lib/data/users";
import { rankRoles } from "@/lib/ranking";
import { PageHeader } from "./_components/PageHeader";
import { QuickOverview } from "./_components/QuickOverview";
import { RoleSection } from "./_components/RoleSection";

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
        <PageHeader userId={userId} />

        <QuickOverview ranked={ranked} core={core} />

        <RoleSection
          title="Core roles"
          subtitle="Your strongest role alignments"
          roles={core}
          emphasis="core"
          actions={
            <Link
              href="/discover/breakdown"
              className="text-sm font-medium text-[#1E1E1E]/70 hover:text-[#1E1E1E]"
            >
              See details →
            </Link>
          }
        />

        <RoleSection
          title="Intermediate roles"
          subtitle="Meaningful traits, but not your primary drivers"
          roles={intermediate}
          emphasis="intermediate"
        />

        <RoleSection
          title="Peripheral roles"
          subtitle="Your weakest matches"
          roles={peripheral}
          emphasis="peripheral"
        />
      </div>
    </div>
  );
}
