import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

export type NavLink = {
  label: string;
  href: string;
  icon: SvgIconComponent;
};

export const NavLinks: NavLink[] = [
  { label: "About", href: "/about", icon: InfoOutlinedIcon },
  { label: "Events", href: "/events", icon: EventOutlinedIcon },
  { label: "Users", href: "/users", icon: GroupsOutlinedIcon },
];
