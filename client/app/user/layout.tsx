import React from "react";
import SideBar from "./SideBar";
import "./index.scss";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="user">
      <SideBar />
      <div className="user-main">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
