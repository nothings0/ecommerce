"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { handleLogout } from "@/redux/userSlice";
import Cookies from "js-cookie";

const SideBarData = [
  {
    path: "/user",
    text: "thông tin tài khoản",
    icon: <AiOutlineUser />,
  },
  {
    path: "/user/order",
    text: "quản lý đơn hàng",
    icon: <AiOutlineShoppingCart />,
  },
  {
    path: "/user/setting",
    text: "cài đặt",
    icon: <AiOutlineSetting />,
  },
  {
    path: "/user/wishlist",
    text: "sản phẩm yêu thích",
    icon: <AiOutlineHeart />,
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogoutUser = () => {
    dispatch(handleLogout());
    router.push("/");
    Cookies.remove("token", { path: "/", domain: "localhost" });
  };
  return (
    <div className="side-bar">
      {SideBarData.map((item, index) => (
        <Link
          href={`${item.path}`}
          className={`side-bar--item ${pathname === item.path ? "active" : ""}`}
          key={index}
        >
          {item.icon}
          <div className="side-bar--text">{item.text}</div>
        </Link>
      ))}
      <div className="side-bar--item" onClick={handleLogoutUser}>
        <AiOutlineLogout />
        <div className="side-bar--text">Đăng xuất</div>
      </div>
    </div>
  );
};

export default SideBar;
