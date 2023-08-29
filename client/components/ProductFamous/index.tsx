import React from "react";
import { IResProductFamous } from "@/type";
import ProductFamousItem from "./ProductFamousItem";
import "./index.scss";
import { axiosPrimary } from "@/config/axiosConfig";
import useFetch from "@/app/Hooks/useFetch";
// const getProduct = async () => {
//   const res = await axiosPrimary.get(`/product-hots?populate=*`);
//   return res.data;
// };

const ProductFamous = async () => {
  // const { data }: IResProductFamous = await getProduct();
  const { data } = useFetch<any>(`product-hot`, `/product-hots?populate=*`);
  return (
    <div className="product__famous">
      <div className="product__famous__container">
        {data.map((item: any) => (
          <ProductFamousItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductFamous;
