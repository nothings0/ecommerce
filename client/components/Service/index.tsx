import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import ServiceItem from "./ServiceItem";
import "./index.scss";
import {
  AiOutlineGift,
  AiOutlinePercentage,
  AiOutlinePhone,
} from "react-icons/ai";
import { RiSecurePaymentFill } from "react-icons/ri";

const serviceData = [
  {
    title: "free shipping",
    desc: "from all orders over $100",
    Icon: TbTruckDelivery,
  },
  {
    title: "Daily surprise offers",
    desc: "save up to 20% off",
    Icon: AiOutlineGift,
  },
  {
    title: "support 24/7",
    desc: "from all orders over $100",
    Icon: AiOutlinePhone,
  },
  {
    title: "affordable prices",
    desc: "get factory direct price",
    Icon: AiOutlinePercentage,
  },
  {
    title: "secure payment",
    desc: "100% protected payments",
    Icon: RiSecurePaymentFill,
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
