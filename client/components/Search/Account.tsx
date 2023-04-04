import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import "./account.scss";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      {user ? (
        <Link href="/user">
          <div className="account-btn">
            <AiOutlineUser size={25} />
            <span>Tài khoản</span>
          </div>
        </Link>
      ) : (
        <Link href="/login">
          <div className="account-btn">
            <AiOutlineUser size={25} />
            <span>Đăng nhập</span>
          </div>
        </Link>
      )}
    </>
  );
};

export default Account;
