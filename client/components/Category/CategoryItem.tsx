import { ICategory } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  category: ICategory;
}
const URL = "https://backend-md7c.onrender.com";
const CategoryItem: React.FC<IProps> = ({ category }) => {
  return (
    <div className="category__item">
      <Link href={`/product?category=${category.attributes.slug}`}>
        <div className="category__item__text">{category.attributes.name}</div>
        <Image
          src={`${URL}${category.attributes.img_cover.data.attributes.url}`}
          alt="category image"
          width={`${Number(
            category.attributes.img_cover.data.attributes.width
          )}`}
          height={`${Number(
            category.attributes.img_cover.data.attributes.height
          )}`}
        />
      </Link>
    </div>
  );
};

export default CategoryItem;
