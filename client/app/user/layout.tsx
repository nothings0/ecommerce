import React from "react";
import SideBar from "@/components/SideBar";
import "./index.scss";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { Metadata } from "next";
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
    path: "/user/wishlist",
    text: "sản phẩm yêu thích",
    icon: <AiOutlineHeart />,
  },
];

export const metadata: Metadata = {
  title: "Trang người dùng",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="user main">
      <SideBar data={SideBarData} />
      <div className="user-main">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
