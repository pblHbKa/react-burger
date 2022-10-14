import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {

    return (
        <div className={modalOverlayStyles.overlay}>
            {props.children}
        </div>
    );

}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
};

export {ModalOverlay};