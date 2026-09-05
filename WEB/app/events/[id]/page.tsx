"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Shared } from "@/lib/util";
import { useGetEventById } from "@/lib/hooks/useEvent";
import { useCurrentUser } from "@/lib/hooks/useUser";
import UpdateEvent from "@/app/(protected)/(admin)/events/update/page"; 

export default function PlanDetails() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { data: event, isLoading, error } = useGetEventById(id ?? "");
  const user = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          Invalid event link.
        </Alert>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          Something went wrong while loading the plan. Please try again.
        </Alert>
      </Container>
    );
  }

  if (isUpdating && event?.id) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <UpdateEvent
          eventId={event.id}
          onSuccess={() => setIsUpdating(false)}
        />
        <Box sx={{ mt: 2 }}>
          <Button onClick={() => setIsUpdating(false)}>Cancel</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Card sx={{ width: 1 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          {event?.hostId === user.data?.id && (
            <Box sx={{ paddingBottom: 3 }}>
              <Button variant="outlined" onClick={() => setIsUpdating(true)}>
                Update Event
              </Button>
            </Box>
          )}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
            {event?.title}
          </Typography>
          {event?.description && (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
              }}
            >
              {event.description}
            </Typography>
          )}
          <Stack spacing={1} sx={{ mb: event?.locationName ? 2 : 0 }}>
            {event?.locationName && (
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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
                  {event.locationName}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <CalendarMonthOutlinedIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {Shared.formatDate(event?.plannedAt) ?? "Date not set"}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
