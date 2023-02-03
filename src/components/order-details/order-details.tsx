import orderDetailsStyles from "./order-details.module.css";
import doneImg from "../../images/done.png";

interface IOrderDetailsProps {
  orderNumber: number;
}

export const OrderDetails: React.FC<IOrderDetailsProps> = (props) => {
  return (
    <div className={orderDetailsStyles.orderDetails}>
      <h5
        className={`text text_type_digits-large mt-30 ${orderDetailsStyles.orderNumber}`}
      >
        {props.orderNumber}
      </h5>
      <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
      <img src={doneImg} alt="Заказ принят" className="mt-15 mb-15" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="mt-2 mb-30 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};