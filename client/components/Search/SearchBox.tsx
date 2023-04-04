"use client";
import useClickOutside from "@/app/Hooks/useClickOutside";
import useDebounce from "@/app/Hooks/useDebounce";
import { IResProduct } from "@/type";
import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import SearchResult from "./SearchResult";

const SearchBox = () => {
  const [value, setValue] = useState("");
  const menuRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<boolean>(false);

  const { data } = useDebounce<IResProduct>(
    `${value ? `products?populate=*&filters[name][$contains]=${value}` : ""}`,
    1200
  );
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (!e.currentTarget.value) setActive(false);
    else setActive(true);
  };

  const handleFocus = () => {
    if (data) setActive(true);
  };

  useClickOutside(menuRef, active, setActive);

  return (
    <div className="search__box">
      <div className="search__box__input">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm ..."
          value={value}
          onChange={handleChangeInput}
          onFocus={handleFocus}
        />
      </div>
      <div className="search__box__icon">
        <BiSearch size={30} />
      </div>
      {active && (
        <ul className="search__result" ref={menuRef}>
          {data?.data.map((item) => (
            <SearchResult data={item} key={item.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
