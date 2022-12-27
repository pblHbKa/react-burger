import orderInfoStyles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export const OrderInfo = ({fullPage}) => {
  return (
    <div className={`p-6 mt-4 ${fullPage ? orderInfoStyles.orderBox : ''}`}>
      {fullPage &&(<p
        className={`text text_type_digits-default ${orderInfoStyles.orderNumberText}`}
      >
        #034535
      </p>)}
      <h3 className="text text_type_main-medium mb-3 mt-10">
        Death Star Starship Main бургер
      </h3>
      <p
        className={`text text_type_main-default mb-15 ${orderInfoStyles.orderStatus}`}
      >
        Выполнен
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={orderInfoStyles.orderIngredients}>
        <ul className={orderInfoStyles.ingredientsList}>
          <li className={orderInfoStyles.ingredientsListItem}>
            <div className={orderInfoStyles.ingredientPreview}>
              <img
                src="https://code.s3.yandex.net/react/code/meat-02-mobile.png"
                alt=""
                className={orderInfoStyles.ingredientImg}
              />
            </div>
            <p className="text text_type_main-medium ml-4 mr-4">
              Флюоресцентная булка R2-D3
            </p>
            <div className={orderInfoStyles.totalPriceBox}>
              <p
                className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
              >
                2 x 20
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={orderInfoStyles.ingredientsListItem}>
            <div className={orderInfoStyles.ingredientPreview}>
              <img
                src="https://code.s3.yandex.net/react/code/meat-02-mobile.png"
                alt=""
                className={orderInfoStyles.ingredientImg}
              />
            </div>
            <p className="text text_type_main-medium ml-4 mr-4">
              Флюоресцентная булка R2-D3
            </p>
            <div className={orderInfoStyles.totalPriceBox}>
              <p
                className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
              >
                2 x 20
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={orderInfoStyles.ingredientsListItem}>
            <div className={orderInfoStyles.ingredientPreview}>
              <img
                src="https://code.s3.yandex.net/react/code/meat-02-mobile.png"
                alt=""
                className={orderInfoStyles.ingredientImg}
              />
            </div>
            <p className="text text_type_main-medium ml-4 mr-4">
              Флюоресцентная булка R2-D3
            </p>
            <div className={orderInfoStyles.totalPriceBox}>
              <p
                className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
              >
                2 x 20
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={orderInfoStyles.ingredientsListItem}>
            <div className={orderInfoStyles.ingredientPreview}>
              <img
                src="https://code.s3.yandex.net/react/code/meat-02-mobile.png"
                alt=""
                className={orderInfoStyles.ingredientImg}
              />
            </div>
            <p className="text text_type_main-medium ml-4 mr-4">
              Флюоресцентная булка R2-D3
            </p>
            <div className={orderInfoStyles.totalPriceBox}>
              <p
                className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
              >
                2 x 20
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={orderInfoStyles.ingredientsListItem}>
            <div className={orderInfoStyles.ingredientPreview}>
              <img
                src="https://code.s3.yandex.net/react/code/meat-02-mobile.png"
                alt=""
                className={orderInfoStyles.ingredientImg}
              />
            </div>
            <p className="text text_type_main-medium ml-4 mr-4">
              Флюоресцентная булка R2-D3
            </p>
            <div className={orderInfoStyles.totalPriceBox}>
              <p
                className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
              >
                2 x 20
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={orderInfoStyles.ingredientsListItem}>
            <div className={orderInfoStyles.ingredientPreview}>
              <img
                src="https://code.s3.yandex.net/react/code/meat-02-mobile.png"
                alt=""
                className={orderInfoStyles.ingredientImg}
              />
            </div>
            <p className="text text_type_main-medium ml-4 mr-4">
              Флюоресцентная булка R2-D3
            </p>
            <div className={orderInfoStyles.totalPriceBox}>
              <p
                className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
              >
                2 x 20
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        </ul>
        <div className={`mt-10 ${orderInfoStyles.orderFooter}`}>
          <p className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20 i-GMT+3
          </p>
          <div className={orderInfoStyles.totalPriceBox}>
            <p
              className={`text text_type_digits-default ${orderInfoStyles.totalPrice}`}
            >
              480
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

OrderInfo.propTypes = {
  fullPage: PropTypes.bool,
};