import modalOverlayStyles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const ModalOverlay: React.FC<IModalOverlayProps> = (props) => {
  return (
    <div
      className={`${modalOverlayStyles.overlay} overlay`}
      onClick={props.onClick}
    />
  );
};