import React from "react";
import { IResProductFamous } from "@/type";
import ProductFamousItem from "./ProductFamousItem";
import "./index.scss";
const getProduct = async () => {
  const res = await fetch(`${process.env.API_URL}/product-hots?populate=*`);
  const category: IResProductFamous = await res.json();
  return category;
};

const ProductFamous = async () => {
  const { data } = await getProduct();
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
