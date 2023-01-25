import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ActiveElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { mySum } from "@/utils/myFunction";
import { myNumberFormat } from "@/utils/myFormat";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import { DataChart } from "@/utils/dataChart";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  dataChart: DataChart[];
  customInfoCenter?: React.ReactNode;
  labelColorCenter?: string;
  valueColorCenter?: string;
}

const DonutChart = ({
  dataChart,
  customInfoCenter,
  labelColorCenter,
  valueColorCenter,
}: Props) => {
  const [dataCenter, setDataCenter] = useState({
    label: "",
    value: 0,
  });

  const textColor = useColorModeValue("#4A5568", "#CBD5E0");
  const strokeColor = useColorModeValue("white", "#171923");
  const labelColor = useColorModeValue(
    labelColorCenter || "gray.400",
    labelColorCenter || "gray.500"
  );

  const chartRef =
    useRef<ChartJSOrUndefined<"doughnut", number[], unknown>>(null);

  const data = useMemo<ChartData<"doughnut">>(() => {
    const labelList = dataChart.map((item) => item.label);
    const valueList = dataChart.map((item) => item.value);
    const colorList = dataChart.map((item) => {
      if (item.color) {
        return item.color;
      }

      return "white";
    });
    return {
      labels: labelList,
      datasets: [
        {
          label: "# of Votes",
          data: valueList,
          backgroundColor: colorList,
          borderColor: [strokeColor],
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    };
  }, [dataChart, strokeColor]);

  const handleSetInfo = useCallback(
    (elements: ActiveElement[]) => {
      if (elements.length === 0) {
        return;
      }

      const idx = elements[0].index;
      const dataSet = dataChart[idx];

      setDataCenter({
        label: dataSet.label,
        value: dataSet.value,
      });
    },
    [dataChart]
  );

  const options = useMemo<ChartOptions<"doughnut">>(() => {
    return {
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
            color: textColor
          },
        },
      },
      onClick: (_, elements) => handleSetInfo(elements),
    };
  }, [handleSetInfo, textColor]);

  // const plugins = useMemo<Plugin<"doughnut">[]>(() => {
  //   return [
  //     {
  //       id: "label",
  //       beforeDraw: function (chart) {
  //         var width = chart.width,
  //           height = chart.height,
  //           ctx = chart.ctx;

  //         ctx.restore();
  //         var fontSize = (height / 280).toFixed(2);
  //         ctx.font = fontSize + "em sans-serif";
  //         ctx.textBaseline = "middle";
  //         ctx.fillStyle = "#c4c4c4";

  //         var text = dataCenter.label,
  //           textX = Math.round((width - ctx.measureText(text).width) / 2),
  //           textY = height / 2.4;

  //         ctx.fillText(text, textX, textY);
  //         ctx.save();
  //       },
  //     },
  //     {
  //       id: "total",
  //       beforeDraw: function (chart) {
  //         const width = chart.width,
  //           height = chart.height,
  //           ctx = chart.ctx;

  //         ctx.restore();
  //         const fontSize = (height / 200).toFixed(2);
  //         ctx.font = "600 " + fontSize + "em sans-serif";
  //         ctx.textBaseline = "middle";
  //         ctx.fillStyle = "#4a4a4a";

  //         const text = myNumberFormat(dataCenter.value),
  //           textX = Math.round((width - ctx.measureText(text).width) / 2),
  //           textY = height / 2;

  //         ctx.fillText(text, textX, textY);
  //         ctx.save();
  //       },
  //     },
  //   ];
  // }, [dataCenter]);

  useEffect(() => {
    const total = mySum(dataChart.map((item) => item.value));
    setDataCenter({
      label: "Total",
      value: total,
    });
  }, [dataChart]);

  const charWidth = chartRef.current?.width || 0;

  return (
    <Box position="relative">
      <Doughnut ref={chartRef} data={data} options={options} />
      <Flex
        position="absolute"
        top={{ base: charWidth / 6.4, md: charWidth / 5.4 }}
        right={{ base: charWidth / 2.85, md: charWidth / 3.25 }}
        direction="column"
        alignItems="center"
        justifyContent="center"
        w={{ base: charWidth / 3.4, md: charWidth / 2.6 }}
        h={{ base: charWidth / 3.4, md: charWidth / 2.6 }}
        borderRadius="full"
      >
        {customInfoCenter ? (
          customInfoCenter
        ) : (
          <Box textAlign="center" mt={{ base: -4, md: -2 }}>
            <Text
              title={dataCenter.label}
              color={labelColor}
              fontSize={{ base: "md", md: "lg" }}
              noOfLines={1}
            >
              {dataCenter.label}
            </Text>
            <Text
              title={myNumberFormat(dataCenter.value)}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight={500}
              noOfLines={1}
              color={valueColorCenter}
            >
              {myNumberFormat(dataCenter.value)}
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default DonutChart;
