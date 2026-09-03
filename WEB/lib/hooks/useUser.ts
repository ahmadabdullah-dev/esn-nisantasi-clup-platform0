import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { CurrentUserMetaDataDto, UserDto } from "../types/user";

export const useCurrentUser = () =>
  useQuery<CurrentUserMetaDataDto>({
    queryKey: ["currentUser"],
    queryFn: () => agent.get<CurrentUserMetaDataDto>("/User/current-user").then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
  });

export const useGetUserByUsername = (userName: string) =>
  useQuery<UserDto>({
    queryKey: ["user", userName],
    queryFn: () => agent.get<UserDto>(`/User/user-by-username/${encodeURIComponent(userName)}`).then((res) => res.data),
    enabled: !!userName,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
