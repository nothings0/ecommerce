import React, { useState, useRef } from "react";
import Link from "next/link";
import { BiCategory, BiChevronDown } from "react-icons/bi";
import "./bottomBar.scss";
import useClickOutside from "@/app/Hooks/useClickOutside";

const dropDown = [
  {
    name: "computer & laptop",
    slug: "computer-laptop",
    id: 1,
  },
  {
    name: "smart television",
    slug: "smart-television",
    id: 2,
  },
  {
    name: "smartwatch",
    slug: "smartwatch",
    id: 3,
  },
  {
    name: "mobile & tablet",
    slug: "mobile-tablet",
    id: 4,
  },
  {
    name: "headphone",
    slug: "headphone",
    id: 5,
  },
  {
    name: "portable speaker",
    slug: "portable-speaker",
    id: 6,
  },
  {
    name: "acessories",
    slug: "acessories",
    id: 7,
  },
  {
    name: "home appliance",
    slug: "home-appliance",
    id: 8,
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
