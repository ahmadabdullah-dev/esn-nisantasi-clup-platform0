"use client";

import { redirect } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useUser";
import type { ReactNode } from "react";

const ALLOWED_ROLES = ["Admin", "SuperAdmin"];

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const currentUser = useCurrentUser();

  if (currentUser.isLoading) {
    return <div>Loading...</div>;
  }

  if (!ALLOWED_ROLES.includes(currentUser.data!.role)) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
