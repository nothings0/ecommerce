import React from "react";
import BannerItem from "./BannerItem";
import BannerSlide from "./BannerSlide";
import catbanner_01 from "../../assets/catbanner-01.jpg";
import catbanner_02 from "../../assets/catbanner-02.jpg";
import catbanner_03 from "../../assets/catbanner-03.jpg";
import catbanner_04 from "../../assets/catbanner-04.jpg";

const data = [
  {
    name: "Macbook M2 pro",
    type: "best sale",
    img: catbanner_01,
  },
  {
    name: "ipad pro 13+",
    type: "best sale",
    img: catbanner_03,
  },
  {
    name: "smartwatch SE 2023",
    type: "new released",
    img: catbanner_02,
  },
  {
    name: "headphone MI2",
    type: "new released",
    img: catbanner_04,
  },
];

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__container">
        <BannerSlide />
        <div className="banner__grid">
          {data.map((item, index) => (
            <BannerItem
              name={item.name}
              type={item.type}
              img={item.img}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
