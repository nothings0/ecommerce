"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import mainBanner from "../../assets/main-banner.jpg";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const dataSlide = [
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad s13 pro",
    type: "supercharged for pros",
    img: mainBanner,
  },
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad s13 pro",
    type: "supercharged for pros",
    img: mainBanner,
  },
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad s13 pro",
    type: "supercharged for pros",
    img: mainBanner,
  },
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad s13 pro",
    type: "supercharged for pros",
    img: mainBanner,
  },
  {
    desc: "from $199.99 or $41.62/mo for 24 mo. Footnote",
    name: "ipad s13 pro",
    type: "supercharged for pros",
    img: mainBanner,
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
            <h4 className="banner__slide__item__desc">{item.desc}</h4>
          </div>
        </div>
      ))}
      <div
        className={`prev banner__slide--button ${index === 0 ? "disable" : ""}`}
        onClick={() => handleIndex(index - 1)}
      >
        <BsChevronLeft />
      </div>
      <div
        className={`next banner__slide--button ${
          index === dataSlide.length - 1 ? "disable" : ""
        }`}
        onClick={() => handleIndex(index + 1)}
      >
        <BsChevronRight />
      </div>
    </div>
  );
};

export default BannerSlide;
