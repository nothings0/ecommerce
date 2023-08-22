"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import PayBox from "./PayBox";
import "./index.scss";
import { IOrder, IProduct } from "@/type";
import { BsTrash } from "react-icons/bs";
import useProductStore from "@/zustand/productSlice";
import Modal from "@/components/Modal";
import useOrderStore from "@/zustand/orderSlice";

interface INewOrder {
  product: IProduct | null;
  quantity: number | null;
}

const MainCart = () => {
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrder[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);

  const { cart, removeProduct } = useProductStore();
  const { setNewOrder } = useOrderStore();

  useEffect(() => {
    let orderBefore: IOrder[] = [];
    orderBefore = cart.map((item) => ({
      product: item,
      quantity: 1,
      isChecked: false,
    }));
    setOrder(orderBefore);
  }, [cart]);

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
    setNewOrder(newOrder);
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

    setNewOrder(newOrder);
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
    setNewOrder(newOrder);
  };

  const productsArr = () => {
    const products: IOrder[] = [];
    order.forEach((item) => {
      if (item.isChecked) products.push(item);
    });
    return products;
  };

  const handleRemoveAll = () => {
    const products = productsArr();
    if (products.length <= 0) return;

    removeProduct(products);
    setOpen(!isOpen);
  };
  const handleOpen = () => {
    const products: IOrder[] = [];
    order.forEach((item) => {
      if (item.isChecked) products.push(item);
    });
    if (products.length <= 0) return;
    setOpen(true);
  };

  return (
    <main className="main-cart main">
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
              }}
            >
              <BsTrash
                size={20}
                onClick={handleOpen}
                className={productsArr().length <= 0 ? "disable" : ""}
              />
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
      <Modal
        title="Xóa khỏi giỏ hàng"
        isOpen={isOpen}
        onOk={handleRemoveAll}
        onCancel={setOpen}
        onOpen={setOpen}
      >
        <p>Bạn có muốn xóa sản phẩm khỏi giỏ hàng ?</p>
      </Modal>
    </main>
  );
};

export default MainCart;
