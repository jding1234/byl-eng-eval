// FILE: components/summary/RoleSection.tsx
import { RoleCard } from "./RoleCard";
import type { RankedRole } from "@/lib/ranking";

interface RoleSectionProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  roles: RankedRole[];
  emphasis: "core" | "intermediate" | "peripheral";
}

export function RoleSection({
  title,
  subtitle,
  actions,
  roles,
  emphasis,
}: RoleSectionProps) {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">{subtitle}</p>
          )}
        </div>
        {actions}
      </div>
      <div className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((r) => (
            <RoleCard key={r.id} r={r} emphasis={emphasis} />
          ))}
        </div>
      </div>
    </section>
  );
}
