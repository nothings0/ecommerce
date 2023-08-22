"use client";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { IResCategory } from "../../type";
import "./index.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useFetch from "@/app/Hooks/useFetch";

function Category() {
  const { data } = useFetch<IResCategory>("category", "categories?populate=*", {
    staleTime: 24 * 60 * 60 * 1000,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemPerSlide, setItemPerSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setItemPerSlide(5);
      } else if (width > 800) {
        setItemPerSlide(3);
      } else {
        setItemPerSlide(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIndex = (indexSlide: number) => {
    if (indexSlide > data?.data.length! - itemPerSlide || indexSlide < 0)
      return;
    setCurrentSlide(indexSlide);
  };

  return (
    <div className="category">
      <div className="category__wrap">
        <div className="category__wrap--box">
          <div
            className="category__container"
            style={{
              transform: `translateX(-${currentSlide * (100 / itemPerSlide)}%)`,
            }}
          >
            {data &&
              data.data.map((item) => (
                <CategoryItem category={item} key={item.id} />
              ))}
          </div>
        </div>
        <div
          className={`prev category--button ${
            currentSlide === 0 ? "disable" : ""
          }`}
          onClick={() => handleIndex(currentSlide - 1)}
        >
          <BsChevronLeft />
        </div>
        <div
          className={`next category--button ${
            currentSlide === data?.data.length! - itemPerSlide ? "disable" : ""
          }`}
          onClick={() => handleIndex(currentSlide + 1)}
        >
          <BsChevronRight />
        </div>
      </div>
    </div>
  );
}

export default Category;
