"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/modules/context/user-context";
import { UserRole } from "@/modules/types/types";

export default function CreateInitiativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useContext(UserContext) ?? {};

  useEffect(() => {
    // Redirect volunteers trying to access create-initiative routes
    if (user && user.role !== UserRole.admin && user.role !== UserRole.organization) {
      router.push("/");
    }
  }, [user, router]);

  // If we know it's a volunteer, don't render children to prevent flicker
  if (user && user.role !== UserRole.admin && user.role !== UserRole.organization) {
    return null;
  }

  return <>{children}</>;
}
