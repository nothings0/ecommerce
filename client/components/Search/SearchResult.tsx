import React from "react";
import { IProduct } from "@/type";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  data: IProduct;
}
const URL = "https://backend-ecommerce-2.onrender.com";
const SearchResult: React.FC<IProps> = ({ data }) => {
  return (
    <Link href={`/product/${data.id}`} className="search__result__item">
      <Image
        src={`${URL}${data.attributes.picture_cover.data[0].attributes.url}`}
        width={`${Number(
          data.attributes.picture_cover.data[0].attributes.width
        )}`}
        height={`${Number(
          data.attributes.picture_cover.data[0].attributes.height
        )}`}
        alt="product image"
      />
      <p>{data.attributes.name}</p>
    </Link>
  );
};

export default SearchResult;
