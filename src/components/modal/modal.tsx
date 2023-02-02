import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDom from "react-dom";
import modalStyles from "./modal.module.css";
import { useEffect } from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useParams } from "react-router-dom";
import { selectors, useAppSelector } from "../..";

const modalRoot = document.getElementById("root")!;

interface IModalProps {
  closeModal(): void;
  title?: string;
  children?: React.ReactNode
}

export const Modal: React.FC<IModalProps> = ({ closeModal, title, children }) => {

  useEffect(() => {
    const onKeydown = (ev: KeyboardEvent) => {
      ev.key === "Escape" && closeModal();
    };
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return ReactDom.createPortal(
    <>
      <div className={modalStyles.modalBlock}>
        {title && (
          <h4 className="text text_type_main-large ml-10 mr-10 mt-10">
            {title}
          </h4>
        )}
        <div
          onClick={closeModal}
          className={`${modalStyles.closeButton} mt-15 mr-10`}
        >
          <CloseIcon type="primary" />
        </div>
        <div className={modalStyles.details}>{children}</div>
      </div>
      <ModalOverlay onClick={closeModal} />
    </>,
    modalRoot
  );
};