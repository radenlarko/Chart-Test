import React from "react";
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
};

const data: ChartData<"line"> = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      fill: true,
      label: "Mobile",
      data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3],
      tension: 0.3,
      pointStyle: "circle",
      pointBorderWidth: 0,
      pointBackgroundColor: "rgba(79, 209, 197, 0)",
      pointHoverBackgroundColor: "rgba(79, 209, 197, 1)",
      borderWidth: 4,
      borderColor: "rgba(79, 209, 197, 1)",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, "rgba(79, 209, 197, 0.35)");
        gradient.addColorStop(1, "rgba(79, 209, 197, 0.05)");
        return gradient;
      },
    },
  ],
};

const AreaChart2 = () => {
  return <Line options={options} data={data} />;
};

export default AreaChart2;
