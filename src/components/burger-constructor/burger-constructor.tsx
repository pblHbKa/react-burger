import { useEffect, useMemo, useState } from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { setOrder } from "../../services/reduces/order";
import { addIngredient, addBun } from "../../services/reduces/burger-constructor";
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
import { selectors, useAppDispatch, useAppSelector } from "../..";
import { IIngredient } from "../../services/types/data";

export const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();


  const orderNumber = useAppSelector(state => state.order.number);
  const token = getCookie("accessToken");

  const closeOrderInfo = () => {
    dispatch(setOrder(null));
  };

  const ingredients = useAppSelector(state => state.burgerConstructor.ingredients);
  const bun = useAppSelector(state => state.burgerConstructor.bun)!;
  const [isOrderLoad, setIsOrderLoad] = useState(false);

  const totalPrice = useMemo(() => {
    return ingredients.reduce(
      (prev, el) => prev + el.price,
      0
    ) + (bun ? bun.price * 2 : 0);
  }, [ingredients, bun]);

  const placeOrder = () => {
    if (token) {
      setIsOrderLoad(true);
      const ingredientsId = [
        bun._id,
        ...ingredients.map((el) => el._id),
        bun._id,
      ];
      dispatch(createOrder(ingredientsId))
      .finally(() => setIsOrderLoad(false));
    } else {
      history.push("/login");
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item:IIngredient) {
      if (item.type === "bun") {
        dispatch(addBun(item));
        dispatch(bunChange(item._id));
      } else {
        dispatch(addIngredient(item));
      }
      dispatch(increaseCount(item._id));
    },
  });

  return (
    <>
      {!isOrderLoad && (
        <section
          className={burgerConstructorStyles.constructorBox}
          ref={dropTarget}
        >
          {(ingredients.length > 0 || bun) && (
            <div className="pl-10 pr-10 pt-25 mb-10 ml-40">
              {bun && (
                <div
                  className={`ml-8 ${burgerConstructorStyles.constructorElement}`}
                  key={`${bun._id}_top`}
                >
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} верх`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                </div>
              )}
              <ul className={burgerConstructorStyles.ul}>
                {ingredients.map((el) => {
                  return (
                    <li key={el.uuid}>
                      <ConstructorCard type={"primary"} el={el} />
                    </li>
                  );
                })}
              </ul>
              {bun && (
                <div
                  className="ml-8"
                  key={`${bun._id}_bottom`}
                >
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} низ`}
                    price={bun.price}
                    thumbnail={bun.image}
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
                {bun && (
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
          {(ingredients.length === 0 && bun === undefined) && (
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
