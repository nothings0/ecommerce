"use client";
import React from "react";
import "./index.scss";
import ProductContainer from "@/components/ProductContainer";

const CategoryPage = (context: any) => {
  const { slug } = context.params;
  const path = `products?populate=*&filters[category_id][slug][$eq]=${slug}`;

  return (
    <main className="category-page main">
      <div className="category-page__container">
        <ProductContainer heading={`featured collection`} path={path} />
        <ProductContainer
          heading="suggest collection"
          path="products?populate=*&pagination[page]=1&pagination[pageSize]=18"
        />
      </div>
    </main>
  );
};

export default CategoryPage;
