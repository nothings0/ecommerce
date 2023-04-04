import Button from "@/components/Button";
import Modal from "@/components/Modal";
import axiosClient from "@/config/axiosConfig";
import { removeProduct } from "@/redux/productSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  onHandleIndex: (x: string) => void;
}

const ConfirmForm: React.FC<IProps> = ({ onHandleIndex }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { order } = useSelector((state: RootState) => state.order);
  const [isOpen, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { jwt } = useSelector((state: RootState) => state.user);
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
      dispatch(removeProduct(order));
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
