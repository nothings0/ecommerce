import React from "react";
import Image from "next/image";
import mainBanner from "../../assets/main-banner.jpg";
interface IProps {
  type: string;
  name: string;
  desc: string;
}

const BannerSlide: React.FC<IProps> = ({ desc, name, type }) => {
  return (
    <div className="banner__slide__item">
      <Image src={mainBanner} alt="banner" />
      <div className="banner__slide__item__wrap">
        <p className="banner__slide__item__type">{type}</p>
        <h4 className="banner__slide__item__name">{name}</h4>
        <h4 className="banner__slide__item__desc">{desc}</h4>
      </div>
    </div>
  );
};

export default BannerSlide;
