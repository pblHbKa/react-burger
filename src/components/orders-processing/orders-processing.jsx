import ordersProcessingStyles from "./orders-processing.module.css";

export const OrdersProcessing = () => {
  return (
    <section>
      <div className={ordersProcessingStyles.ordersStatusBox}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={ordersProcessingStyles.ordersNumberBox}>
            <ul className={ordersProcessingStyles.ordersNumberList}>
              <li className="text text_type_digits-default">034533</li>
              <li className="text text_type_digits-default">034533</li>
              <li className="text text_type_digits-default">034533</li>
              <li className="text text_type_digits-default">034533</li>
              <li className="text text_type_digits-default">034533</li>
            </ul>
            <ul className={ordersProcessingStyles.ordersNumberList}>
              <li className="text text_type_digits-default">034533</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={ordersProcessingStyles.ordersNumberBox}>
            <ul className={ordersProcessingStyles.ordersNumberList}>
              <li className="text text_type_digits-default">034533</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-15 mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">28 752</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">138</p>
      </div>
    </section>
  );
};
