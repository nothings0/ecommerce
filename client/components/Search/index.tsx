"use client";
import React, { useRef, useState } from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import "./index.scss";
import Account from "./Account";
import Cart from "./Cart";
import { FaBars, FaStore } from "react-icons/fa";
import { MdPolicy } from "react-icons/md";
import {
  AiFillHome,
  AiOutlineAppstore,
  AiOutlineProfile,
} from "react-icons/ai";
import Link from "next/link";
import useClickOutside from "@/app/Hooks/useClickOutside";
import { BsChevronDown } from "react-icons/bs";

const menuData = [
  {
    text: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    text: "Store",
    path: "/product",
    icon: <FaStore />,
  },
  {
    text: "Shop Categories",
    path: null,
    icon: <AiOutlineAppstore />,
  },
  {
    text: "Terms of service",
    path: "/",
    icon: <AiOutlineProfile />,
  },
  {
    text: "Privace policy",
    path: "/",
    icon: <MdPolicy />,
  },
];

const dropDown = [
  {
    name: "computer & laptop",
    slug: "computer",
    id: 1,
  },
  {
    name: "airpod",
    slug: "airpod",
    id: 4,
  },
  {
    name: "smart television",
    slug: "smart-television",
    id: 2,
  },
  {
    name: "keyboard",
    slug: "keyboard",
    id: 3,
  },
  {
    name: "mouse",
    slug: "mouse",
    id: 8,
  },
  {
    name: "smartphone",
    slug: "smartphone",
    id: 9,
  },
  {
    name: "camera",
    slug: "camera",
    id: 10,
  },
  // {
  //   name: "mobile & tablet",
  //   slug: "mobile-tablet",
  //   id: 4,
  // },
  {
    name: "headphone",
    slug: "headphone",
    id: 5,
  },
  {
    name: "speaker",
    slug: "speaker",
    id: 6,
  },
  {
    name: "acessories",
    slug: "acessories",
    id: 7,
  },
];

const Search = () => {
  const [active, setActive] = useState<boolean>(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, active, setActive);

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__left">
          {!active ? (
            <div className="search__bar">
              <FaBars onClick={() => setActive(true)} />
            </div>
          ) : (
            <div className={`search__menu ${active ? "active" : ""}`}>
              <div className="search__menu--wrap" ref={menuRef}>
                <div className="search__menu--item">
                  <Account />
                </div>
                {menuData.map((item, index) => {
                  if (item.path) {
                    return (
                      <Link
                        href={item.path}
                        key={index}
                        className="search__menu--item"
                      >
                        {item.icon} <span>{item.text}</span>
                      </Link>
                    );
                  } else {
                    return (
                      <div className="search__menu--drop" key={index}>
                        <div className="search__menu--drop-title">
                          <div className="search__menu--drop-title-text">
                            {item.icon} <span>{item.text}</span>
                          </div>
                          <BsChevronDown />
                        </div>
                        <ul className="search__menu--drop-list">
                          {dropDown.map((item) => (
                            <Link
                              href={`/product?category=${item.slug}`}
                              className="search__menu--drop-item"
                              key={item.id}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
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
