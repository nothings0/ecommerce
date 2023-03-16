"use client";
import React from "react";
import useFetch from "@/app/Hooks/useFetch";
import { IProduct, IResSimpleProduct } from "@/type";
import Image from "next/image";
import "./index.scss";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import ProductContainer from "@/components/ProductContainer";
import { fomatCurrency } from "@/utities";

const URL = "http://127.0.0.1:1337";
const page = (context: any) => {
  const { slug } = context.params;
  const { data: res } = useFetch<IResSimpleProduct>(
    `products/${slug}?populate=*`
  );
  const product = res?.data;
  const dispatch = useDispatch();
  const handleAdd = (product: IProduct) => {
    dispatch(setCart(product));
  };

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        {product && (
          <>
            <div className="product-detail__img">
              <Image
                src={`${URL}${product?.attributes.picture_cover.data[0].attributes.url}`}
                alt=""
                width={`${Number(
                  product?.attributes.picture_cover.data[0].attributes.width
                )}`}
                height={`${Number(
                  product?.attributes.picture_cover.data[0].attributes.height
                )}`}
              />
            </div>
            <div className="product-detail__content">
              <h3>{product.attributes.name}</h3>
              <span>Số lượng: {product.attributes.quantity}</span>
              <span>Giá: {fomatCurrency(product.attributes.price)}</span>
              <p>{product.attributes.description}</p>
              <div className="button">
                <Button type="ok" size="lg" OnClick={() => handleAdd(product)}>
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <ProductContainer
        type="suggestion collection"
        path="products?populate=*"
      />
    </div>
  );
};

export default page;
