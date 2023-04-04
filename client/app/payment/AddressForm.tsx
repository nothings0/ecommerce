"use client";
import React, { useState } from "react";
import SelectDistrict from "./SelectDistrict";
import SelectProvince from "./SelectProvince";
import SelectWard from "./SelectWard";
import axios from "axios";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { handleUpdate } from "@/redux/userSlice";

interface IProps {
  onHandleIndex: (x: string) => void;
}

const AddressForm: React.FC<IProps> = ({ onHandleIndex }) => {
  const { user, jwt } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const arr = user?.address && {
    text: user?.address.text.split(", "),
    code: user?.address.code.split(", "),
  };

  const [province, setProvince] = useState<{ text: string; code: string }>({
    text: arr ? arr.text[3] : "",
    code: arr ? arr.code[2] : "",
  });
  const [district, setDistrict] = useState<{ text: string; code: string }>({
    text: arr ? arr.text[2] : "",
    code: arr ? arr.code[1] : "",
  });
  const [ward, setWard] = useState<{ text: string; code: string }>({
    text: arr ? arr.text[1] : "",
    code: arr ? arr.code[0] : "",
  });

  const [subAddress, setSubAddress] = useState<string>(arr ? arr.text[0] : "");
  const [name, setName] = useState<string>(user ? user.name : "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user ? user.phone_number : ""
  );

  const [isEdit, setEdit] = useState<boolean>(false);

  const handleAddress = async () => {
    const address = {
      text: `${subAddress}, ${ward?.text}, ${district?.text}, ${province?.text}`,
      code: `${ward?.code}, ${district?.code}, ${province?.code}`,
    };
    try {
      const res = await axios.put(
        `http://127.0.0.1:1337/api/users/${user?.id}`,
        {
          address: address,
          name,
          phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch(handleUpdate(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoOn = () => {
    if (!province || !district || !ward || !subAddress) {
      alert("vui lòng điền đầy đủ thông tin");
      return;
    }
    handleAddress();
    onHandleIndex("dec");
  };

  return (
    <div className="form-address">
      {!isEdit ? (
        <div className="address-container">
          {user?.address ? (
            <>
              <div className="box">
                <h4>
                  Xác nhận giao hàng ở địa chỉ: <p>{user?.address.text}</p>
                </h4>
                <span onClick={() => setEdit(true)}>Thay đổi</span>
              </div>
              <div className="form-button">
                <Button
                  type="primary"
                  size="md"
                  OnClick={() => onHandleIndex("inc")}
                >
                  Quay lại
                </Button>
                <Button type="primary" size="md" OnClick={handleGoOn}>
                  Tiếp tục
                </Button>
              </div>
            </>
          ) : (
            <div className="box">
              <h4>Bạn chưa cài địa chỉ giao hàng</h4>
              <span onClick={() => setEdit(true)}>Cài đặt</span>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="address-container">
            <div className="address-item">
              <label htmlFor="name">Họ và tên:</label>
              <input
                type="text"
                id="name"
                placeholder="Nhập họ và tên"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="address-item">
              <label htmlFor="name">Số điện thoại:</label>
              <input
                type="text"
                id="name"
                placeholder="Nhập số điện thoại"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>
            <SelectProvince setProvince={setProvince} value={province} />
            <SelectDistrict
              provinceCode={province?.code}
              setDistrict={setDistrict}
              value={district}
            />
            <SelectWard
              districtCode={district?.code}
              setWard={setWard}
              value={ward}
            />
            <div className="address-item">
              <label htmlFor="name">Địa chỉ:</label>
              <input
                id="name"
                placeholder="vd: 25 hoàn kiếm"
                onChange={(e) => setSubAddress(e.target.value)}
                value={subAddress}
              />
            </div>
          </div>
          <div className="form-button">
            <Button
              type="primary"
              size="md"
              OnClick={() => onHandleIndex("inc")}
            >
              Quay lại
            </Button>
            <Button type="primary" size="md" OnClick={handleGoOn}>
              Tiếp tục
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressForm;
