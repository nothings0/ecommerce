import { IProductFamous } from "@/type";
import Image from "next/image";
import React from "react";

interface IProps {
  data: IProductFamous;
}
const URL = "https://backend-ecommerce-2.onrender.com";

const ProductFamousItem: React.FC<IProps> = ({ data }) => {
  return (
    <div className="product__famous__item">
      <Image
        alt=""
        src={`${URL}${data.attributes.img_cover.data.attributes.url}`}
        width={`${Number(data.attributes.img_cover.data.attributes.width)}`}
        height={`${Number(data.attributes.img_cover.data.attributes.height)}`}
      />
      <div className="product__famous__text">
        <span>{data.attributes.type}</span>
        <h4>{data.attributes.name}</h4>
        <p>{data.attributes.desc}</p>
      </div>
    </div>
  );
};

export default ProductFamousItem;
