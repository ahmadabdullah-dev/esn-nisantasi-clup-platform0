"use client";

import Image from "next/image";
import { Box } from "@mui/material";
import Link from "next/link";
export default function ESN_Nisantasi_Logo() {
  return (
    <Box component={Link} href="/">
      <Image
        src="/colour-white-digital@4x-8.png"
        width={120}
        height={0}
        alt="ESN Nisantasi Logo"
        priority
      />
    </Box>
  );
}
