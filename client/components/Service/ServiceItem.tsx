import React from "react";
import { IconType } from "react-icons";

interface IProps {
  Icon: IconType;
  title: string;
  desc: string;
}

const ServiceItem: React.FC<IProps> = ({ Icon, desc, title }) => {
  return (
    <div className="service__item">
      <Icon size={50} />
      <div className="service__item__text">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
