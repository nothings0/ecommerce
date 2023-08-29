import React, { useState } from "react";
import { IOrder } from "@/type";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import Link from "next/link";
import { fomatCurrency } from "@/utities";
import Modal from "@/components/Modal";
import useProductStore from "@/zustand/productSlice";

interface IProps {
  data: IOrder;
  onChange: (id: number) => void;
  onHandleQuantity: (quantity: number, id: number) => void;
}

const URL = "https://backend-md7c.onrender.com";
const CartItem: React.FC<IProps> = ({ onChange, data, onHandleQuantity }) => {
  const { product, quantity, isChecked } = data;
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity!);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { removeCart } = useProductStore();

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(e.target.value))) {
      setCurrentQuantity(0);
      onHandleQuantity(0, product!.id);
    } else {
      setCurrentQuantity(parseFloat(e.target.value));
      onHandleQuantity(parseFloat(e.target.value), product!.id);
    }
  };
  const hanleQuantity2 = (qnt: number) => {
    if (qnt < 1) {
      setCurrentQuantity(1);
      onHandleQuantity(1, product!.id);
    } else {
      setCurrentQuantity(qnt);
      onHandleQuantity(qnt, product!.id);
    }
  };

  const handleRemove = () => {
    removeCart([product!]);
    setOpen(!isOpen);
  };

  return (
    <div className="cart-item">
      {product && (
        <>
          <div style={{ flex: 3 }} className="cart-item__info">
            <div className="cart-item__check">
              <input
                type="checkbox"
                name=""
                id=""
                checked={isChecked}
                onChange={() => onChange(product.id)}
              />
            </div>
            <div className="cart-item__img">
              <Image
                src={`${URL}${product.attributes.picture_cover.data[0].attributes.url}`}
                alt=""
                width={`${Number(
                  product.attributes.picture_cover.data[0].attributes.width
                )}`}
                height={`${Number(
                  product.attributes.picture_cover.data[0].attributes.height
                )}`}
              />
            </div>
            <div className="cart-item__name">
              <Link href={`/product/${product.id}`}>
                {product.attributes.name}
              </Link>
            </div>
          </div>
          <span style={{ flex: 1 }}>
            {fomatCurrency(product.attributes.price)}
          </span>
          <div style={{ flex: 1 }} className="quantity">
            <span onClick={() => hanleQuantity2(quantity! - 1)}>-</span>
            <span>
              <input
                type="tel"
                value={currentQuantity.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleQuantity(e)
                }
              />
            </span>
            <span onClick={() => hanleQuantity2(quantity! + 1)}>+</span>
          </div>
          <span style={{ flex: 1 }}>
            {fomatCurrency(quantity! * product.attributes.price)}
          </span>
          <span
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
          >
            <BsTrash size={20} onClick={() => setOpen(true)} />
          </span>
        </>
      )}
      <Modal
        title="Xóa khỏi giỏ hàng"
        isOpen={isOpen}
        onOk={handleRemove}
        onCancel={setOpen}
        onOpen={setOpen}
      >
        <p>Bạn có muốn xóa sản phẩm khỏi giỏ hàng ?</p>
      </Modal>
    </div>
  );
};

export default CartItem;
