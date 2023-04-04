"use client";
import ProductCard from "@/components/ProductCard";
import ProductContainer from "@/components/ProductContainer";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const page = () => {
  const { wishlist } = useSelector((state: RootState) => state.product);
  return (
    <div className="wishlist">
      {wishlist.length > 0 && (
        <>
          <h3>Sản phẩm yêu thích</h3>
          <div className="wishlist__container">
            {wishlist.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
          </div>
        </>
      )}
      <ProductContainer
        type="suggest collection"
        path="products?populate=*&pagination[page]=1&pagination[pageSize]=18"
      />
    </div>
  );
};

export default page;
