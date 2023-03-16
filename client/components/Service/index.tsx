import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import ServiceItem from "./ServiceItem";
import "./index.scss";

const serviceData = [
  {
    title: "free shipping",
    desc: "from all orders over $100",
    Icon: TbTruckDelivery,
  },
  {
    title: "free shipping",
    desc: "from all orders over $100",
    Icon: TbTruckDelivery,
  },
  {
    title: "free shipping",
    desc: "from all orders over $100",
    Icon: TbTruckDelivery,
  },
  {
    title: "free shipping",
    desc: "from all orders over $100",
    Icon: TbTruckDelivery,
  },
  {
    title: "free shipping",
    desc: "free shipping",
    Icon: TbTruckDelivery,
  },
];

const Service = () => {
  return (
    <div className="service">
      <div className="service__container">
        {serviceData.map((item, index) => (
          <ServiceItem
            Icon={item.Icon}
            desc={item.desc}
            title={item.title}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
