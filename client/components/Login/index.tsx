"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../Button";
import "./index.scss";
import { useDispatch } from "react-redux";
import { handleLogin } from "@/redux/userSlice";
import Cookies from "js-cookie";
import axiosClient from "@/config/axiosConfig";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const data = {
      password,
      identifier: username,
    };
    try {
      const res = await axiosClient.post("/auth/local", data);
      dispatch(handleLogin(res.data));
      Cookies.set("token", res.data.jwt, {
        expires: 7,
        sameSite: "strict",
        secure: true,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-modal">
      <div className="login-head">Đăng nhập</div>
      <form action="" className="login-form">
        <div className="login-item">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            placeholder="nhập username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-item">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            placeholder="nhập password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <div className="login-button">
        <Button type="primary" size="md" OnClick={handleSubmit}>
          Login
        </Button>
      </div>
      <div className="login-link">
        Bạn chưa có tài khoản ? <Link href="/register">đăng ký tài khoản</Link>
      </div>
    </div>
  );
};

export default Login;
