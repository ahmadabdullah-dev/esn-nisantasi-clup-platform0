"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useAddEventAsync } from "@/lib/hooks/useEvent";
import { AddEventDto } from "@/lib/types/event";

export default function AddEvent() {
  const addEventAsync = useAddEventAsync();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddEventDto>();

  const onSubmit = (creds: AddEventDto) => {
    addEventAsync.mutate(creds);
  };

  useEffect(() => {
    if (addEventAsync.isSuccess) {
      const timeout = setTimeout(() => {
        router.push("/events");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [addEventAsync.isSuccess, router]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Add an event
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Title"
                fullWidth
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
                disabled={addEventAsync.isPending}
              />
              <TextField
                label="Description"
                fullWidth
                {...register("description", {
                  required: "Description is required",
                })}
                multiline
                minRows={5}
                error={!!errors.description}
                helperText={errors.description?.message}
                disabled={addEventAsync.isPending}
              />
              <TextField
                label="Location"
                fullWidth
                {...register("locationName")}
                disabled={addEventAsync.isPending}
              />

              <Controller
                name="plannedAt"
                control={control}
                rules={{ required: "Date and time are required" }}
                render={({ field, fieldState }) => (
                  <DateTimePicker
                    label="Planned Date & Time"
                    value={field.value ? dayjs(field.value as string) : null}
                    onChange={(newValue) =>
                      field.onChange(newValue ? newValue.toISOString() : "")
                    }
                    minDateTime={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        disabled: addEventAsync.isPending,
                      },
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={addEventAsync.isPending}
              >
                {addEventAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add"
                )}
              </Button>
              {addEventAsync.error && (
                <Alert severity="error">{addEventAsync.error.message}</Alert>
              )}
              {addEventAsync.isSuccess && (
                <Alert severity="success">{addEventAsync.data}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
