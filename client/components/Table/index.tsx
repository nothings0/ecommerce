"use client";
import React, { useState } from "react";
import useFetchWithPermision from "@/app/Hooks/useFetchWithPermision";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import "./index.scss";
import { IUser } from "@/type";
import { BsFillEyeFill, BsTrash } from "react-icons/bs";
import Modal from "../Modal";
import moment from "moment";

const Table = () => {
  const [otp, setOpt] = useState<number>(1);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  const { jwt } = useSelector((state: RootState) => state.user);
  const { data } = useFetchWithPermision<IUser[]>("users", jwt);

  const handleUser = (dataUser: IUser, x: number) => {
    setOpen(true);
    setOpt(x);
    setUser(dataUser);
  };
  const openModalDelete = () => {
    setOpen(true);
    setOpt(2);
  };
  const handleDelete = () => {
    setOpen(false);
  };
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>phone number</th>
            <th>email</th>
            <th>created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.phone_number}</td>
              <td>{item.email}</td>
              <td>
                <p>{moment(item?.createdAt).format("DD-MM-YYYY")}</p>
              </td>
              <td>
                <div className="icon" onClick={() => handleUser(item, 1)}>
                  <BsFillEyeFill />
                </div>
                <div className="icon" onClick={openModalDelete}>
                  <BsTrash />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {otp === 1 ? (
        <Modal
          isOpen={isOpen}
          onOpen={setOpen}
          title="Thông tin người dùng"
          onOk={() => setOpen(false)}
        >
          <h4>{user?.name}</h4>
          <div className="box">
            <span>Địa chỉ</span>
            <p>{user?.address.text}</p>
          </div>
          <div className="box">
            <span>Số điện thoại</span>
            <p>{user?.phone_number}</p>
          </div>
          <div className="box">
            <span>Email</span>
            <p>{user?.email}</p>
          </div>
          <div className="box">
            <span>Ngày tạo</span>
            <p>{moment(user?.createdAt).format("DD-MM-YYYY")}</p>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          onOpen={setOpen}
          title="Xóa người dùng"
          onOk={handleDelete}
          onCancel={() => setOpen(false)}
        >
          <p>
            Dữ liệu người dùng xóa sẽ không thể khôi phục. Bạn có muốn xóa không
            ?
          </p>
        </Modal>
      )}
    </>
  );
};

export default Table;
