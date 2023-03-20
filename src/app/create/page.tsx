import CreateOpportunity from "@/modules/pages/CreateOpportunity";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  return <CreateOpportunity userId={userId} />;
}
