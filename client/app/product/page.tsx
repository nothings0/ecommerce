"use client";
import React, { useEffect } from "react";
import Filter from "@/components/Filter";
import ProductContainer from "@/components/ProductContainer";
import { useSearchParams } from "next/navigation";
import "./index.scss";
import useProductStore from "@/zustand/productSlice";

const MainStore = () => {
  const params = useSearchParams();
  const _page = Number(params?.get("page"));
  const _supplier = params?.get("supplier");
  const _category = params?.get("category");

  const { supplier, category, setCategory, setSupplier } = useProductStore();

  useEffect(() => {
    if (_supplier) {
      setSupplier(_supplier);
    }
    if (_category) {
      setCategory(_category);
    }
  }, [_category, _supplier]);

  const path = () => {
    if (category && supplier) {
      return `products?populate=*&filters[supplier_id][name][$eq]=${supplier}&filters[category_id][slug][$eq]=${category}&pagination[page]=${_page}&pagination[pageSize]=18`;
    } else if (supplier) {
      return `products?populate=*&filters[supplier_id][name][$eq]=${supplier}&pagination[page]=${_page}&pagination[pageSize]=18`;
    } else if (category) {
      return `products?populate=*&filters[category_id][slug][$eq]=${category}&pagination[page]=${_page}&pagination[pageSize]=18`;
    } else {
      return `products?populate=*&pagination[page]=${_page}&pagination[pageSize]=18`;
    }
  };
  const heading = () => {
    if (category && supplier) {
      return `${supplier} - ${category} collection`;
    } else if (supplier) {
      return `${supplier} collection`;
    } else if (category) {
      return `${category} collection`;
    } else {
      return `all collection`;
    }
  };

  return (
    <div className="store">
      <Filter />
      <main className="store__main main">
        <ProductContainer heading={heading()} path={path()} page={_page || 1} />
      </main>
    </div>
  );
};

export default MainStore;
