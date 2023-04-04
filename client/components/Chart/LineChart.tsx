import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { ILineChart } from "@/type";

interface IProps {
  data: ILineChart;
  // grid: boolean;
}
ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);
const LineChart: React.FC<IProps> = ({ data }) => {
  // console.log(grid);

  // ChartJS.defaults.scale.grid.display = grid;
  return <>{data && <Line data={data} />}</>;
};

export default LineChart;
