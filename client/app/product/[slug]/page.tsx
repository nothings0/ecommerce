"use client";
import React, { useState } from "react";
import useFetch from "@/app/Hooks/useFetch";
import { IProduct, IResSimpleProduct } from "@/type";
import Image from "next/image";
import "./index.scss";
import Button from "@/components/Button";
import useProductStore from "@/zustand/productSlice";
import ProductContainer from "@/components/ProductContainer";
import { fomatCurrency } from "@/utities";
import Link from "next/link";
import Loading from "@/app/loading";
import qs from "querystring";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const URL = "https://backend-ecommerce-2.onrender.com";
const page = (context: any) => {
  const { slug } = context.params;
  const { data: res, isLoading } = useFetch<IResSimpleProduct>(
    `product/${slug}`,
    `products/${slug}?populate=*`
  );
  const product = res?.data;
  const { cart, wishlist, setCart, setWishList } = useProductStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [isMore, setMore] = useState<boolean>(false);

  const handleAdd = (product: IProduct) => {
    setCart(product);
  };

  const isCart = () => {
    return cart.some((item) => item.id === product?.id);
  };

  const addWishList = (product: IProduct) => {
    setWishList(product);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(e.target.value))) {
      setQuantity(0);
    } else {
      setQuantity(parseFloat(e.target.value));
    }
  };

  const query = qs.stringify({
    populate: "*",
    "pagination[page]": 1,
    "pagination[pageSize]": 12,
  });

  if (isLoading) return <Loading />;
  return (
    <div className="product-detail main">
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
              <span className="price">
                Giá: {fomatCurrency(product.attributes.price)}
              </span>
              <div
                className={`${
                  !isMore ? "" : "more"
                } product-detail__content__des`}
              >
                {product.attributes.description}
              </div>
              <div
                className="product-detail__content__btn"
                onClick={() => setMore(!isMore)}
              >
                {!isMore ? "Xem thêm" : "ẩn bớt"}
              </div>
              <span>Trong kho: {product.attributes.quantity}</span>

              <div className="quantity">
                <p>Số lượng: </p>
                <span
                  onClick={() =>
                    setQuantity(quantity - 1 > 0 ? quantity - 1 : quantity)
                  }
                >
                  -
                </span>
                <span>
                  <input
                    type="tel"
                    value={quantity.toString()}
                    onChange={(e) => handleQuantity(e)}
                  />
                </span>
                <span onClick={() => setQuantity(quantity + 1)}>+</span>
              </div>
              <div className="button__wrap">
                {isCart() ? (
                  <Button type="primary" size="lg">
                    <Link href="/cart">Xem giỏ hàng</Link>
                  </Button>
                ) : (
                  <Button
                    type="ok"
                    size="lg"
                    OnClick={() => handleAdd(product)}
                  >
                    Add to cart
                  </Button>
                )}
              </div>
              {/* <div className="button__wrap">
                {wishlist.some((item) => item.id === product.id) ? (
                  <Button type="outlineactive" size="lg">
                    <Link href="/user/wishlist">View Wishlist</Link>
                  </Button>
                ) : (
                  <Button
                    type="outline"
                    size="lg"
                    OnClick={() => addWishList(product)}
                  >
                    Add to wishlist
                  </Button>
                )}
              </div> */}
            </div>
            <div className="product-detail__text">
              <h4>Description</h4>
              <p>{mdParser.render(product.attributes.html!)}</p>
            </div>
          </>
        )}
      </div>
      <ProductContainer
        heading="suggestion collection"
        path={`products?${query}`}
      />
    </div>
  );
};

export default page;
