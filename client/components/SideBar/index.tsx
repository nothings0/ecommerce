"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { handleLogout } from "@/redux/userSlice";
import Cookies from "js-cookie";
import "./index.scss";

interface IProps {
  data: {
    path: string;
    text: string;
    icon: JSX.Element;
  }[];
}

const SideBar: React.FC<IProps> = ({ data }) => {
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
