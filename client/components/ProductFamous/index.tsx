import React from "react";
import { IResProductFamous } from "@/type";
import ProductFamousItem from "./ProductFamousItem";
import "./index.scss";
import axiosClient from "@/config/axiosConfig";
const getProduct = async () => {
  const res = await axiosClient.get("/product-hots?populate=*");
  return res.data;
};

const ProductFamous = async () => {
  const { data }: IResProductFamous = await getProduct();
  return (
    <div className="product__famous">
      <div className="product__famous__container">
        {data.map((item) => (
          <ProductFamousItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductFamous;
