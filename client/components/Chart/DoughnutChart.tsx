import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { IDoughnutChart } from "@/type";
interface IProps {
  data: IDoughnutChart;
}

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart: React.FC<IProps> = ({ data }) => {
  return <>{data && <Doughnut data={data} />}</>;
};

export default DoughnutChart;
