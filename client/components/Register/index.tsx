"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../Button";
import "./index.scss";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      username,
      email,
      password,
    };
    try {
      await axios.post("http://127.0.0.1:1337/api/auth/local/register", data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-modal">
      <div className="register-head">Đăng ký</div>
      <form action="" className="register-form">
        <div className="register-item">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            placeholder="nhập username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="register-item">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            placeholder="nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register-item">
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
      <div className="register-button">
        <Button type="primary" size="md" OnClick={handleSubmit}>
          register
        </Button>
      </div>
      <div className="register-link">
        Bạn đã có tài khoản ? <Link href="/login">đăng nhập</Link>
      </div>
    </div>
  );
};

export default Register;
