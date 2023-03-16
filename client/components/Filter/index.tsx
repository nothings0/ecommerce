import React from "react";
import "./index.scss";
import FilterItem from "./FilterItem";

const Filter = () => {
  return (
    <div className="filter">
      <FilterItem path="suppliers" title="Danh mục" />
      <FilterItem path="categories" title="Hãng" />
    </div>
  );
};

export default Filter;
