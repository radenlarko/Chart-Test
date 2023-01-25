import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DataChart } from "@/utils/dataChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  dataChart: DataChart[];
  isDark?: boolean;
  colorBar?: string;
  maxWidthBar?: number;
}

const options: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    y: {
      ticks: { color: "#c4c4c4" },
      grid: {
        display: false,
      },
    },
    x: {
      ticks: { color: "#c4c4c4" },
      grid: {
        display: false,
      },
    },
  },
};

const BarChart = ({ dataChart, isDark, colorBar, maxWidthBar }: Props) => {
  const data = useMemo<ChartData<"bar">>(() => {
    const labelList = dataChart.map((item) => item.label);
    const valueList = dataChart.map((item) => item.value);
    const bgColor = isDark
      ? "rgba(255, 255, 255, 0.7)"
      : colorBar
      ? colorBar
      : "rgba(79, 209, 197, 1)";
    return {
      labels: labelList,
      datasets: [
        {
          label: "Dataset 1",
          data: valueList,
          backgroundColor: bgColor,
          maxBarThickness: maxWidthBar || 20,
          borderRadius: 8,
        },
      ],
    };
  }, [dataChart, isDark, colorBar, maxWidthBar]);

  return <Bar options={options} data={data} />;
};

export default BarChart;
