import {
  differenceInDays,
  startOfDay,
  eachDayOfInterval,
  format,
} from "date-fns";
import type { SmokeData } from "../schema/SmokeData.schema";

export type PDFStatistics = {
  totalSmokes: number;
  averagePerDay: number;
  last7DaysAverage: number;
  last30DaysAverage: number;
  bestDay: { date: string; count: number } | null;
  worstDay: { date: string; count: number } | null;
  smokingTrend: {
    direction: "increasing" | "decreasing" | "stable";
    percentage: number;
  };
  smokeFreeDays: number;
  trackingDays: number;
  dateRange: { start: string; end: string };
};

const TREND_THRESHOLD = 0.5;

const getLastInDaysData = ({
  data,
  days,
  today,
}: {
  data: SmokeData[];
  days: number;
  today: Date;
}): { lastInDaysData: SmokeData[]; averagePerDay: number } => {
  const filteredData = data.filter((smoke) => {
    const smokeDate = new Date(smoke.timestamp);
    return differenceInDays(today, smokeDate) < days;
  });

  return {
    lastInDaysData: filteredData,
    averagePerDay: days > 0 ? filteredData.length / days : 0,
  };
};

const getCountByDate = (
  data: SmokeData[],
  startDate: Date,
  endDate: Date
): Map<string, number> => {
  const dayGroups = new Map<string, number>();
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Initialize all days with 0
  allDays.forEach((day) => {
    dayGroups.set(format(startOfDay(day), "yyyy-MM-dd"), 0);
  });

  // Count smokes per day
  data.forEach((smoke) => {
    const dateKey = format(startOfDay(new Date(smoke.timestamp)), "yyyy-MM-dd");
    const currentCount = dayGroups.get(dateKey);
    if (currentCount !== undefined) {
      dayGroups.set(dateKey, currentCount + 1);
    }
  });

  return dayGroups;
};

const getSmokingTrend = ({
  data,
  last7DaysData,
  today,
}: {
  data: SmokeData[];
  last7DaysData: SmokeData[];
  today: Date;
}) => {
  const prior7Days = data.filter((smoke) => {
    const smokeDate = new Date(smoke.timestamp);
    const daysAgo = differenceInDays(today, smokeDate);
    return daysAgo >= 7 && daysAgo < 14;
  });

  let trendDirection: "increasing" | "decreasing" | "stable" = "stable";
  let trendPercentage = 0;

  if (prior7Days.length) {
    const change = last7DaysData.length - prior7Days.length;
    trendPercentage = Math.abs(Math.round((change / prior7Days.length) * 100));

    if (Math.abs(change) > TREND_THRESHOLD) {
      trendDirection = change > 0 ? "increasing" : "decreasing";
    }
  }

  return { trendDirection, trendPercentage };
};

const getBestWorstDay = (dayGroups: Map<string, number>) => {
  let bestDay: { date: string; count: number } | null = null;
  let worstDay: { date: string; count: number } | null = null;

  dayGroups.forEach((count, date) => {
    if (count > 0) {
      if (!bestDay || count < bestDay.count) {
        bestDay = { date, count };
      }
      if (!worstDay || count > worstDay.count) {
        worstDay = { date, count };
      }
    }
  });

  return { bestDay, worstDay };
};

export const calculatePDFStatistics = (
  data: SmokeData[]
): PDFStatistics | null => {
  if (!data?.length) return null;

  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const firstDate = new Date(sortedData[0].timestamp);
  const today = new Date();
  const trackingDays = differenceInDays(today, firstDate) + 1;
  const totalSmokes = data.length;
  const averagePerDay = totalSmokes / trackingDays;

  const { lastInDaysData: last7DaysData, averagePerDay: last7DaysAverage } =
    getLastInDaysData({ data, days: 7, today });

  const { averagePerDay: last30DaysAverage } = getLastInDaysData({
    data,
    days: 30,
    today,
  });

  const { trendDirection, trendPercentage } = getSmokingTrend({
    data,
    last7DaysData,
    today,
  });

  const dayGroups = getCountByDate(data, firstDate, today);
  const { bestDay, worstDay } = getBestWorstDay(dayGroups);

  const smokeFreeDays = Array.from(dayGroups.values()).filter(
    (count) => count === 0
  ).length;

  return {
    totalSmokes,
    averagePerDay: Math.round(averagePerDay * 10) / 10,
    last7DaysAverage: Math.round(last7DaysAverage * 10) / 10,
    last30DaysAverage: Math.round(last30DaysAverage * 10) / 10,
    bestDay,
    worstDay,
    smokingTrend: {
      direction: trendDirection,
      percentage: trendPercentage,
    },
    smokeFreeDays,
    trackingDays,
    dateRange: {
      start: format(firstDate, "MMM dd, yyyy"),
      end: format(today, "MMM dd, yyyy"),
    },
  };
};
