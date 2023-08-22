import React, { useState, useRef } from "react";
import Link from "next/link";
import { BiCategory, BiChevronDown } from "react-icons/bi";
import "./bottomBar.scss";
import useClickOutside from "@/app/Hooks/useClickOutside";

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

const BottomBar = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(false);
  useClickOutside(menuRef, active, setActive);

  return (
    <div className="bottom-bar">
      <div className="bottom-bar__container">
        <div
          className="bottom-bar__category"
          onClick={() => setActive(!active)}
          ref={menuRef}
        >
          <div className="bottom-bar__category__main">
            <BiCategory size={20} />
            <span>shop categories</span>
          </div>
          <BiChevronDown size={20} />
          <div className={`drop-down ${active ? "active" : ""}`} ref={menuRef}>
            {dropDown.map((item) => (
              <Link
                href={`/category/${item.slug}`}
                className="drop-down--item"
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="bottom-bar__nav">
          <Link href="/" className="bottom-bar__nav__link">
            home
          </Link>
          <Link href="/product" className="bottom-bar__nav__link">
            our store
          </Link>
          <Link href="/" className="bottom-bar__nav__link">
            blogs
          </Link>
          <Link href="/" className="bottom-bar__nav__link">
            contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
