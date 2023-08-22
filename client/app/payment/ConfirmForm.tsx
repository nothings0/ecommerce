import React, { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import axiosClient from "@/config/axiosConfig";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/userSlice";
import useOrderStore from "@/zustand/orderSlice";
import useProductStore from "@/zustand/productSlice";

interface IProps {
  onHandleIndex: (x: string) => void;
}

const ConfirmForm: React.FC<IProps> = ({ onHandleIndex }) => {
  const { user, jwt } = useUserStore();
  const { order } = useOrderStore();
  const { removeProduct } = useProductStore();

  const [isOpen, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const handleOrder = async () => {
    const data = {
      customer_id: user?.id,
      products: order,
    };
    try {
      await axiosClient.post("/orders", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      removeProduct(order);
      setOpen(!isOpen);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    router.push("/user/order");
  };

  return (
    <div className="form-confirm">
      <div className="form-container">
        <div className="confirm-item">
          Xác nhận giao hàng ở địa chỉ: <span>{user?.address.text}</span>
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
