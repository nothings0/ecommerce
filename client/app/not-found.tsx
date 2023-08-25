import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <div className="not-found main">
      <div className="not-found__container">
        <h2>404</h2>
        <h3>Đường dẫn này không hoạt động</h3>
        <Link href="/">&lt; Quay lại trang chủ</Link>
      </div>
    </div>
  );
};

export default Custom404;
