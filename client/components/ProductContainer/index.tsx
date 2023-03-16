"use client";
import React from "react";
import { IResProduct } from "@/type";
import ProductCard from "../ProductCard";
import "./index.scss";
import { AiOutlineDoubleRight } from "react-icons/ai";
import useFetch from "@/app/Hooks/useFetch";

interface IProps {
  type: string;
  path: string;
}
// @ts-ignore
const ProductContainer: React.FC<IProps> = ({ type, path }) => {
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
          {products?.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
