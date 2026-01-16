import { getAllRoles } from "@/lib/data/roles";
import { getUserResults } from "@/lib/data/users";
import { rankRoles } from "@/lib/ranking";
import BreakdownClient from "./BreakdownClient";

export default async function Breakdown() {
  const userId = "24601";

  const results = getUserResults(userId);
  if (!results) {
    return <div className="p-10">Results not found</div>;
  }

  const roles = getAllRoles();
  const ranked = rankRoles(roles, results);

  return <BreakdownClient userId={userId} ranked={ranked} />;
}
