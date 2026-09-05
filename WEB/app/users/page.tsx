"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PaginationParams } from "../../lib/types/common";
import {
  Alert,
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useGetUsersAsync } from "@/lib/hooks/useUser";

export default function Users() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 9,
  });
  const getUsersAsync = useGetUsersAsync(pagination);
  const router = useRouter();

  if (getUsersAsync.isLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Skeleton variant="text" width={160} height={56} sx={{ mb: 4 }} />
        <Stack spacing={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={72} />
          ))}
        </Stack>
      </Container>
    );
  }

  if (getUsersAsync.isError || !getUsersAsync.data) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          Something went wrong while loading users. Please try again.
        </Alert>
      </Container>
    );
  }

  const list = getUsersAsync.data;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Users
      </Typography>

      {list.items.length === 0 ? (
        <Alert severity="info" variant="outlined">
          No users found.
        </Alert>
      ) : (
        <List
          disablePadding
          sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
        >
          {list.items.map((p, i) => (
            <Box key={p.id ?? p.firstName}>
              <ListItem
                disablePadding
                secondaryAction={
                  <ChevronRightIcon sx={{ color: "text.secondary" }} />
                }
              >
                <ListItemButton
                  onClick={() => router.push(`/users/${p.userName}`)}
                  sx={{ py: 1.5 }}
                >
                  <ListItemAvatar>
                    <Avatar src={p.profilePhotoPublicId ?? undefined}>
                      {!p.profilePhotoPublicId && p.firstName?.[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${p.firstName} ${p.lastName}`}
                  />
                </ListItemButton>
              </ListItem>
              {i < list.items.length - 1 && <Divider component="li" />}
            </Box>
          ))}
        </List>
      )}

      {list.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={list.totalPages}
            page={list.currentPage}
            onChange={(_, page) => setPagination((p) => ({ ...p, page }))}
          />
        </Box>
      )}
    </Container>
  );
}
