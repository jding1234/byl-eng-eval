// FILE: components/summary/StatCard.tsx
interface StatCardProps {
  label: string;
  value: string;
  sub: string;
}

export function StatCard({ label, value, sub }: StatCardProps) {
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
