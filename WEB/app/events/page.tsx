"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PaginationParams } from "../../lib/types/common";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Shared } from "@/lib/util";
import BoltIcon from "@mui/icons-material/Bolt";
import { useGetEventsAsync } from "@/lib/hooks/useEvent";

export default function Events() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 9,
  });
  const getEventsAsync = useGetEventsAsync(pagination);
  const router = useRouter();

  if (getEventsAsync.isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Skeleton variant="text" width={160} height={56} sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (getEventsAsync.isError || !getEventsAsync.data) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          Something went wrong while loading plans. Please try again.
        </Alert>
      </Container>
    );
  }

  const list = getEventsAsync.data;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Plans
      </Typography>

      {list.items.length === 0 ? (
        <Alert severity="info" variant="outlined">
          No plans found.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {list.items.map((p) => (
            <Grid key={p.id ?? p.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 0.5 }}
                  >
                    {p.title}
                  </Typography>

                  {p.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        mb: 2,
                      }}
                    >
                      {p.description}
                    </Typography>
                  )}

                  <Stack spacing={1} >
                    {p.locationName && (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <PlaceOutlinedIcon
                          fontSize="small"
                          sx={{ color: "text.secondary" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.locationName}
                        </Typography>
                      </Stack>
                    )}

                    <Stack
                      direction="row"
                      sx={{ alignItems: "center" }}
                      spacing={1}
                    >
                      <CalendarMonthOutlinedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {Shared.formatDate(p.plannedAt) ?? "Date not set"}
                      </Typography>
                    </Stack>
                  </Stack>

                
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    endIcon={<BoltIcon />}
                    onClick={() => router.push(`/events/${p.id}`)}
                  >
                    Details...
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
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
