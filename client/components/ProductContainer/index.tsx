"use client";
import React from "react";
import { IResProduct } from "@/type";
import ProductCard from "../ProductCard";
import "./index.scss";
import { AiOutlineDoubleRight } from "react-icons/ai";
import useFetch from "@/app/Hooks/useFetch";
import Pagination from "../Pagination";

interface IProps {
  type: string;
  path: string;
  page?: number;
}
// @ts-ignore
const ProductContainer: React.FC<IProps> = ({ type, path, page }) => {
  const { data: res } = useFetch<IResProduct>(`${path}`);
  const products = res?.data;

  return (
    <div className="product">
      <div className="product__container">
        <div className="product__type">
          <h4>{type}</h4>

          {res?.meta.pagination.pageCount! > res?.meta.pagination.pageSize! && (
            <span>
              more <AiOutlineDoubleRight />
            </span>
          )}
        </div>
        <div className="product__wrap">
          {products && products.length > 0 ? (
            products?.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </div>
      </div>
      {page && (
        <Pagination
          page={page}
          total={res?.meta.pagination.pageCount!}
          pathname="/product"
        />
      )}
    </div>
  );
};

export default ProductContainer;
