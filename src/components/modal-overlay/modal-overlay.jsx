import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
  return (
    <div
      className={`${modalOverlayStyles.overlay} overlay`}
      onClick={props.onClick}
    />
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { ModalOverlay };
