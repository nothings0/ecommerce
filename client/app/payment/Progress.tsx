import React from "react";

interface IProps {
  index: number;
}

const Progress: React.FC<IProps> = ({ index }) => {
  return (
    <div className="progress">
      <div className="step">hình thức</div>
      <div className="step">địa chỉ</div>
      <div className="step">xác nhận</div>
      <div
        className="line"
        style={{ width: `${Math.floor(100 / 2) * index}%` }}
      ></div>
    </div>
  );
};

export default Progress;
