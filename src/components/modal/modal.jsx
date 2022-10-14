import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDom from "react-dom";
import modalStyles from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect }  from 'react';
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("root");

const Modal = (props) => {

    const closeModal = props.closeModal;

    useEffect(() => {

        const onKeydown = (ev) => {
            ev.key === 'Escape' && closeModal();
        }

        document.addEventListener('keydown', onKeydown);

        return () => {
            document.removeEventListener('keydown', onKeydown);
        }

    });

    return ReactDom.createPortal(
        <ModalOverlay>
        <div className={modalStyles.modalBlock}>
            <h4 className="text text_type_main-large ml-10 mr-10 mt-10">Hf,jnftn</h4>
            <div onClick={props.closeModal} className={`${modalStyles.closeButton} mt-15 mr-10`}>
                <CloseIcon type="primary" />
            </div>
            <div className={modalStyles.details}>
                {props.children}
            </div>
        </div>
        </ModalOverlay>
        , modalRoot);

};

Modal.propTypes = {
    children: PropTypes.node.isRequired
};

export { Modal }