import orderInfoStyles from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { selectors, useAppDispatch, useAppSelector } from "../..";
import { wsInit, connectionClose } from "../../services/reduces/wsReducers";
import { BURGER_WS_ORDERS } from "../../utils/burger-api";
import { IIngredient } from "../../services/types/data";

interface IOrderInfoProps {
  fullPage: boolean;
  common: boolean;
}

export const OrderInfo: React.FC<IOrderInfoProps> = ({ fullPage, common }) => {
  const orderInfo = useAppSelector((state) => state.orderInfo.data);
  const ingredientsData = useAppSelector(
    (state) => state.burgerIngredients.data
  );
  const { id } = useParams<{ id?: string }>();
  const order = orderInfo.find((order) => order._id === id);
  const dispatch = useAppDispatch();

  const { ingredients, totalPrice } = useMemo(() => {
    let ingredientsUniq = new Map<IIngredient, number>();
    let ingredients: Array<IIngredient> = [];
    order?.ingredients.forEach((el) => {
      const elData = ingredientsData.find(
        (ingredient) => ingredient._id === el
      )!;
      ingredientsUniq.set(
        elData,
        ingredientsUniq.get(elData) === undefined
          ? 1
          : ingredientsUniq.get(elData)! + 1
      );
    });
    for (const [key, value] of ingredientsUniq) {
      ingredients.push({ ...key, count: value });
    }
    const totalPrice =
      ingredients === undefined
        ? 0
        : ingredients.reduce((prev, el) => prev + el.price, 0);
    return { ingredients, totalPrice };
  }, [order]);

  const dateFromServer = order?.createdAt!;

  useEffect(() => {
    if (fullPage) {
      dispatch(
        wsInit({
          url: common ? `${BURGER_WS_ORDERS}/all` : BURGER_WS_ORDERS,
          isAuth: false,
        })
      );
      return () => {
        dispatch(connectionClose());
      };
    }
  }, [dispatch]);

  return (
    <>
      {order && (
        <div className={`p-6 mt-4 ${fullPage ? orderInfoStyles.orderBox : ""}`}>
          {fullPage && (
            <p
              className={`text text_type_digits-default ${orderInfoStyles.orderNumberText}`}
            >
              {`#${order.number}`}
            </p>
          )}
          <h3 className="text text_type_main-medium mb-3 mt-10">
            {order.name}
          </h3>
          <p
            className={`text text_type_main-default mb-15 ${orderInfoStyles.orderStatus}`}
          >
            {order.status === "done"
              ? "Выполнен"
              : order.status === "pending"
              ? "Отменен"
              : "Готовится"}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <div className={orderInfoStyles.orderIngredients}>
            <ul className={orderInfoStyles.ingredientsList}>
              {ingredients.map((ingredient, index) => {
                return (
                  <li
                    className={orderInfoStyles.ingredientsListItem}
                    key={ingredient._id + "_" + index}
                  >
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
                        {ingredient.count === 1
                          ? ingredient.price
                          : `${ingredient.count} X ${ingredient.price}`}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={`mt-10 ${orderInfoStyles.orderFooter}`}>
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(dateFromServer)} />
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
        </div>
      )}
    </>
  );
};
