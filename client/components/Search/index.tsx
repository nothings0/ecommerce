import React from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import "./index.scss";
import Account from "./Account";
import Cart from "./Cart";
const Search = () => {
  return (
    <div className="search">
      <div className="search__container">
        <div className="search__left">
          <Logo />
          <SearchBox />
        </div>
        <div className="search__right">
          <Account />
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Search;
