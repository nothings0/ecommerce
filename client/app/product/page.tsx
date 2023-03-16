"use client";
import Filter from "@/components/Filter";
import ProductContainer from "@/components/ProductContainer";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const MainStore = () => {
  const { supplier, category } = useSelector(
    (state: RootState) => state.product
  );
  const path = () => {
    if (supplier && category) {
      return `products?populate=*&filters[supplier_id][name][$eq]=${supplier}&filters[category_id][name][$eq]=${category}`;
    } else if (supplier) {
      return `products?populate=*&filters[supplier_id][name][$eq]=${supplier}`;
    } else if (category) {
      return `products?populate=*&filters[category_id][name][$eq]=${category}`;
    } else {
      return "products?populate=*";
    }
  };
  return (
    <div className="store">
      <Filter />
      <main className="store__main" style={{ marginTop: "145px" }}>
        <ProductContainer type={`${supplier} collection`} path={path()} />
      </main>
    </div>
  );
};

export default MainStore;
