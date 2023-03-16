import React from "react";
import AddressForm from "./AddressForm";
import ConfirmForm from "./ConfirmForm";
import PaymentForm from "./PaymentForm";
import Progress from "./Progress";

interface IProps {
  index: number;
  onHandleIndex: (x: string) => void;
}

const MultiForm: React.FC<IProps> = ({ index, onHandleIndex }) => {
  return (
    <div className="main-payment">
      <h4>Thanh toán</h4>
      <Progress index={index} />
      <div className="form">
        {index === 0 ? (
          <PaymentForm onHandleIndex={onHandleIndex} />
        ) : (
          <>
            {index === 1 ? (
              <AddressForm onHandleIndex={onHandleIndex} />
            ) : (
              <ConfirmForm onHandleIndex={onHandleIndex} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MultiForm;
