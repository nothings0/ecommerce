"use client";
import React from "react";
import useFetch from "@/app/Hooks/useFetch";
import { IResProduct } from "@/type";
import "./index.scss";
import ProductItem from "./ProductItem";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

const Product = () => {
  const params = useSearchParams();
  const _page = Number(params.get("page"));
  const { data } = useFetch<IResProduct>(
    `products?populate=*&pagination[page]=${_page}&pagination[pageSize]=10`
  );
  return (
    <div className="product-page">
      <h4 className="product-page--heading">Kho sản phẩm</h4>
      <div className="container">
        {data?.data.map((item) => (
          <ProductItem product={item} key={item.id} />
        ))}
      </div>
      {data && (
        <Pagination
          page={data?.meta.pagination.page}
          total={data?.meta.pagination.pageCount}
          pathname="/admin/product"
        />
      )}
    </div>
  );
};

export default Product;
