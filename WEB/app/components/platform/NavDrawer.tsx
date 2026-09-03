"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { NavLinks } from "./NavLinks";
import ESN_Nisantasi_Logo from "./ESN_Nisantasi_Logo";
import LoginPageButton from "../auth/LoginPageButton";

type NavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function NavDrawer({ open, onClose }: NavDrawerProps) {
  const pathname = usePathname();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 280,
            backgroundColor: "var(--esn-dark-blue)",
            color: "white",
          },
        },
      }}
    >
      <Box
        role="presentation"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <ESN_Nisantasi_Logo />
          <IconButton
            onClick={onClose}
            aria-label="close menu"
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

        <List sx={{ pt: 1, flexGrow: 1 }} onClick={onClose}>
          {NavLinks.map((page) => {
            const active = pathname === page.href;
            const Icon = page.icon;
            return (
              <ListItem key={page.label} disablePadding>
                <ListItemButton
                  component={Link}
                  href={page.href}
                  sx={{
                    py: 1.25,
                    px: 3,
                    borderLeft: "3px solid",
                    borderLeftColor: active ? "var(--esn-cyan)" : "transparent",
                    backgroundColor: active
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={page.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontFamily: "var(--font-esn-body)",
                          fontWeight: active ? 700 : 400,
                          fontSize: "1rem",
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Box
          sx={{
            m:2
          }}
        >
          <LoginPageButton />
        </Box>
      </Box>
    </Drawer>
  );
}
