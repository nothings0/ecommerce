import React from "react";
import Image, { StaticImageData } from "next/image";
import "./index.scss";
import Button from "../Button";

interface IProps {
  type: string;
  name: string;
  img: StaticImageData;
}

const BannerItem: React.FC<IProps> = ({ name, type, img }) => {
  return (
    <div className="banner__item">
      <Image src={img} alt="banner" />
      <div className="banner__item__wrap">
        <p className="banner__item__type">{type}</p>
        <h4 className="banner__item__name">{name}</h4>
      </div>
    </div>
  );
};

export default BannerItem;
