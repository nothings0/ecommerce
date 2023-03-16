import React from "react";
import CategoryItem from "./CategoryItem";
import { IResCategory } from "../../type";
import "./index.scss";

const getCategory = async () => {
  const res = await fetch(`${process.env.API_URL}/categories?populate=*`, {
    headers: {
      Authentication: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  const category: IResCategory = await res.json();
  return category;
};

const URL = "http://127.0.0.1:1337";

async function Category() {
  const { data } = await getCategory();
  return (
    <div className="category">
      <div className="category__container">
        {data?.map((item) => (
          <CategoryItem category={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Category;
