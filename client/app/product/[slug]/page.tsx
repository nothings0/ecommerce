"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/app/Hooks/useFetch";
import { IProduct, IResSimpleProduct } from "@/type";
import Image from "next/image";
import "./index.scss";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setWishList } from "@/redux/productSlice";
import ProductContainer from "@/components/ProductContainer";
import { fomatCurrency } from "@/utities";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";

const URL = "http://127.0.0.1:1337";
const page = (context: any) => {
  const { slug } = context.params;
  const { data: res } = useFetch<IResSimpleProduct>(
    `products/${slug}?populate=*`
  );
  const product = res?.data;
  const dispatch = useDispatch();
  const { cart, wishlist } = useSelector((state: RootState) => state.product);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!product) return;
    if (!localStorage.getItem("recent")) {
      localStorage.setItem("recent", JSON.stringify([product]));
      return;
    }
    const recentProduct: IProduct[] = JSON.parse(
      localStorage.getItem("recent")!
    );

    if (recentProduct.some((item) => item.id === product?.id)) return;
    if (recentProduct.length < 16) {
      recentProduct.unshift(product!);
    } else {
      recentProduct.pop();
      recentProduct.unshift(product!);
    }
    localStorage.setItem("recent", JSON.stringify(recentProduct));
  }, [slug, product]);

  const handleAdd = (product: IProduct) => {
    dispatch(setCart(product));
  };

  const isCart = () => {
    return cart.some((item) => item.id === product?.id);
  };

  const addWishList = (product: IProduct) => {
    dispatch(setWishList(product));
  };

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
              <span>Trong kho: {product.attributes.quantity}</span>
              <span className="price">
                Giá: {fomatCurrency(product.attributes.price)}
              </span>
              <div className="quantity">
                <p>Số lượng: </p>
                <span onClick={() => setQuantity(quantity - 1)}>-</span>
                <span>
                  <input
                    type="tel"
                    value={quantity.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuantity(parseFloat(e.currentTarget.value))
                    }
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
              <div className="secure">
                <AiFillCheckCircle /> <span>shop secure, free returns</span>
              </div>
              <div className="button__wrap">
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
                <Button type="outline" size="lg">
                  Add to compose
                </Button>
              </div>
            </div>
            <div className="product-detail__text">
              <h4>Description</h4>
              <p>{product.attributes.description}</p>
            </div>
          </>
        )}
      </div>
      <ProductContainer
        type="suggestion collection"
        path="products?populate=*&pagination[pageSize]=12"
      />
    </div>
  );
};

export default page;
