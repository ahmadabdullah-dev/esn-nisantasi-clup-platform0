import { useQuery } from "@tanstack/react-query";
import { PaginatedList, PaginationParams } from "../types/common";
import { EventDto } from "../types/event";
import agent from "../api/agent";

export const useGetEventsAsync = (pagination?: PaginationParams) => {
    return useQuery({
    queryKey: ["events", pagination?.page, pagination?.pageSize],
    queryFn: async () =>
      await agent
        .get<PaginatedList<EventDto>>("/Event/paged", { params: pagination })
        .then((res) => res.data),
    enabled: !!pagination,
    staleTime: 5 * 60 * 1000,
  });
};