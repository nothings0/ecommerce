import { IProduct } from "@/type";
import Image from "next/image";
import React from "react";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { fomatCurrency } from "@/utities";
import Link from "next/link";

interface IProps {
  product: IProduct;
}
const URL = "http://127.0.0.1:1337";
const ProductItem: React.FC<IProps> = ({ product }) => {
  return (
    <div className="product-item">
      <div className="product-item--img">
        <Image
          alt="product image"
          src={`${URL}${product.attributes.picture_cover.data[0].attributes.url}`}
          width={`${Number(
            product.attributes.picture_cover.data[0].attributes.width
          )}`}
          height={`${Number(
            product.attributes.picture_cover.data[0].attributes.height
          )}`}
        />
      </div>
      <div className="product-item--name">{product.attributes.name}</div>
      <div className="product-item--price">
        {fomatCurrency(product.attributes.price)}
      </div>
      <div className="product-item--btn">
        <Link href={`/admin/edit/${product.id}`}>
          <div className="icon">
            <BsPencilSquare />
          </div>
        </Link>
        <div className="icon">
          <BsTrash />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
