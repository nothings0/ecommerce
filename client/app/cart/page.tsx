"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import PayBox from "./PayBox";
import "./index.scss";
import { IOrder, IProduct } from "@/type";
import { setNewOrder } from "@/redux/orderSlice";
import { BsTrash } from "react-icons/bs";

interface INewOrder {
  product: IProduct | null;
  quantity: number | null;
}

const MainCart = () => {
  const dispatch = useDispatch();

  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrder[]>([]);

  const { cart } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    let orderBefore: IOrder[] = [];
    orderBefore = cart.map((item) => ({
      product: item,
      quantity: 1,
      isChecked: false,
    }));
    setOrder(orderBefore);
  }, []);

  const handleCheckAll = (event: React.FormEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    setIsCheckedAll(checked);
    const arr = order.map((item) => ({
      ...item,
      isChecked: checked,
    }));
    setOrder(arr);
    const newOrder: IOrder[] = [];
    arr.forEach((item) => {
      if (item.isChecked) {
        let newObj: INewOrder = {
          product: item.product,
          quantity: item.quantity,
        };
        newOrder.push(newObj);
      }
    });
    dispatch(setNewOrder(newOrder));
  };

  const handleCheckboxChange = (id: number) => {
    const arr = order.map((item) =>
      item.product?.id === id ? { ...item, isChecked: !item.isChecked } : item
    );

    setOrder(arr);
    const newOrder: IOrder[] = [];
    arr.forEach((item) => {
      if (item.isChecked) {
        let newObj: INewOrder = {
          product: item.product,
          quantity: item.quantity,
        };
        newOrder.push(newObj);
      }
    });

    dispatch(setNewOrder(newOrder));
    const check = arr.every((item) => item.isChecked);

    if (check) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  };

  const handleQuantity = (newQuantity: number, id: number) => {
    const arr = order.map((item) =>
      item.product?.id === id
        ? {
            ...item,
            quantity: newQuantity,
          }
        : item
    );
    setOrder(arr);
    const newOrder: IOrder[] = [];
    arr.forEach((item) => {
      if (item.isChecked) {
        let newObj: INewOrder = {
          product: item.product,
          quantity: item.quantity,
        };
        newOrder.push(newObj);
      }
    });
    dispatch(setNewOrder(newOrder));
  };

  return (
    <main className="main-cart">
      <div className="main-cart__container">
        <div className="main-cart__wrap">
          <div className="main-cart__header">
            <div style={{ flex: 3 }}>
              <input
                type="checkbox"
                name=""
                id="checkbox"
                checked={isCheckedAll}
                onChange={handleCheckAll}
              />
              <label htmlFor="checkbox">Tất cả</label>
            </div>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
            <span
              style={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
              }}
            >
              <BsTrash size={20} />
            </span>
          </div>
          <div className="main-cart__table">
            {order.length > 0 ? (
              order.map((item, index) => (
                <CartItem
                  data={item}
                  onChange={handleCheckboxChange}
                  onHandleQuantity={handleQuantity}
                  key={index}
                />
              ))
            ) : (
              <div style={{ backgroundColor: "#fff", padding: "5px 15px" }}>
                Chưa có sản phẩm nào trong giỏ hàng
              </div>
            )}
          </div>
        </div>
        <PayBox />
      </div>
    </main>
  );
};

export default MainCart;
