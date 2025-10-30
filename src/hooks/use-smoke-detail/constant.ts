import {
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
} from "date-fns";

export const DateFilters = {
  "1D": { fn: isToday, label: "1D" },
  YTD: { fn: isYesterday, label: "YTD" },
  "1W": { fn: isThisWeek, label: "1W" },
  "1M": { fn: isThisMonth, label: "1M" },
  "1Y": { fn: isThisYear, label: "1Y" },
  ALL: { fn: () => true, label: "ALL" },
};
