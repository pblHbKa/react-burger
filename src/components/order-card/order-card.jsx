import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderCardStyles from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { orderType } from "../../utils/common";

export const OrderCard = ({ order }) => {
  const location = useLocation();
  const ingredientsData = useSelector((state) => state.burgerIngredients.data);

  const ingredients = useMemo(() => {
    return order.ingredients.map((el) =>
      ingredientsData.find((ingredient) => ingredient._id === el)
    );
  }, [order]);

  const totalPrice = useMemo(() => {
    return ingredients.reduce((prev, el) => prev + el.price, 0);
  }, [ingredients]);

  const dateFromServer = order.createdAt;

  return (
    <Link
      to={{
        pathname: `/feed/${order._id}`,
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
            {ingredients.map((ingredient, index) => {
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
                  </div>
                </li>
              );
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

OrderCard.propTypes = {
  order: orderType.isRequired,
};
