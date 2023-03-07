import { useQuery } from "@tanstack/react-query";
import { fetchOpportunity } from "../services";

export const useGetOpportunity = (id?: string) => {
  const { data, isFetched, isLoading } = useQuery(
    ["opportunity", id],
    () => fetchOpportunity(id),
    {
      enabled: !!id,
    }
  );

  return { data, isFetched, isLoading };
};
