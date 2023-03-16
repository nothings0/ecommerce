import React from "react";
import BannerItem from "./BannerItem";
import BannerSlide from "./BannerSlide";
import catbanner_01 from "../../assets/catbanner-01.jpg";
import catbanner_02 from "../../assets/catbanner-02.jpg";
import catbanner_03 from "../../assets/catbanner-03.jpg";
import catbanner_04 from "../../assets/catbanner-04.jpg";

const data = [
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad pro 13+",
    type: "best sale",
    img: catbanner_01,
  },
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad pro 13+",
    type: "best sale",
    img: catbanner_02,
  },
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad pro 13+",
    type: "best sale",
    img: catbanner_03,
  },
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad pro 13+",
    type: "best sale",
    img: catbanner_04,
  },
];

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__container">
        <div className="banner__slide">
          <BannerSlide
            desc="from $199.99 or $41.62/mo for 24 mo. Footnote"
            name="ipad s13 pro"
            type="supercharged for pros"
          />
        </div>
        <div className="banner__grid">
          {data.map((item, index) => (
            <BannerItem
              desc={item.desc}
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
