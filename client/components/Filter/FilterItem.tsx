"use client";
import React from "react";
import useProductStore from "../../zustand/productSlice";
import "./index.scss";
import useFetch from "@/app/Hooks/useFetch";
import { IResCategory } from "@/type";
import { useQueryClient } from "react-query";
import Loading from "../Skeleton";

interface IProps {
  path: string;
  title: string;
}

const FilterItem: React.FC<IProps> = ({ path, title }) => {
  const { data: res, isLoading } = useFetch<IResCategory>(path, path);
  const { supplier, category, setCategory, setSupplier } = useProductStore();

  const queryClient = useQueryClient();

  const handleSetSearch = (value: string) => {
    if (path === "suppliers") {
      if (value === supplier) {
        setSupplier("");
        // const query = { ...searchParams, supplier: "" };
        // console.log(query);

        queryClient.invalidateQueries("suppliers");
      } else {
        setSupplier(value);
        // const query = { ...searchParams, supplier: value };
        // console.log(query);
        // router.push(`/product?${query}`);
        queryClient.invalidateQueries("suppliers");
      }
    } else {
      if (value === category) {
        setCategory("");
        // const query = { ...searchParams, category: "" };
        // console.log(query);
        // router.push(`/product?${query}`);
        queryClient.invalidateQueries("category");
      } else {
        setCategory(value);
        // const query = { ...searchParams, category: value };
        // console.log(query);

        // router.push(`/product?${query}`);
        queryClient.invalidateQueries("category");
      }
    }
  };
  if (isLoading) return <Loading />;

  return (
    <div className="filter__wrap">
      <div className="filter__header">
        <span>{title}</span>
      </div>
      <div className={`filter__list`}>
        {res?.data.map((item, index) => {
          return (
            <div className="filter__list__item" key={index}>
              <input
                type="checkbox"
                name=""
                checked={
                  supplier === item.attributes.name ||
                  category === item.attributes.slug
                }
                id="checkbox"
                value={item.attributes.slug || item.attributes.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSetSearch(e.target.value)
                }
              />
              <label htmlFor="checkbox">{item.attributes.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterItem;
