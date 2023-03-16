import React from "react";
import Image, { StaticImageData } from "next/image";
import "./index.scss";

interface IProps {
  type: string;
  name: string;
  desc: string;
  img: StaticImageData;
}

const BannerItem: React.FC<IProps> = ({ desc, name, type, img }) => {
  return (
    <div className="banner__item">
      <Image src={img} alt="banner" />
      <div className="banner__item__wrap">
        <p className="banner__item__type">{type}</p>
        <h4 className="banner__item__name">{name}</h4>
        <h4 className="banner__item__desc">{desc}</h4>
      </div>
    </div>
  );
};

export default BannerItem;
