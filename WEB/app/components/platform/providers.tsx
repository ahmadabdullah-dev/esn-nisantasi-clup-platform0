"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CssBaseline } from "@mui/material";
export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
    <CssBaseline/>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
    </>
      
  );
}
