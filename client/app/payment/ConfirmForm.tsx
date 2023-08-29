import React, { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { axiosPrimary } from "@/config/axiosConfig";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/userSlice";
import useOrderStore from "@/zustand/orderSlice";
import useProductStore from "@/zustand/productSlice";
import axios from "axios";
import { IOrder } from "@/type";

interface IProps {
  onHandleIndex: (x: string) => void;
}

const ConfirmForm: React.FC<IProps> = ({ onHandleIndex }) => {
  const { user, jwt } = useUserStore();
  const { order, deliveryType, removeOrder } = useOrderStore();
  const { removeProduct } = useProductStore();

  const [isOpen, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const handleOrder1 = async () => {
    const data = {
      customer_id: user?.id,
      products: order,
    };
    try {
      await axiosPrimary.post("/orders", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      removeOrder();
      removeProduct(order);
      setOpen(!isOpen);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async () => {
    if (deliveryType.id === 2) {
      const res = await axios.get(
        `https://x-ecommerce.vercel.app/api/vnpay?amount=${handleTotal(order)}`
      );
      window.location.replace(res.data);
    } else if (deliveryType.id === 3) {
      const res = await axios.get(
        `https://x-ecommerce.vercel.app/api/momo?amount=${handleTotal(order)}`
      );
      window.location.replace(res.data);
    } else {
      handleOrder1();
    }
  };

  const handleOk = () => {
    router.push("/user/order");
  };

  const handleTotal = (order: IOrder[]) => {
    let total = 0;
    if (order.length > 0) {
      for (let item of order) {
        total += item.product?.attributes.price! * item.quantity!;
      }
    }
    return total;
  };

  return (
    <div className="form-confirm">
      <div className="form-container">
        <div className="confirm-item">
          Xác nhận giao hàng ở địa chỉ: <span>{user?.address.text}</span>
        </div>
        <div className="confirm-item">
          Hình thức giao hàng: <span>{deliveryType.text}</span>
        </div>
        <div className="confirm-item">
          Vui lòng kiểm tra thông tin nhận hàng, đọc kỹ chính sách mua, đổi trả
          hàng.
        </div>
      </div>
      <div className="form-button">
        <Button type="primary" size="md" OnClick={() => onHandleIndex("inc")}>
          Quay lại
        </Button>
        <Button type="primary" size="md" OnClick={handleOrder}>
          Xác nhận
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        title="Thanh toán"
        onOpen={setOpen}
        onOk={handleOk}
      >
        <p>Đặt hàng thành công!</p>
      </Modal>
    </div>
  );
};

export default ConfirmForm;
