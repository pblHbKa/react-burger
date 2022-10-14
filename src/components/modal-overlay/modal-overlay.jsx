import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {

    return (
        <div className={`${modalOverlayStyles.overlay} overlay`} onClick={props.onClick}>
            {props.children}
        </div>
    );

}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
};

export {ModalOverlay};