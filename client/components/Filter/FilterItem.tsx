"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSupplier } from "../../redux/productSlice";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./index.scss";
import useFetch from "@/app/Hooks/useFetch";
import { IResCategory } from "@/type";
import { RootState } from "@/redux/store";

interface IProps {
  path: string;
  title: string;
}

const FilterItem: React.FC<IProps> = ({ path, title }) => {
  const dispatch = useDispatch();
  const { data: res } = useFetch<IResCategory>(`${path}`);
  const [active, setActive] = useState(true);
  const { supplier, category } = useSelector(
    (state: RootState) => state.product
  );

  const handleSetSearch = (value: string) => {
    if (path === "suppliers") {
      if (value === supplier) {
        dispatch(setSupplier(""));
      } else {
        dispatch(setSupplier(value));
      }
    } else {
      if (value === category) {
        dispatch(setCategory(""));
      } else {
        dispatch(setCategory(value));
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
