import Head from "next/head";
import {
  Box,
  Grid,
  HStack,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AreaChart2 from "@/components/AreaChart2";
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";
import ColorModeToggle from "@/components/ColorModeToggle";
import { useEffect, useState } from "react";
import dataCharts, { DataChart } from "@/utils/dataChart";
import GridItemCard from "@/components/GridItemCard";

const tahun = new Date().getFullYear();

export default function Home() {
  const [selectedData, setSelectedData] = useState<DataChart[]>([]);
  const [selectYear, setSelectYear] = useState(tahun);

  useEffect(() => {
    const getCurrentData = () => {
      if (!selectYear) {
        return;
      }

      const filtered = dataCharts.filter((item) => item.label === selectYear);

      if (filtered.length === 0) {
        console.log("no data match");
        return;
      }

      setSelectedData(filtered[0].data);
    };

    getCurrentData();
  }, [selectYear]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box bg={useColorModeValue("gray.50", "blackAlpha.700")}>
          <Box
            position="fixed"
            top={0}
            w="full"
            backdropFilter="blur(21px)"
            transitionDelay="0s, 0s, 0s, 0s"
            transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
            transition-property="box-shadow, background-color, filter, border"
            transitionTimingFunction="linear, linear, linear, linear"
            zIndex="96"
          >
            <HStack
              minH="75px"
              maxW={"7xl"}
              mx="auto"
              px={2}
              justifyContent="space-between"
            >
              <Box>
                <Select
                  placeholder="Select option"
                  value={selectYear}
                  onChange={(val) => setSelectYear(Number(val.target.value))}
                >
                  <option value={tahun - 1}>Data {tahun - 1}</option>
                  <option value={tahun}>Data {tahun}</option>
                </Select>
              </Box>
              <ColorModeToggle />
            </HStack>
          </Box>
          <Box
            maxW={"7xl"}
            minH={"100vh"}
            mx="auto"
            pt="80px"
            px={{ base: 2, md: 8 }}
            pb={{ base: 2, md: 8 }}
          >
            <Grid
              minH={"200px"}
              templateRows={{ base: "repeat(4, auto)", lg: "repeat(3, auto)" }}
              templateColumns="repeat(5, 1fr)"
              gap={4}
            >
              <GridItemCard colSpan={{ base: 5, lg: 2 }}>
                <DonutChart dataChart={selectedData} />
              </GridItemCard>
              <GridItemCard colSpan={{ base: 5, lg: 3 }}>
                <AreaChart2
                  dataChart={selectedData}
                  rgbColor={[200, 75, 142]}
                />
              </GridItemCard>
              <GridItemCard colSpan={5}>
                <BarChart />
              </GridItemCard>
              <GridItemCard colSpan={5} isDark>
                <Text>4</Text>
                <pre>
                  <code>{JSON.stringify(selectedData, null, 2)}</code>
                </pre>
              </GridItemCard>
            </Grid>
          </Box>
        </Box>
      </main>
    </>
  );
}
