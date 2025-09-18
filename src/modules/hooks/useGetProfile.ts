import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../services";
import { UserI } from "../types/types";

export const useGetProfile = (id?: string) => {
  return useQuery<string | UserI, unknown, UserI, (string | undefined)[]>({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
    enabled: !!id,
  });
};
