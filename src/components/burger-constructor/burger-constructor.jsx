import { React, useMemo, useState, useContext } from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/common";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerContext } from "../../services/app-context";
import { createOrder } from "../../utils/burger-api";

export const BurgerConstructor = () => {
  const [orderNumber, setOrderNumber] = useState(false);
  const closeOrderInfo = () => {
    setOrderNumber(0);
  };
  const [data, setData] = useContext(BurgerContext);
  let totalPrice = data.reduce((prev, el) => prev + el.price, 0);
  
  const placeOrder = () => {
    const ingredientsId = data.map(el => el._id);
    createOrder(ingredientsId)
    .then((res) => {setOrderNumber(res.order.number);})
    .catch(err => {console.log(err)});
  }

  const ingredientsGroup = useMemo(() => {
    const bun = data.filter((ingredient) => ingredient.type === "bun")[0];
    const ingredients = data.filter((ingredient) => ingredient.type !== "bun");
    return { bun: bun, ingredients: ingredients };
  }, [data]);

  return (
    data.length > 0 && (
      <>
        <section className={burgerConstructorStyles.constructorBox}>
          <div className="pl-10 pr-10 pt-25 mb-10 ml-40">
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
            <ul className={burgerConstructorStyles.ul}>
              {ingredientsGroup.ingredients.map((el) => {
                return (
                  <li key={el._id}>
                    <div className={burgerConstructorStyles.constructorElement}>
                      <DragIcon type={"primary"} />
                      <ConstructorElement
                        text={el.name}
                        price={el.price}
                        thumbnail={el.image}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="ml-8" key={`${ingredientsGroup.bun._id}_bottom`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${ingredientsGroup.bun.name} низ`}
                price={ingredientsGroup.bun.price}
                thumbnail={ingredientsGroup.bun.image}
              />
            </div>
            <div className={`mt-10 ${burgerConstructorStyles.order}`}>
              <div className={`mr-10 ${burgerConstructorStyles.order}`}>
                <p
                  className={`text text_type_digits-medium ${burgerConstructorStyles.totalPrice}`}
                >
                  {totalPrice}
                </p>
                <CurrencyIcon type="primary" />
              </div>
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
            </div>
          </div>
        </section>
        {orderNumber && (
          <Modal closeModal={closeOrderInfo}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}
      </>
    )
  );
};
