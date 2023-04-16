import Profile from "@/modules/pages/Profile";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Match4purpose - Profile",
  description: "...",
};

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  return <Profile userId={userId} />;
}
