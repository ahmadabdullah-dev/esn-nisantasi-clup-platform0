"use client";

import { redirect } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useUser";
import type { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const currentUser = useCurrentUser();

  if (currentUser.isLoading) {
    return <div>Loading...</div>;
  }

  if (currentUser.isError || !currentUser.data) {
    redirect("/login");
  }

  return <>{children}</>;
}
