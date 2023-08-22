"use client";
import ProductCard from "@/components/ProductCard";
import ProductContainer from "@/components/ProductContainer";
import React from "react";
import "./index.scss";
import useProductStore from "@/zustand/productSlice";

const page = () => {
  const { wishlist } = useProductStore();
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
        heading="suggest collection"
        path="products?populate=*&pagination[page]=1&pagination[pageSize]=18"
      />
    </div>
  );
};

export default page;
