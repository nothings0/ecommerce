import React from "react";
import "./index.scss";
import { IProduct } from "../../type";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useProductStore from "@/zustand/productSlice";
import { fomatCurrency } from "@/utities";
interface IProps {
  product: IProduct;
  type?: string;
}
const URL = "http://127.0.0.1:5432";
const ProductCard: React.FC<IProps> = ({ product, type }) => {
  const { cart, setCart } = useProductStore();
  const active = cart.some((p) => p.id === product.id);
  const handleAdd = (product: IProduct) => {
    setCart(product);
  };

  if (type === "rate")
    return (
      <div className="product__item rate">
        <Image
          src={`${URL}${product.attributes.picture_cover.data[0].attributes.url}`}
          alt=""
          width={`${Number(
            product.attributes.picture_cover.data[0].attributes.width
          )}`}
          height={`${Number(
            product.attributes.picture_cover.data[0].attributes.height
          )}`}
        />
        <div className="product__item__text">
          <span>{product.attributes.supplier_id.data.attributes.name}</span>
          <Link href={`/product/${product.id}`}>
            <h3>{product.attributes.name}</h3>
          </Link>
          <p>{fomatCurrency(product.attributes.price)}</p>
          <div className="product__item__text__btn">
            <button>Add to card</button>
          </div>
        </div>
        <div
          className="product__item__heart"
          onClick={() => handleAdd(product)}
        >
          {active ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
        </div>
      </div>
    );

  if (type === "best")
    return (
      <div className="product__item best">
        <Image
          src={`${URL}${product.attributes.picture_cover.data[0].attributes.url}`}
          alt=""
          width={`${Number(
            product.attributes.picture_cover.data[0].attributes.width
          )}`}
          height={`${Number(
            product.attributes.picture_cover.data[0].attributes.height
          )}`}
        />
        <div className="product__item__text">
          <Link href={`/product/${product.id}`}>
            <h3>{product.attributes.name}</h3>
          </Link>
          <p>{fomatCurrency(product.attributes.price)}</p>
        </div>
      </div>
    );

  return (
    <div className="product__item">
      <Image
        src={`${URL}${product.attributes.picture_cover.data[0].attributes.url}`}
        alt=""
        width={`${Number(
          product.attributes.picture_cover.data[0].attributes.width
        )}`}
        height={`${Number(
          product.attributes.picture_cover.data[0].attributes.height
        )}`}
      />
      <Link href={`/product/${product.id}`}>
        <div className="product__item__text">
          <span>{product.attributes.supplier_id.data.attributes.name}</span>
          <h3>{product.attributes.name}</h3>
          <p>{fomatCurrency(product.attributes.price)}</p>
        </div>
      </Link>
      <div className="product__item__heart" onClick={() => handleAdd(product)}>
        {active ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
      </div>
    </div>
  );
};

export default ProductCard;
