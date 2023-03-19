import Profile from "@/modules/pages/Profile";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  return <Profile userId={userId} />;
}
