import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QueryKey } from "../queryKey";
import type { SmokeData } from "../../schema/SmokeData.schema";
import { queryClient } from "../query";

const SmokeDataLocalStorageKey = "localSmokeData";

export const useQuerySmokeData = (): UseQueryResult<SmokeData[]> => {
  return useQuery({
    queryKey: [QueryKey.SmokeData],
    queryFn: async () => {
      const data = localStorage.getItem(SmokeDataLocalStorageKey);
      try {
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error("Error parsing smoke data:", error);
        return [];
      }
    },
  });
};

export const useAddSmokeData = () => {
  return useMutation({
    mutationFn: async (data: SmokeData) => {
      const existingData = localStorage.getItem(SmokeDataLocalStorageKey);
      try {
        const updatedData = existingData
          ? [...JSON.parse(existingData), data]
          : [data];
        localStorage.setItem(
          SmokeDataLocalStorageKey,
          JSON.stringify(updatedData)
        );
        queryClient.invalidateQueries({ queryKey: [QueryKey.SmokeData] });
      } catch (error) {
        console.error("Error adding smoke data:", error);
      }
    },
  });
};
