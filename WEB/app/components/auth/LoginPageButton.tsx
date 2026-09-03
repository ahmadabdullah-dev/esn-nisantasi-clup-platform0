import { Button } from "@mui/material";
import Link from "next/link";
export default function LoginPageButton() {

  return (
    <Button
      component={Link}
      href="/login"
      variant="contained"
      sx={{
        
        backgroundColor: "var(--esn-magenta)",
        fontFamily: "var(--font-esn-body)",
        textTransform: "none",
        fontWeight: 700,
        borderRadius: 6,
        
        "&:hover": { backgroundColor: "var(--esn-orange)" },
      }}
    >
      Login
    </Button>
  );
}