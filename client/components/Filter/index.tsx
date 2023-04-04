import React from "react";
import "./index.scss";
import FilterItem from "./FilterItem";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const Filter = () => {
  return (
    <div className="filter">
      <FilterItem path="suppliers" title="Hãng" />
      <FilterItem path="categories" title="Danh mục" />
    </div>
  );
};

export default Filter;
