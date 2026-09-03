"use client";

import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { useGetUserByUsername } from "@/lib/hooks/useUser";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";

interface ProfileFieldProps {
  icon: ReactNode;
  label: string;
  value?: string | number | null;
}

function ProfileField({ icon, label, value }: ProfileFieldProps) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value || "—"}
        </Typography>
      </Box>
    </Stack>
  );
}

export interface ProfileProps {
  userName?: string;
}

export default function Profile({ userName: userNameProp }: ProfileProps) {
  const params = useParams<{ username: string }>();
  const userName = userNameProp ?? params?.username;

  const user = useGetUserByUsername(userName ?? "");

  if (!userName) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Typography color="text.secondary">No username provided.</Typography>
      </Box>
    );
  }

  if (user.isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (user.isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Typography color="error">
          Failed to load profile. Please try again.
        </Typography>
      </Box>
    );
  }

  const data = user.data;

  if (!data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Typography color="text.secondary">No profile data found.</Typography>
      </Box>
    );
  }

  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        p: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: { xs: 3, sm: 4 },
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack
          spacing={1.5}
          sx={{ alignItems: "center", textAlign: "center", mb: 3 }}
        >
          <Avatar
            src={data.profilePhotoPublicId || undefined}
            sx={{ width: 80, height: 80, fontSize: 28 }}
          >
            {fullName[0] || data.userName?.[0]}
          </Avatar>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {fullName || data.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{data.userName}
            </Typography>
          </Box>

          <Chip
            label={data.isActive ? "Active" : "Inactive"}
            color={data.isActive ? "success" : "default"}
            size="small"
            variant={data.isActive ? "filled" : "outlined"}
          />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2.5}>
          <ProfileField
            icon={<EmailOutlinedIcon fontSize="small" />}
            label="Email"
            value={data.email}
          />
          <ProfileField
            icon={<PublicOutlinedIcon fontSize="small" />}
            label="Country"
            value={data.country}
          />
          <ProfileField
            icon={<ApartmentOutlinedIcon fontSize="small" />}
            label="Department"
            value={data.department}
          />
        </Stack>
      </Paper>
    </Box>
  );
}
