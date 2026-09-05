export interface EventDto {
  id: string;
  hostId: string;
  title: string;
  description: string | null;
  locationName: string;
  plannedAt: string;
}
