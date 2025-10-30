import { differenceInDays } from "date-fns";
import { useQuerySmokeData } from "../../query/smoke-data/useQuerySmokeData";
import { DateFilters } from "./constant";

export const useSmokeDetail = () => {
  const { data, isLoading, error } = useQuerySmokeData();

  const getFilteredDataByFilter = (filter: keyof typeof DateFilters) => {
    if (!data) return [];

    const filterFn = DateFilters[filter].fn;
    return data.filter((smokeData) => filterFn(new Date(smokeData.timestamp)));
  };

  const getDaysSinceLastSmoke = () => {
    if (!data || data.length === 0) return null;

    // Sort by timestamp to get the most recent smoke
    const sortedData = [...data].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const lastSmokeDate = new Date(sortedData[0].timestamp);
    const today = new Date();

    return differenceInDays(today, lastSmokeDate);
  };

  const getSmokeReductionStat = () => {
    const yesterdaySmokeCount = getFilteredDataByFilter("YTD").length;

    if (!yesterdaySmokeCount) return null;

    const todaySmokeCount = getFilteredDataByFilter("1D").length;

    return yesterdaySmokeCount - todaySmokeCount;
  };

  return {
    isLoading,
    error,
    getFilteredDataByFilter,
    getDaysSinceLastSmoke,
    getSmokeReductionStat,
  };
};
