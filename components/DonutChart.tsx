import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
      },
    },
  },
};

const data: ChartData<"doughnut"> = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const plugins: Plugin<"doughnut">[] = [
  {
    id: "label",
    beforeDraw: function (chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

      ctx.restore();
      var fontSize = (height / 280).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#c4c4c4";

      var text = "Total",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2.4;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
  {
    id: "total",
    beforeDraw: function (chart) {
      const width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

      ctx.restore();
      const fontSize = (height / 200).toFixed(2);
      ctx.font = "600 " + fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#4a4a4a";

      const text = "2500",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];

const DonutChart = () => {
  return <Doughnut data={data} options={options} plugins={plugins} />;
};

export default DonutChart;
