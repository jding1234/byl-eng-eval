interface RoleIconProps {
  id: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const ICON_SIZES = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-20 w-20",
};

export function RoleIcon({ id, name, size = "md" }: RoleIconProps) {
  const sizeClass = ICON_SIZES[size];

  return (
    <div
      className={[
        "flex flex-shrink-0 items-center justify-center rounded-full border border-[#1E1E1E]/10 bg-white",
        sizeClass,
      ].join(" ")}
    >
      <img
        src={`/roles/${id}.svg`}
        alt={`${name} icon`}
        className={sizeClass}
      />
    </div>
  );
}
