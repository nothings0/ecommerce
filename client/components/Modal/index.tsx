import useClickOutside from "@/app/Hooks/useClickOutside";
import React, { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";
import "./index.scss";

interface IProps {
  children: React.ReactElement | React.ReactNode[];
  isOpen: boolean;
  onOk?: () => void;
  onCancel?: (value: React.SetStateAction<boolean>) => void;
  onOpen: (value: React.SetStateAction<boolean>) => void;
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
  const handleOpen = () => {
    onOpen(!isOpen);
  };
  const handleCancel = () => {
    onOpen(!isOpen);
  };
  const modalRef = useRef(null);

  useClickOutside(modalRef, isOpen, onOpen);
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-wrap" ref={modalRef}>
            <div className="modal-header">
              <h3>{title}</h3>
              <div className="icon">
                <AiOutlineClose size={20} onClick={handleOpen} />
              </div>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {onCancel && (
                <Button type="cancel" OnClick={handleCancel} size="md">
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
