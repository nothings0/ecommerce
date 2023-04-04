"use client";
import React, { useState } from "react";
import Filter from "@/components/Filter";
import ProductContainer from "@/components/ProductContainer";
import { RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import "./index.scss";

const MainStore = () => {
  const params = useSearchParams();
  const _page = Number(params.get("page"));

  const { supplier, category } = useSelector(
    (state: RootState) => state.product
  );

  const path = () => {
    if (supplier && category) {
      return `products?populate=*&filters[supplier_id][name][$eq]=${supplier}&filters[category_id][slug][$eq]=${category}&pagination[page]=${_page}&pagination[pageSize]=18`;
    } else if (supplier) {
      return `products?populate=*&filters[supplier_id][name][$eq]=${supplier}&pagination[page]=${_page}&pagination[pageSize]=18`;
    } else if (category) {
      return `products?populate=*&filters[category_id][slug][$eq]=${category}&pagination[page]=${_page}&pagination[pageSize]=18`;
    } else {
      return `products?populate=*&pagination[page]=${_page}&pagination[pageSize]=18`;
    }
  };
  return (
    <div className="store">
      <Filter />
      <main className="store__main main">
        <ProductContainer
          type={`${supplier || category} collection`}
          path={path()}
          page={_page || 1}
        />
      </main>
    </div>
  );
};

export default MainStore;
