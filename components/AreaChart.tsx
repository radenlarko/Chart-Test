import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const data: ChartData<"line"> = {
  labels: ["January", "February", "March", "April", "May", "Jun", "Jul"],
  datasets: [
    {
      data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3],
    },
  ],
};

const options: ChartOptions<"line"> = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.2,
      borderWidth: 2,
      borderColor: "rgba(47, 97, 68, 1)",
      fill: "start",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(250,174,50,1)");
        gradient.addColorStop(1, "rgba(250,174,50,0.1)");
        return gradient;
      },
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    },
  },
};

const AreaChart = () => {
  return <Line data={data} width={100} height={40} options={options} />;
};

export default AreaChart;
