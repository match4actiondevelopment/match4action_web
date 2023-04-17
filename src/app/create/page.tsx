import CreateInitiative from "@/modules/pages/CreateInitiative";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Match4purpose - Create Initiative",
  description: "...",
};

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  return <CreateInitiative userId={userId} />;
}
