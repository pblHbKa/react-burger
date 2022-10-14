import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = (props) => {

    return (
        <div className={modalOverlayStyles.overlay}>
            {props.children}
        </div>
    );

}

export {ModalOverlay};