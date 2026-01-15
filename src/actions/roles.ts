"use server";

import { getRoleById } from "@/lib/data/roles";
import { isRoleId, Role, RoleId } from "@/lib/types";

export type GetRoleReponse = 
  | { ok: true; role: Role }
  | { ok: false; error: string };

export async function getRoleAction(roleId: string): Promise<GetRoleReponse> {
  if (!roleId || !isRoleId(roleId)) {
    return  { ok: false, error: "Missing or invalid roleId" };
  }

  const role = getRoleById(roleId as RoleId);
  if (!role) return { ok: false, error: "Role not found" };

  return { ok: true, role };
}