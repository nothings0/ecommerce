import React from "react";
import { IconType } from "react-icons";
import "./index.scss";

interface IProps {
  Icon?: IconType;
  OnClick?: () => void;
  size?: string;
  children?: string | React.ReactNode;
  type: string;
}
const Button: React.FC<IProps> = ({ Icon, OnClick, size, children, type }) => {

  return (
    <button className={`button ${size} ${type}`} onClick={OnClick}>
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default Button;
