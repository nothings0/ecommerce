import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";
import "./index.scss";

interface IProps {
  children: React.ReactElement;
  isOpen: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onOpen: () => void;
  title: string;
}

const Modal: React.FC<IProps> = ({
  children,
  isOpen,
  onCancel,
  onOk,
  title,
  onOpen,
}) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-wrap">
            <div className="modal-header">
              <h3>{title}</h3>
              <AiOutlineClose size={20} onClick={onOpen} />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {onCancel && (
                <Button type="cancel" OnClick={onCancel} size="md">
                  cancel
                </Button>
              )}
              {onOk && (
                <Button type="ok" OnClick={onOk} size="md">
                  ok
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
