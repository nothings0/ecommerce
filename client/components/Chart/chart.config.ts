import { IDoughnutChart, ILineChart } from "@/type";

type ColorType = {
  default: {
    primary: string;
    info: string;
    danger: string;
  };
};
export const chartColors: ColorType = {
  default: {
    primary: "#00D1B2",
    info: "#209CEE",
    danger: "#FF3860",
  },
};
export const backgroudColors: ColorType = {
  default: {
    primary: "#00D1B233",
    info: "#209CEE33",
    danger: "#FF386033",
  },
};

const randomLineChartData = (n: number) => {
  const data = [];

  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 200));
  }

  return data;
};
const randomDoughnutChartData = (n: number) => {
  const data = [];
  let percent = 100;
  for (let i = 0; i < n - 1; i++) {
    const tmp = Math.round(Math.random() * percent);
    data.push(tmp);
    percent = percent - tmp;
  }
  data.push(percent);
  return data;
};

const datasetObjectLineChart = (
  color: "primary" | "info" | "danger",
  points: number,
  isFill: boolean
) => {
  return {
    label: color,
    fill: isFill,
    borderColor: chartColors.default[color],
    backgroundColor: backgroudColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: randomLineChartData(points),
    tension: 0.5,
  };
};

export const sampleLineChartData = (points = 12): ILineChart => {
  const labels = [];

  for (let i = 1; i <= points; i++) {
    labels.push(`Tháng ${i}`);
  }

  return {
    labels,
    datasets: [
      datasetObjectLineChart("primary", points, false),
      datasetObjectLineChart("danger", points, false),
    ],
  };
};
export const sampleLineChartDataOrder = (points = 7): ILineChart => {
  const labels = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return {
    labels,
    datasets: [datasetObjectLineChart("primary", points, true)],
  };
};

const datasetObjectDoughnutChart = (
  color_1: "primary" | "info" | "danger",
  color_2: "primary" | "info" | "danger",
  points: number
) => {
  return {
    backgroundColor: [
      chartColors.default[color_1],
      chartColors.default[color_2],
    ],
    data: randomDoughnutChartData(points),
    borderColor: [chartColors.default[color_1], chartColors.default[color_2]],
    borderWidth: 1,
    spaceing: 5,
    hoverOffset: 4,
  };
};

export const sampleDoughnutChartData = (points = 2): IDoughnutChart => {
  const labels = [];

  for (let i = 1; i <= points; i++) {
    labels.push(`0${i}`);
  }

  return {
    labels,
    datasets: [datasetObjectDoughnutChart("primary", "danger", points)],
  };
};
