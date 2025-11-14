import { HistoryGraph } from "../HistoryGraph";
import {
  Card,
  StatCard,
  LoadingSpinner,
  ErrorMessage,
  EmptyData,
} from "../../ui";
import { useSmokeDetail } from "../../hooks/use-smoke-detail/useSmokeDetail";
import { useState } from "react";
import { DateFilters } from "../../hooks/use-smoke-detail/constant";
import { useTransformToApexChart } from "../../hooks/use-smoke-detail/useTransformToApexChart";
import { useGeneratePDF } from "../../hooks/useGeneratePDF";
import { FileDown } from "lucide-react";

const HistoryFilterOptions = Object.keys(DateFilters)
  .filter((key) => ["1D", "1W", "1M", "1Y", "ALL"].includes(key))
  .map((key) => ({
    value: key,
    label: DateFilters[key as keyof typeof DateFilters].label,
  }));

export const SmokeDetail = () => {
  const [historyTimeFrame, setHistoryTimeFrame] =
    useState<keyof typeof DateFilters>("1D");

  const {
    data: smokeData,
    isLoading,
    error,
    hasData,
    getFilteredDataByFilter,
    getDaysSinceLastSmoke,
    getSmokeReductionStat,
  } = useSmokeDetail();
  const historyData = useTransformToApexChart(
    getFilteredDataByFilter(historyTimeFrame),
    historyTimeFrame
  );
  const {
    generatePDF,
    isGenerating,
    error: pdfError,
  } = useGeneratePDF(smokeData);

  switch (true) {
    case isLoading:
      return <LoadingSpinner />;
    case !!error:
      return (
        <ErrorMessage
          message={
            "An error occurred while fetching data. Please try again later."
          }
        />
      );
    case !hasData:
      return (
        <Card className='h-full'>
          <EmptyData />
        </Card>
      );
    default: {
      const todaySmokeCount = getFilteredDataByFilter("1D").length;
      const daysSinceLastSmoke = getDaysSinceLastSmoke();
      const smokeReductionStat = getSmokeReductionStat();
      return (
        <div className='overflow-y-auto flex-1 [scrollbar-gutter:stable] flex flex-col'>
          <Card className='mb-6 md:mb-8 shrink-0'>
            <h2 className='text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6'>
              Stats
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-4  gap-4 md:gap-6 mb-6 md:mb-8'>
              <StatCard value={todaySmokeCount} label='Cigarettes Today' />
              <StatCard value={daysSinceLastSmoke} label='Days Smoke-Free' />
              {smokeReductionStat ? (
                <StatCard
                  value={Math.abs(smokeReductionStat)}
                  label={`${
                    smokeReductionStat > 0 ? "reduced" : "increased"
                  } from yesterday`}
                />
              ) : null}
            </div>
          </Card>

          <Card className='flex-1 flex flex-col'>
            <div className='flex items-center justify-between flex-wrap gap-4 mb-4 md:mb-6'>
              <h2 className='text-lg md:text-xl font-semibold text-gray-900'>
                History
              </h2>

              <div className='flex items-center gap-2 md:gap-3'>
                <button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className='flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-sm md:text-base'
                  title='Download PDF Report'
                >
                  <FileDown className='w-4 h-4 md:w-5 md:h-5' />
                  <span className='hidden sm:inline'>
                    {isGenerating ? "Generating..." : "Report"}
                  </span>
                </button>

                <select
                  value={historyTimeFrame}
                  onChange={(e) =>
                    setHistoryTimeFrame(
                      e.target.value as keyof typeof DateFilters
                    )
                  }
                  className='px-4 py-2 md:px-6 md:py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {HistoryFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {pdfError && (
              <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm'>
                {pdfError}
              </div>
            )}

            <div className='flex-1 min-h-0 overflow-hidden'>
              <HistoryGraph
                series={historyData.series}
                categories={historyData.categories}
              />
            </div>
          </Card>
        </div>
      );
    }
  }
};
