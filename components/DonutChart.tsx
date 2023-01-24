import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Plugin,
  ActiveElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { mySum } from "@/utils/myFunction";
import { myNumberFormat } from "@/utils/myFormat";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataChart = [
  {
    label: "Red",
    value: 12,
  },
  {
    label: "Blue",
    value: 19,
  },
  {
    label: "Yellow",
    value: 3,
  },
  {
    label: "Green",
    value: 5,
  },
  {
    label: "Purple",
    value: 2,
  },
  {
    label: "Orange",
    value: 3,
  },
];

const DonutChart = () => {
  const [dataCenter, setDataCenter] = useState({
    label: "",
    value: 0,
  });

  const data = useMemo<ChartData<"doughnut">>(() => {
    const labelList = dataChart.map((item) => item.label);
    const valueList = dataChart.map((item) => item.value);
    return {
      labels: labelList,
      datasets: [
        {
          label: "# of Votes",
          data: valueList,
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
  }, []);

  const handleSetInfo = useCallback((elements: ActiveElement[]) => {
    if (elements.length === 0) {
      return;
    }

    const idx = elements[0].index;
    const dataSet = dataChart[idx];

    setDataCenter({
      label: dataSet.label,
      value: dataSet.value,
    });
  }, []);

  const options = useMemo<ChartOptions<"doughnut">>(() => {
    return {
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
      onClick: (_, elements) => handleSetInfo(elements),
    };
  }, [handleSetInfo]);

  const plugins = useMemo<Plugin<"doughnut">[]>(() => {
    return [
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

          var text = dataCenter.label,
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

          const text = myNumberFormat(dataCenter.value),
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ];
  }, [dataCenter]);

  useEffect(() => {
    const total = mySum(dataChart.map((item) => item.value));
    setDataCenter({
      label: "Total",
      value: total,
    });
  }, []);

  return dataCenter.value === 0 ? null : (
    <>
      <pre>
        <code>{JSON.stringify(dataCenter, null, 2)}</code>
      </pre>
      <Doughnut data={data} options={options} plugins={plugins} />
    </>
  );
};

export default DonutChart;
