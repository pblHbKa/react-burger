import orderInfoStyles from "./order-info.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMemo, useEffect } from "react";

export const OrderInfo = ({ fullPage }) => {
  const orderInfo = useSelector((state) => state.orderInfo.data);
  const ingredientsData = useSelector((state) => state.burgerIngredients.data);
  const { id } = useParams();
  const order = orderInfo.find((order) => order._id === id);
  const dispatch = useDispatch();

  const {ingredients, totalPrice} = useMemo(() => {
    const ingredients = order?.ingredients.map((el) =>
      ingredientsData.find((ingredient) => ingredient._id === el)
    );
    const totalPrice = ingredients === undefined ?  0 : ingredients.reduce(
      (prev, el) => prev + el.price,
      0
    );
    return {ingredients, totalPrice}
  }, [order]);

  const dateFromServer = order?.createdAt;

  useEffect(() => {
    dispatch({
      type: "WS_CONNECTION_START",
      payload: {
        url: "wss://norma.nomoreparties.space/orders/all",
        isAuth: true,
      },
    });
    return () => {
      dispatch({
        type: "WS_CONNECTION_STOP",
      });
    };
  }, [dispatch]);

  return (
    <>
    {order && 
      <div className={`p-6 mt-4 ${fullPage ? orderInfoStyles.orderBox : ""}`}>
      {fullPage && (
        <p
          className={`text text_type_digits-default ${orderInfoStyles.orderNumberText}`}
        >
          {`#${order.number}`}
        </p>
      )}
      <h3 className="text text_type_main-medium mb-3 mt-10">{order.name}</h3>
      <p
        className={`text text_type_main-default mb-15 ${orderInfoStyles.orderStatus}`}
      >
        {order.status === "done" ? "Выполнен" : order.status === "pending" ? "Отменен" :"Готовится"}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={orderInfoStyles.orderIngredients}>
        <ul className={orderInfoStyles.ingredientsList}>
          {ingredients.map((ingredient, index) => {
            return (
              <li className={orderInfoStyles.ingredientsListItem} key={ingredient._id + "_" + index}>
                <div className={orderInfoStyles.nameImgBox}>
                <div className={orderInfoStyles.ingredientPreview}>
                  <img
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                    className={orderInfoStyles.ingredientImg}
                  />
                </div>
                <p className="text text_type_main-medium ml-4 mr-4">
                {ingredient.name}
                </p>
                </div>
                <div className={orderInfoStyles.totalPriceBox}>
                  <p
                    className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
                  >
                    {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={`mt-10 ${orderInfoStyles.orderFooter}`}>
          <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(dateFromServer)}/>
          </p>
          <div className={orderInfoStyles.totalPriceBox}>
            <p
              className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
            >
              {totalPrice}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div> }
    </>
  );
};

OrderInfo.propTypes = {
  fullPage: PropTypes.bool,
};
