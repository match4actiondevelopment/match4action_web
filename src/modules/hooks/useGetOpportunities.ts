import { useQuery } from "@tanstack/react-query";
import { fetchOpportunities } from "../services";

export const useGetOpportunities = () => {
  const res = useQuery(["opportunities"], () => fetchOpportunities());

  return {
    ...res,
    data: Array.isArray(res?.data) ? res?.data : [],
  };
};
