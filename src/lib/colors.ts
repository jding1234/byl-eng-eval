import { RoleId } from "./types";

export const ROLE_ACCENT: Record<string, string> = {
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

export function withAlpha(hex: string, alpha: number) {
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