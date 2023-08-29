import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import "./account.scss";
import useUserStore from "@/zustand/userSlice";

const Account = () => {
  const { user } = useUserStore();
  const [userState, setUserState] = useState<any>();

  useEffect(() => {
    setUserState(user);
  }, [userState, user]);

  return (
    <>
      {userState ? (
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
