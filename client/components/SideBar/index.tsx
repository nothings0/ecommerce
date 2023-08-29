"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
import "./index.scss";
import useUserStore from "@/zustand/userSlice";

interface IProps {
  data: {
    path: string;
    text: string;
    icon: JSX.Element;
  }[];
}

const SideBar: React.FC<IProps> = ({ data }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { handleLogout } = useUserStore();

  const handleLogoutUser = () => {
    handleLogout();
    // Cookies.remove("token", { path: "/", domain: "x-ecommerce.vercel.app" });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  return (
    <div className="side-bar">
      {data.map((item, index) => (
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
