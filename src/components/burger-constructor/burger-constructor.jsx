import { useEffect, useMemo, useState } from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../services/reduces/order";
import { addIngredient } from "../../services/reduces/burger-constructor";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import {
  increaseCount,
  bunChange,
} from "../../services/reduces/burger-ingredients";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { createOrder } from "../../services/actions/burger-constructor";
import { Loader } from "../loader/loader";
import { useHistory } from "react-router-dom";
import { getCookie } from "../../utils/cookies";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orderNumber = useSelector((state) => state.order.number);
  const token = getCookie("accessToken");

  const closeOrderInfo = () => {
    dispatch(setOrder(null));
  };

  const data = useSelector((state) => state.burgerConstructor.data);
  const [isOrderLoad, setIsOrderLoad] = useState(false);

  const totalPrice = useMemo(() => {
    return data.reduce(
      (prev, el) => prev + el.price * (el.type === "bun" ? 2 : 1),
      0
    );
  }, [data]);

  const ingredientsGroup = useMemo(() => {
    const buns = data.filter((ingredient) => ingredient.type === "bun");
    const bun = buns.length ? buns[0] : null;
    const ingredients = data.filter((ingredient) => ingredient.type !== "bun");
    return { bun, ingredients };
  }, [data]);

  const placeOrder = () => {
    if (token) {
      setIsOrderLoad(true);
      const ingredientsId = [
        ingredientsGroup.bun._id,
        ...ingredientsGroup.ingredients.map((el) => el._id),
        ingredientsGroup.bun._id,
      ];
      dispatch(createOrder(ingredientsId))
      .finally(() => setIsOrderLoad(false));
    } else {
      history.push("/login");
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient(item));
      dispatch(increaseCount(item._id));
      if (item.type === "bun") {
        dispatch(bunChange(item._id));
      }
    },
  });

  return (
    <>
      {!isOrderLoad && (
        <section
          className={burgerConstructorStyles.constructorBox}
          ref={dropTarget}
        >
          {data.length > 0 && (
            <div className="pl-10 pr-10 pt-25 mb-10 ml-40">
              {ingredientsGroup.bun && (
                <div
                  className={`ml-8 ${burgerConstructorStyles.constructorElement}`}
                  key={`${ingredientsGroup.bun._id}_top`}
                >
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${ingredientsGroup.bun.name} верх`}
                    price={ingredientsGroup.bun.price}
                    thumbnail={ingredientsGroup.bun.image}
                  />
                </div>
              )}
              <ul className={burgerConstructorStyles.ul}>
                {ingredientsGroup.ingredients.map((el) => {
                  return (
                    <li key={el.uuid}>
                      <ConstructorCard type={"primary"} el={el} />
                    </li>
                  );
                })}
              </ul>
              {ingredientsGroup.bun && (
                <div
                  className="ml-8"
                  key={`${ingredientsGroup.bun._id}_bottom`}
                >
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${ingredientsGroup.bun.name} низ`}
                    price={ingredientsGroup.bun.price}
                    thumbnail={ingredientsGroup.bun.image}
                  />
                </div>
              )}
              <div className={`mt-10 ${burgerConstructorStyles.order}`}>
                <div className={`mr-10 ${burgerConstructorStyles.order}`}>
                  <p
                    className={`text text_type_digits-medium ${burgerConstructorStyles.totalPrice}`}
                  >
                    {totalPrice}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
                {ingredientsGroup.bun && (
                  <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={() => {
                      placeOrder();
                    }}
                  >
                    Оформить заказ
                  </Button>
                )}
              </div>
            </div>
          )}
          {data.length === 0 && (
            <div className={burgerConstructorStyles.initialTextBox}>
              <h2 className="text text_type_main-medium">
                Перетащи сюда ингредиенты
              </h2>
            </div>
          )}
        </section>
      )}
      {orderNumber && (
        <Modal closeModal={closeOrderInfo}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      {isOrderLoad && <Loader />}
    </>
  );
};
