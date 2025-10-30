import type { ApexOptions } from "apexcharts";
import type { FC } from "react";
import ReactApexChart from "react-apexcharts";

type HistoryGraphProps = {
  series: ApexAxisChartSeries;
  categories: string[];
};

export const HistoryGraph: FC<HistoryGraphProps> = ({ series, categories }) => {
  const minWidth = Math.max(categories.length * 40, 300);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
        borderRadius: 4,
      },
    },
    colors: ["#3b82f6"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: 0,
        style: {
          colors: "#6b7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "12px",
        },
      },
      title: {
        text: "Cigarettes",
        style: {
          color: "#6b7280",
          fontSize: "14px",
        },
      },
      floating: false,
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
      padding: {
        left: 10,
        right: 10,
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `${val} cigarette${val !== 1 ? "s" : ""}`,
      },
    },
  };

  return (
    <div className='w-full h-full overflow-x-auto overflow-y-hidden'>
      <div style={{ minWidth: `${minWidth}px`, height: "100%" }}>
        <ReactApexChart
          options={options}
          series={series}
          type='bar'
          height='100%'
          width='100%'
        />
      </div>
    </div>
  );
};
