"use client";
import React from "react";
import useFetchWithPermision from "../Hooks/useFetchWithPermision";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store";
import order_1 from "@/assets/order-1.png";
import Button from "@/components/Button";
import { FaPen } from "react-icons/fa";
import { IUser } from "@/type";
// import axiosClient from "@/config/axiosConfig";

const User = () => {
  const { jwt } = useSelector((state: RootState) => state.user);
  const { data } = useFetchWithPermision<IUser>("/users/me", jwt);

  // const updateUser = async () => {
  //   try {
  //     const res = await axiosClient.put(`/users/${data?.id}`, )
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      {data && (
        <div className="account">
          <div className="wrap">
            <div className="account__top">
              <div className="account__top-img">
                <Image alt="" src={order_1} />
                <div className="account__top-btn">
                  <FaPen />
                </div>
              </div>
              <div className="account__top-text">
                <h4>{data.name}</h4>
                <p>{data.address.text}</p>
              </div>
            </div>
            <div className="account__bottom">
              <div className="account__bottom-box">
                <div className="account__bottom-box--input">
                  <label htmlFor="">Name</label>
                  <input value={data.name} type="text" placeholder="name" />
                </div>
                <div className="account__bottom-box--input">
                  <label htmlFor="">Full name</label>
                  <input value={data.name} type="text" placeholder="name" />
                </div>
              </div>
              <div className="account__bottom-box">
                <div className="account__bottom-box--input">
                  <label htmlFor="">Email address</label>
                  <input
                    value={data.email}
                    type="email"
                    placeholder="Email address"
                  />
                </div>
                <div className="account__bottom-box--input">
                  <label htmlFor="">Phone number</label>
                  <input
                    value={data.phone_number}
                    type="text"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div className="account__bottom-box">
                <div className="account__bottom-box--input">
                  <label htmlFor="">Location</label>
                  <input
                    value={data.address.text}
                    type="text"
                    placeholder="Location"
                  />
                </div>
                <div className="account__bottom-box--input">
                  <label htmlFor="">Postal code</label>
                  <input
                    value={data.postal_code}
                    type="text"
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>
            <div className="account__btn">
              <Button type="primary" size="md">
                Save changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
