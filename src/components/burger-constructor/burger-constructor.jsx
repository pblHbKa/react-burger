import { React, useMemo, useState, useContext, useEffect } from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { createOrder } from "../../utils/burger-api";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../services/reduces/order";
import {
  addIngredient,
  setData,
} from "../../services/reduces/burger-constructor";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import {
  increaseCount,
  bunChange
} from "../../services/reduces/burger-ingredients";
import { data as constructorData } from "../../utils/data";
import { ConstructorCard } from "../constructor-card/constructor-card";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const orderNumber = useSelector((state) => state.order.number);

  const closeOrderInfo = () => {
    dispatch(setOrder(0));
  };
  const data = useSelector((state) => state.burgerConstructor.data);
  let totalPrice = useMemo(() =>{
    return data.reduce((prev, el) => prev + el.price * (el.type === "bun" ? 2 : 1), 0);
  }, [data]);

  const ingredientsGroup = useMemo(() => {
    const bun = data.filter((ingredient) => ingredient.type === "bun")[0];
    const ingredients = data.filter((ingredient) => ingredient.type !== "bun");
    return { bun, ingredients };
  }, [data]);

  const placeOrder = () => {
    const ingredientsId = [
      ingredientsGroup.bun._id,
      ...ingredientsGroup.ingredients.map((el) => el._id),
      ingredientsGroup.bun._id
    ];
    createOrder(ingredientsId)
      .then((res) => {
        dispatch(setOrder(res.order.number));
      })
      .catch((err) => {
        console.log(err);
      });
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
        <section
          className={burgerConstructorStyles.constructorBox}
          ref={dropTarget}
        >
          {data.length > 0 && (
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
                  <li key={el.uuid}>
                    <ConstructorCard 
                    type={"primary"} 
                    el={el}
                    />
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
          )}
        </section>
        {orderNumber != 0 && (
          <Modal closeModal={closeOrderInfo}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}
      </>
  );
};
