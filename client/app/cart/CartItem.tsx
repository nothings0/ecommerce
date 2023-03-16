import React, { useState } from "react";
import { IOrder } from "@/type";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import Link from "next/link";
import { fomatCurrency } from "@/utities";
import Modal from "@/components/Modal";

interface IProps {
  data: IOrder;
  onChange: (id: number) => void;
  onHandleQuantity: (quantity: number, id: number) => void;
}

const URL = "http://127.0.0.1:1337";
const CartItem: React.FC<IProps> = ({ onChange, data, onHandleQuantity }) => {
  const { product, quantity, isChecked } = data;
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity!);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleQuantity = (qnt: number) => {
    if (qnt === 0 || isNaN(qnt)) return;
    setCurrentQuantity(qnt);
    onHandleQuantity(qnt, product!.id);
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
            <span onClick={() => handleQuantity(quantity! - 1)}>-</span>
            <span>
              <input
                type="tel"
                value={currentQuantity.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleQuantity(parseFloat(e.currentTarget.value))
                }
              />
            </span>
            <span onClick={() => handleQuantity(quantity! + 1)}>+</span>
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
            <BsTrash size={20} onClick={() => setOpen(!isOpen)} />
          </span>
        </>
      )}
      <Modal
        title="a"
        isOpen={isOpen}
        onOk={() => setOpen(!isOpen)}
        onCancel={() => setOpen(!isOpen)}
        onOpen={() => setOpen(!isOpen)}
      >
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro itaque
          explicabo blanditiis reiciendis pariatur id, saepe beatae provident
          nihil dignissimos, quas tenetur architecto obcaecati facilis
          voluptatem similique inventore consequuntur quae?
        </p>
      </Modal>
    </div>
  );
};

export default CartItem;
