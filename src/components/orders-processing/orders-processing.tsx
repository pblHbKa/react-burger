import ordersProcessingStyles from "./orders-processing.module.css";
import { TOrder } from "../../services/types/data";

interface IOrdersProcessingProps {
  data: Array<TOrder>;
  totalToday: number;
  total: number;  
}

export const OrdersProcessing: React.FC<IOrdersProcessingProps> = ({ data, total, totalToday }) => {
  const doneOrders = data.filter((order) => order.status === "done");
  const inProgressOrders = data.filter((order) => order.status !== "done");

  return (
    <section>
      <div className={ordersProcessingStyles.ordersStatusBox}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={ordersProcessingStyles.ordersNumberBox}>
            <ul className={ordersProcessingStyles.ordersNumberList}>
              {doneOrders.slice(0, 10).map((el) => (
                <li className="text text_type_digits-default" key={el.number}>
                  {el.number}
                </li>
              ))}
            </ul>
            <ul className={ordersProcessingStyles.ordersNumberList}>
              {doneOrders.slice(10, 20).map((el) => (
                <li className="text text_type_digits-default" key={el.number}>
                  {el.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={ordersProcessingStyles.ordersNumberBox}>
            <ul className={ordersProcessingStyles.ordersNumberList}>
              {inProgressOrders.slice(0, 10).map((el) => (
                <li className="text text_type_digits-default" key={el.number}>
                  {el.number}
                </li>
              ))}
            </ul>
            <ul className={ordersProcessingStyles.ordersNumberList}>
              {inProgressOrders.slice(10, 20).map((el) => (
                <li className="text text_type_digits-default" key={el.number}>
                  {el.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-15 mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </section>
  );
};