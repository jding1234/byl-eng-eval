import DiscoverNav from "./DiscoverNav";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FBFAF7] text-[#1E1E1E]">
      <DiscoverNav />
      {children}
    </div>
  );
}
