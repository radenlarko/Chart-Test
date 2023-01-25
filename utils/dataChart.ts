interface DataChart {
  label: string;
  value: number;
  color: string;
}

interface DataCharts {
  label: string;
  data: DataChart[];
}

const data2022: DataChart[] = [
  {
    label: "January",
    value: 100,
    color: "#085d85",
  },
  {
    label: "February",
    value: 400,
    color: "#efde5b",
  },
  {
    label: "March",
    value: 200,
    color: "#398967",
  },
  {
    label: "April",
    value: 300,
    color: "#c84b8e",
  },
  {
    label: "May",
    value: 700,
    color: "#f9b2b3",
  },
  {
    label: "June",
    value: 400,
    color: "#9b6140",
  },
  {
    label: "July",
    value: 600,
    color: "#a43c39",
  },
  {
    label: "August",
    value: 250,
    color: "#292d50",
  },
  {
    label: "September",
    value: 600,
    color: "#627b8c",
  },
  {
    label: "October",
    value: 500,
    color: "#efde5b",
  },
  {
    label: "November",
    value: 450,
    color: "#c84b8e",
  },
  {
    label: "December",
    value: 650,
    color: "#a43c39",
  },
];

const data2023: DataChart[] = [
  {
    label: "January",
    value: 72,
    color: "#085d85",
  },
  {
    label: "February",
    value: 0,
    color: "#efde5b",
  },
  {
    label: "March",
    value: 0,
    color: "#398967",
  },
  {
    label: "April",
    value: 0,
    color: "#c84b8e",
  },
  {
    label: "May",
    value: 0,
    color: "#f9b2b3",
  },
  {
    label: "June",
    value: 0,
    color: "#9b6140",
  },
  {
    label: "July",
    value: 0,
    color: "#a43c39",
  },
  {
    label: "August",
    value: 0,
    color: "#292d50",
  },
  {
    label: "September",
    value: 0,
    color: "#627b8c",
  },
  {
    label: "October",
    value: 0,
    color: "#efde5b",
  },
  {
    label: "November",
    value: 0,
    color: "#c84b8e",
  },
  {
    label: "December",
    value: 0,
    color: "#a43c39",
  },
];

const dataCharts: DataCharts[] = [
  {
    label: "2022",
    data: data2022,
  },
  {
    label: "2023",
    data: data2023,
  },
];

export default dataCharts;
