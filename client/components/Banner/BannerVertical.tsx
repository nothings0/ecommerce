import React from "react";
import bannerImg from "@/assets/bannervertical.png";
import Image from "next/image";
import "./bannerVertical.scss";

const BannerVertical = () => {
  return (
    <div className="banner-vertical">
      <Image src={bannerImg} alt="banner image" />
      <div className="banner-vertical__text">
        <h4>Get the best deal for Headphones</h4>
        <button>shop now &gt;</button>
      </div>
    </div>
  );
};

export default BannerVertical;
