import React from "react";
import "./index.scss";
import { IProduct } from "../../type";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../redux/productSlice";
import { RootState } from "@/redux/store";
import { fomatCurrency } from "@/utities";
interface IProps {
  product: IProduct;
}
const URL = "http://127.0.0.1:1337";
const ProductCard: React.FC<IProps> = ({ product }) => {
  const dispatch = useDispatch();
  const handleAdd = (product: IProduct) => {
    dispatch(setCart(product));
  };
  const { cart } = useSelector((state: RootState) => state.product);
  const active = cart.some((p) => p.id === product.id);

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
