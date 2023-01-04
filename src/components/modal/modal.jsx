import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDom from "react-dom";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "../..";

const modalRoot = document.getElementById("root");

const Modal = ({ closeModal, title, children }) => {
  const { id } = useParams();
  const orderInfo = useSelector(selectors.orderInfoData);
  if (id !== undefined) {
    const order = orderInfo.find((order) => order._id === id);
    title = `#${order.number}`;
  }

  useEffect(() => {
    const onKeydown = (ev) => {
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

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export { Modal };
