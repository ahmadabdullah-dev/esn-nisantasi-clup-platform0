"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import {
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
import { useGetEventById, useUpdateEvent } from "@/lib/hooks/useEvent";
import type { UpdateEventDto } from "@/lib/types/event";

interface UpdateEventProps {
  eventId: string;
  onSuccess?: () => void;
}

export default function UpdateEvent({ eventId, onSuccess }: UpdateEventProps) {
  const { data: event, isLoading: isEventLoading } = useGetEventById(eventId);
  const updateEventAsync = useUpdateEvent();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateEventDto>();

  useEffect(() => {
    if (event) {
      reset({
        planId: event.id,
        title: event.title,
        description: event.description ?? "",
        locationName: event.locationName,
        plannedAt: event.plannedAt,
      });
    }
  }, [event, reset]);

  const onSubmit = (creds: UpdateEventDto) => {
    updateEventAsync.mutate(creds);
  };

  useEffect(() => {
    if (updateEventAsync.isSuccess) {
      onSuccess?.();
    }
  }, [updateEventAsync.isSuccess, onSuccess]);

  if (isEventLoading) {
    return (
      <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Update Event
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            fullWidth
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={updateEventAsync.isPending}
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
            disabled={updateEventAsync.isPending}
          />
          <TextField
            label="Location"
            fullWidth
            {...register("locationName")}
            disabled={updateEventAsync.isPending}
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
                    disabled: updateEventAsync.isPending,
                  },
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={updateEventAsync.isPending}
          >
            {updateEventAsync.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
          {updateEventAsync.error && (
            <Alert severity="error">{updateEventAsync.error.message}</Alert>
          )}
          {updateEventAsync.isSuccess && (
            <Alert severity="success">{updateEventAsync.data}</Alert>
          )}
        </Stack>
      </Box>
    </Paper>
  );
}
