"use client";
import React from "react";
import useFetchWithPermision from "../Hooks/useFetchWithPermision";
import Image from "next/image";
import order_1 from "@/assets/order-1.png";
import Button from "@/components/Button";
import { FaPen } from "react-icons/fa";
import { IUser } from "@/type";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserStore from "@/zustand/userSlice";

const User = () => {
  const { jwt } = useUserStore();
  const { data } = useFetchWithPermision<IUser>("/users/me", jwt);

  // const updateUser = async () => {
  //   try {
  //     const res = await axiosClient.put(`/users/${data?.id}`, )
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    useFormik({
      initialValues: {
        name: "",
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        location: "",
        postalCode: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Required"),
        fullName: Yup.string().required("Required"),
        emailAddress: Yup.string().required("Required"),
        phoneNumber: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        postalCode: Yup.string().required("Required"),
      }),
      onSubmit: async (values) => {
        try {
        } catch (error: any) {
          // setError(error.response.data.error.message);
        }
      },
    });

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
                  <label htmlFor="name">Name</label>
                  <input
                    value={values.name || data.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="name"
                    id="name"
                  />
                </div>
                <div className="account__bottom-box--input">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    value={values.fullName || data.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="name"
                    id="fullName"
                  />
                </div>
              </div>
              <div className="account__bottom-box">
                <div className="account__bottom-box--input">
                  <label htmlFor="emailAddress">Email address</label>
                  <input
                    value={values.emailAddress || data.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    placeholder="Email address"
                    id="emailAddress"
                  />
                </div>
                <div className="account__bottom-box--input">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    value={values.phoneNumber || data.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Phone number"
                    id="phoneNumber"
                  />
                </div>
              </div>
              <div className="account__bottom-box">
                <div className="account__bottom-box--input">
                  <label htmlFor="location">Location</label>
                  <input
                    value={values.location || data.address.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Location"
                    id="location"
                  />
                </div>
                <div className="account__bottom-box--input">
                  <label htmlFor="postalCode">Postal code</label>
                  <input
                    value={values.postalCode || data.postal_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Postal code"
                    id="postal_code"
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
