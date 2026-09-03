"use client";

import {useState,useEffect} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLinks } from "./NavLinks";
import NavDrawer from "./NavDrawer";
import ESN_Nisantasi_Logo from "./ESN_Nisantasi_Logo";
import LoginPageButton from "../auth/LoginPageButton";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "var(--esn-dark-blue)",
          transition: "box-shadow 0.2s ease",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,
              gap: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ESN_Nisantasi_Logo />
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {NavLinks.map((page) => {
                const active = pathname === page.href;
                return (
                  <Button
                    key={page.label}
                    component={Link}
                    href={page.href}
                    disableRipple
                    sx={{
                      position: "relative",
                      color: "white",
                      fontFamily: "var(--font-esn-body)",
                      fontWeight: active ? 700 : 500,
                      textTransform: "none",
                      fontSize: "0.95rem",
                      px: 1.5,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 12,
                        right: 12,
                        bottom: 8,
                        height: 2,
                        borderRadius: 1,
                        backgroundColor: "var(--esn-cyan)",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.2s ease",
                      },
                      "&:hover::after": { transform: "scaleX(1)" },
                    }}
                  >
                    {page.label}
                  </Button>
                );
              })}     
            <LoginPageButton/>

            </Box>
            <IconButton
              aria-label="open navigation menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
