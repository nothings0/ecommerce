import React from "react";
import SideBar from "@/components/SideBar";
import { RxDashboard } from "react-icons/rx";
import "./index.scss";
import {
  AiOutlineShoppingCart,
  AiOutlineCodeSandbox,
  AiOutlinePlusCircle,
} from "react-icons/ai";

const SideBarData = [
  {
    path: "/admin",
    text: "Dashboard",
    icon: <RxDashboard />,
  },
  {
    path: "/admin/order",
    text: "Order",
    icon: <AiOutlineShoppingCart />,
  },
  {
    path: "/admin/product",
    text: "Product",
    icon: <AiOutlineCodeSandbox />,
  },
  {
    path: "/admin/create",
    text: "Create",
    icon: <AiOutlinePlusCircle />,
  },
];
const layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div className="admin main">
      <SideBar data={SideBarData} />
      <div className="admin-main">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default layout;
