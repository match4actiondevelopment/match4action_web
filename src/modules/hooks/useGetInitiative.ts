import { useQuery } from "@tanstack/react-query";
import { fetchInitiative } from "../services";

export const useGetInitiative = (id?: string) => {
  const { data, isFetched, isLoading } = useQuery(
    ["initiative", id],
    () => fetchInitiative(id),
    {
      enabled: !!id,
    }
  );

  return { data, isFetched, isLoading };
};
