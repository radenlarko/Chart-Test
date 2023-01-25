import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DataChart } from "@/utils/dataChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
    tooltip: {
      usePointStyle: true,
      padding: 12,
      titleMarginBottom: 10,
      bodySpacing: 8,
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    y: {
      ticks: { color: "#c4c4c4" },
    },
    x: {
      ticks: { color: "#c4c4c4" },
      grid: {
        display: false,
      },
    },
  },
};

interface Props {
  dataChart: DataChart[];
  rgbColor?: number[];
}

const AreaChart2 = ({ dataChart, rgbColor }: Props) => {
  const data = useMemo<ChartData<"line">>(() => {
    const labelList = dataChart.map((item) => item.label);
    const valueList = dataChart.map((item) => item.value);

    const newRGB = rgbColor ? rgbColor.join() : "79, 209, 197";
    return {
      labels: labelList,
      datasets: [
        {
          fill: true,
          label: "Mobile",
          data: valueList,
          tension: 0.3,
          pointStyle: "circle",
          pointBorderWidth: 0,
          pointBackgroundColor: `rgba(${newRGB}, 0)`,
          pointHoverBackgroundColor: `rgba(${newRGB}, 1)`,
          borderWidth: 4,
          borderColor: `rgba(${newRGB}, 1)`,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 500);
            gradient.addColorStop(0, `rgba(${newRGB}, 0.35)`);
            gradient.addColorStop(1, `rgba(${newRGB}, 0.05)`);
            return gradient;
          },
        },
      ],
    };
  }, [dataChart, rgbColor]);
  return <Line options={options} data={data} />;
};

export default AreaChart2;
