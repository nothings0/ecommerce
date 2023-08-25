"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// import catbanner_01 from "../../assets/catbanner-01.jpg";
// import catbanner_02 from "../../assets/catbanner-02.jpg";
// import catbanner_03 from "../../assets/catbanner-03.jpg";
import main_01 from "../../assets/slider-2022-10-27-01-36-38-2956.png";
import main_02 from "../../assets/slider-2022-10-27-01-36-44-4193.png";

const dataSlide = [
  {
    name: "Macbook Pro Max",
    type: "new released",
    img: main_01,
  },
  {
    name: "Headphone JBL Music",
    type: "new released",
    img: main_02,
  },
];

const BannerSlide: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const handleIndex = (indexSlide: number) => {
    if (indexSlide >= dataSlide.length || indexSlide < 0) return;
    setIndex(indexSlide);
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex((index + 1) % dataSlide.length);
    }, 5000);

    return () => clearInterval(timeout);
  }, [index]);

  return (
    <div className="banner__slide">
      {dataSlide.map((item, idx) => (
        <div
          className={`banner__slide__item ${
            index === idx ? "active" : index < idx ? "prev" : "next"
          }`}
          key={idx}
        >
          <Image src={item.img} alt="banner" />
          <div className="banner__slide__item__wrap">
            <p className="banner__slide__item__type">{item.type}</p>
            <h4 className="banner__slide__item__name">{item.name}</h4>
          </div>
        </div>
      ))}
      <div className="banner__slide--button">
        {dataSlide.map((_, idx) => (
          <div
            className={`banner__slide--button-item ${
              index === idx ? "active" : ""
            }`}
            key={idx}
            onClick={() => handleIndex(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlide;
