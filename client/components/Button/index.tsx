import React from "react";
import { IconType } from "react-icons";
import "./index.scss";

interface IProps {
  Icon?: IconType;
  OnClick?: () => void;
  size?: string;
  children?: string | React.ReactNode;
  type: string;
  typeBtn?: "button" | "submit" | "reset";
}
const Button: React.FC<IProps> = ({
  Icon,
  OnClick,
  size,
  children,
  type,
  typeBtn,
}) => {
  return (
    <button
      className={`button ${size} ${type}`}
      onClick={OnClick}
      type={typeBtn}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default Button;
