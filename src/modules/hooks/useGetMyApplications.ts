import { useQuery } from "@tanstack/react-query";
import { fetchMyApplications } from "../services";

export const myApplicationsKey = (userId?: string) => [
  "myApplications",
  userId,
];

export function useGetMyApplications(userId?: string) {
  return useQuery({
    queryKey: myApplicationsKey(userId),
    queryFn: fetchMyApplications,
    enabled: !!userId,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: false,
  });
}