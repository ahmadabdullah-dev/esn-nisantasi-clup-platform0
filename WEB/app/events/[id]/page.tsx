"use client";

import { useParams } from "next/navigation";
import {
  Alert,
  Box,
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

export default function PlanDetails() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { data: plan, isLoading, error } = useGetEventById(id ?? "");


  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          Invalid plan link.
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

  return (
    <Container sx={{ py: 8 }}>
      <Card sx={{ width: 1 }}>
        <CardContent sx={{ flexGrow: 1 }}>
      
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
            {plan?.title}
          </Typography>
          {plan?.description && (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
              }}
            >
              {plan.description}
            </Typography>
          )}
          <Stack spacing={1} sx={{ mb: plan?.locationName ? 2 : 0 }}>
            {plan?.locationName && (
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
                  {plan.locationName}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <CalendarMonthOutlinedIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {Shared.formatDate(plan?.plannedAt) ?? "Date not set"}
              </Typography>
            </Stack>
          </Stack>
         
          
        </CardContent>
      </Card>
    </Container>
  );
}
