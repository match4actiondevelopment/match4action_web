import AuthenticatedProfile from "@/modules/components/AuthenticatedProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Match4Action - Profile",
  description: "...",
};

export default function Page() {
  return <AuthenticatedProfile />;
}