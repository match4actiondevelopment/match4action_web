import { useQuery } from "@tanstack/react-query";
import { fetchInitiatives } from "../services";

export const useGetInitiatives = (filters?: { country?: string; city?: string; location?: string; search?: string }) => {
  const res = useQuery(
    ["Initiatives", filters],
    () => fetchInitiatives(filters),
    {
      // Keep previous data while fetching new data
      keepPreviousData: true,
    }
  );

  return {
    ...res,
    data: Array.isArray(res?.data) ? res?.data : [],
  };
};
