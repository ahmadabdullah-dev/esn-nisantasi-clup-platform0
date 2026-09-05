export interface EventDto {
  id: string;
  hostId: string;
  title: string;
  description: string | null;
  locationName: string;
  plannedAt: string;
}
export type AddEventDto = {
  title: string;
  locationName: string;
  description: string;
  plannedAt: string;
};