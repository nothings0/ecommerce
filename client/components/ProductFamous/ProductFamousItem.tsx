import { IProductFamous } from "@/type";
import Image from "next/image";
import React from "react";

// import fm1 from "@/assets/famous-1.webp"
// import fm2 from "@/assets/famous-2.webp"
// import fm3 from "@/assets/famous-3.webp"
// import fm4 from "@/assets/famous-4.webp"

interface IProps {
  data: IProductFamous;
}
const URL = "https://backend-md7c.onrender.com";

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
