import CreateOpportunity from "@/modules/pages/CreateOpportunity";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Match4purpose - Create Opportunity",
  description: "...",
};

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  return <CreateOpportunity userId={userId} />;
}
