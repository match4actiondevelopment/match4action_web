import { useQuery } from "@tanstack/react-query";
import { fetchGoals } from "../services";

export const useGetGoals = () => {
  const { data, isFetched, isLoading } = useQuery(
    ["goals"],
    () => fetchGoals(),
    {
      staleTime: 10000,
    }
  );

  return { data: Array.isArray(data) ? data : [], isFetched, isLoading };
};
