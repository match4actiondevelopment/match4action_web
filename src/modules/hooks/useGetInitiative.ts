import { useQuery } from "@tanstack/react-query";
import { fetchInitiative } from "../services";
export const useGetInitiative = (id?: string) =>
  useQuery(["initiative", id], () => fetchInitiative(id), { enabled: !!id });