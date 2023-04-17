import { useQuery } from "@tanstack/react-query";
import { fetchInitiatives } from "../services";

export const useGetInitiatives = () => {
  const res = useQuery(["Initiatives"], () => fetchInitiatives());

  return {
    ...res,
    data: Array.isArray(res?.data) ? res?.data : [],
  };
};
