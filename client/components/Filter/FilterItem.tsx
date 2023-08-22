"use client";
import React, { useState } from "react";
import useProductStore from "../../zustand/productSlice";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./index.scss";
import useFetch from "@/app/Hooks/useFetch";
import { IResCategory } from "@/type";
import { useQueryClient } from "react-query";

interface IProps {
  path: string;
  title: string;
}

const FilterItem: React.FC<IProps> = ({ path, title }) => {
  const { data: res } = useFetch<IResCategory>(path, path);
  const [active, setActive] = useState(true);
  const { supplier, category, setCategory, setSupplier } = useProductStore();

  const queryClient = useQueryClient();

  const handleSetSearch = (value: string) => {
    if (path === "suppliers") {
      if (value === supplier) {
        setSupplier("");
        queryClient.invalidateQueries("suppliers");
      } else {
        setSupplier(value);
        queryClient.invalidateQueries("suppliers");
      }
    } else {
      if (value === category) {
        setCategory("");
        queryClient.invalidateQueries("category");
      } else {
        setCategory(value);
        queryClient.invalidateQueries("category");
      }
    }
  };
  return (
    <div className="filter__wrap">
      <div className="filter__header">
        <span>{title}</span>
        {active ? (
          <BsChevronUp onClick={() => setActive(!active)} />
        ) : (
          <BsChevronDown onClick={() => setActive(!active)} />
        )}
      </div>
      <div className={`filter__list ${active ? "active" : ""}`}>
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
