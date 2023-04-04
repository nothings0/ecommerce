"use client";
import React, { useEffect, useState } from "react";
// import { RootState } from "@/redux/store";
// import { IResOrderServer } from "@/type";
// import { useSelector } from "react-redux";
// import useFetchWithPermision from "../Hooks/useFetchWithPermision";
// import qs from "querystring";

import order_1 from "@/assets/order-1.png";
import order_2 from "@/assets/order-2.png";
import order_3 from "@/assets/order-3.png";
import order_4 from "@/assets/order-4.png";
import Image, { StaticImageData } from "next/image";
import LineChart from "@/components/Chart/LineChart";
import {
  sampleLineChartData,
  // sampleDoughnutChartData,
  sampleLineChartDataOrder,
} from "@/components/Chart/chart.config";
// import DoughnutChart from "@/components/Chart/DoughnutChart";
import Table from "@/components/Table";
import { IDoughnutChart, ILineChart } from "@/type";

type InitType = {
  title: string;
  count: number;
  img: StaticImageData;
};
const page = () => {
  // const { jwt } = useSelector((state: RootState) => state.user);
  // const query = qs.stringify({
  //   populate: ["order_details.product.picture_cover", "status"],
  // });
  // const { data: res } = useFetchWithPermision<IResOrderServer>(
  //   `/orders?${query}`,
  //   jwt
  // );
  const [initData, setInitData] = useState<InitType[]>([]);
  const [lineChartData, setLineChartData] = useState<ILineChart>();
  const [lineChartDataOrder, setLineChartDataOrder] = useState<ILineChart>();
  // const [doughnutChartData, setDoughnutChartData] = useState<IDoughnutChart>();

  useEffect(() => {
    const init: InitType[] = [
      {
        title: "Total Orders",
        count: 75,
        img: order_1,
      },
      {
        title: "Total Delivered",
        count: 356,
        img: order_2,
      },
      {
        title: "Total Cancels",
        count: 55,
        img: order_3,
      },
      {
        title: "Total Revenue",
        count: 128,
        img: order_4,
      },
    ];
    setInitData(init);
    const lineData = sampleLineChartData(12);
    setLineChartData(lineData);
    const lineDataOrder = sampleLineChartDataOrder(7);
    setLineChartDataOrder(lineDataOrder);
    // const doughnutData = sampleDoughnutChartData();
    // setDoughnutChartData(doughnutData);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-heading">Dashboard</div>
      <div className="dashboard-top">
        {initData.map((item, index) => (
          <div className="dashboard-box" key={index}>
            <div className="dashboard-box--img">
              <Image alt="" src={item.img} />
            </div>
            <div className="dashboard-box--txt">
              <h2>{item.count}</h2>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <LineChart data={lineChartDataOrder!} />
      <LineChart data={lineChartData!} />
      <Table />
    </div>
  );
};

export default page;
