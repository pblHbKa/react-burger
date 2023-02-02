import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderCardStyles from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { selectors, useAppSelector } from "../..";
import { IOrder } from "../../services/types/data";

interface IOrderCardProps {
  order: IOrder;
  common: boolean;
}

export const OrderCard: React.FC<IOrderCardProps> = ({ order, common }) => {
  const location = useLocation();
  const ingredientsData = useAppSelector(
    (state) => state.burgerIngredients.data
  );

  const ingredients = useMemo(() => {
    return order.ingredients.map(
      (el) => ingredientsData.find((ingredient) => ingredient._id === el)!
    );
  }, [order]);

  const totalPrice = useMemo(() => {
    return ingredients.reduce((prev, el) => prev + el?.price, 0);
  }, [ingredients]);

  const dateFromServer = order.createdAt;

  return (
    <Link
      to={{
        pathname: common ? `/feed/${order._id}` : `/profile/orders/${order._id}`,
        state: { background: location },
      }}
      key={order._id}
      className={orderCardStyles.link}
    >
      <div className={`p-6 mt-4 ${orderCardStyles.card}`}>
        <div className={`${orderCardStyles.cardHead}`}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(dateFromServer)} />
          </p>
        </div>
        <h3 className="text text_type_main-medium mb-6 mt-6">{order.name}</h3>
        <div className={orderCardStyles.orderInfo}>
          <ul className={orderCardStyles.ingredientsList}>
            {ingredients.slice(0, 6).map((ingredient, index) => {
              if (ingredient) {
                return (
                  <li
                    className={orderCardStyles.ingredientsListItem}
                    key={ingredient._id + "_" + index}
                  >
                    <div className={orderCardStyles.ingredientPreview}>
                      <img
                        src={ingredient.image_mobile}
                        alt={ingredient.name}
                        className={orderCardStyles.ingredientImg}
                      />
                      {index === 5 && (
                        <div
                          className={
                            orderCardStyles.hiddenIngredientsBackground
                          }
                        >
                          <p
                            className={`text text_type_main-default ${orderCardStyles.hiddenIngredientsCount}`}
                          >{`+${ingredients.length - 5}`}</p>
                        </div>
                      )}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
          <div className={orderCardStyles.priceInfo}>
            <p
              className={`text text_type_digits-default ${orderCardStyles.totalPrice}`}
            >
              {totalPrice}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
