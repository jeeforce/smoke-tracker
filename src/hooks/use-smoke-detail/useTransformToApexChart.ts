import type { SmokeData } from "../../schema/SmokeData.schema";
import type { DateFilters } from "./constant";
import {
  format,
  startOfHour,
  startOfDay,
  startOfMonth,
  eachHourOfInterval,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from "date-fns";

/*
    Day: Split by hour (0-23)
    Week: Split by day (Mon-Sun)
    Month: Split by Week (Week 1-5)
    Year: Split by Month (Jan-Dec)
*/

export const useTransformToApexChart = (
  data: SmokeData[],
  filter: keyof typeof DateFilters
): { series: ApexAxisChartSeries; categories: string[] } => {
  const now = new Date();
  let categories: string[] = [];
  const groupedData: Record<string, number> = {};

  // Initialize all possible time slots with 0
  switch (filter) {
    case "1D": {
      const hours = eachHourOfInterval({
        start: startOfDay(now),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23),
      });
      categories = hours.map((hour) => format(hour, "ha"));
      categories.forEach((cat) => (groupedData[cat] = 0));
      break;
    }
    case "1W": {
      const days = eachDayOfInterval({
        start: startOfWeek(now),
        end: endOfWeek(now),
      });
      categories = days.map((day) => format(day, "EEE"));
      categories.forEach((cat) => (groupedData[cat] = 0));
      break;
    }
    case "1M": {
      categories = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
      categories.forEach((cat) => (groupedData[cat] = 0));
      break;
    }
    case "1Y": {
      const months = eachMonthOfInterval({
        start: startOfYear(now),
        end: endOfYear(now),
      });
      categories = months.map((month) => format(month, "MMM"));
      categories.forEach((cat) => (groupedData[cat] = 0));
      break;
    }
    case "ALL": {
      break;
    }
  }

  data.forEach((smoke) => {
    const date = new Date(smoke.timestamp);
    let key: string;

    switch (filter) {
      case "1D": {
        key = format(startOfHour(date), "ha");
        break;
      }
      case "1W": {
        key = format(startOfDay(date), "EEE");
        break;
      }
      case "1M": {
        const weekNum = Math.ceil(date.getDate() / 7);
        key = `Week ${weekNum}`;
        break;
      }
      case "1Y": {
        key = format(startOfMonth(date), "MMM");
        break;
      }
      case "ALL": {
        key = format(startOfMonth(date), "MMM yyyy");
        break;
      }
      default:
        key = format(startOfDay(date), "MMM d");
    }

    groupedData[key] = (groupedData[key] || 0) + 1;
  });

  if (filter === "ALL") {
    categories = Object.keys(groupedData).sort();
  }

  const values = categories.map((category) => groupedData[category] || 0);

  return {
    series: [
      {
        name: "Cigarettes",
        data: values,
      },
    ],
    categories,
  };
};
