import { React, useMemo, useState } from "react";
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

export const BurgerConstructor = ({data}) => {

  const [isOrderSend, setOrderSend] = useState(false);
  const closeOrderInfo = () => {
    setOrderSend(false);
  };

  const ingredientsGroup = useMemo(() => {
    const bun = data.filter(
      (ingredient) => ingredient.type === "bun"
    );
    const ingredients = data.filter(
      (ingredient) => ingredient.type !== "bun"
    );
    return {"bun":bun, "ingredients":ingredients};
  }, [data]);

  return (
    data.length > 0 && (
      <>
        <section className={burgerConstructorStyles.constructorBox}>
          <div className="pl-10 pr-10 pt-25 mb-10 ml-40">
            <ul className={burgerConstructorStyles.ul}>
              <li
                className={`ml-8 ${burgerConstructorStyles.li}`}
                key={ingredientsGroup.bun[0]._id}
              >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={ingredientsGroup.bun[0].name}
                  price={ingredientsGroup.bun[0].price}
                  thumbnail={ingredientsGroup.bun[0].image}
                />
              </li>
              {ingredientsGroup.ingredients
                .map((el) => {
                  return (
                    <li className={burgerConstructorStyles.li} key={el._id}>
                      <DragIcon type={"primary"} />
                      <ConstructorElement
                        text={el.name}
                        price={el.price}
                        thumbnail={el.image}
                      />
                    </li>
                  );
                })}
              <li className="ml-8" key={ingredientsGroup.bun[1]._id}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={ingredientsGroup.bun[1].name}
                  price={ingredientsGroup.bun[1].price}
                  thumbnail={ingredientsGroup.bun[1].image}
                />
              </li>
            </ul>
            <div className={`mt-10 ${burgerConstructorStyles.order}`}>
              <div className={`mr-10 ${burgerConstructorStyles.order}`}>
                <p
                  className="text text_type_digits-medium"
                  style={{ marginRight: "9px" }}
                >
                  610
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={() => {
                  setOrderSend(true);
                }}
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        </section>
        {isOrderSend && (
          <Modal closeModal={closeOrderInfo}>
            <OrderDetails orderNumber="123456" />
          </Modal>
        )}
      </>
    )
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};
