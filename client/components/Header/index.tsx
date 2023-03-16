"use client";
import React from "react";
import Search from "../Search";
import BottomBar from "./BottomBar";

const Header: React.FC = () => {
  return (
    <div className="header">
      <Search />
      <BottomBar />
    </div>
  );
};

export default Header;
