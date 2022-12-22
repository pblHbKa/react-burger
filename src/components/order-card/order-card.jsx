import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import orderCardStyles from "./order-card.module.css";

export const OrderCard = () => {
    return (
        <div className={`p-6 mt-4 ${orderCardStyles.card}`}>
            <div className={`${orderCardStyles.cardHead}`}>
                <p className="text text_type_digits-default">#034535</p>
                <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
            </div>
            <h3 className="text text_type_main-medium mb-6 mt-6">Death Star Starship Main бургер</h3>
            <div className={orderCardStyles.orderInfo}>
                <ul className={orderCardStyles.ingredientsList}>
                    <li>
                        <div className={orderCardStyles.ingredientPreview}>
                            <img src="https://code.s3.yandex.net/react/code/meat-02-mobile.png" alt="" className={orderCardStyles.ingredientImg}/>
                        </div>
                    </li>
                    <li>
                        <div className={orderCardStyles.ingredientPreview}>
                            <img src="https://code.s3.yandex.net/react/code/meat-02-mobile.png" alt="" className={orderCardStyles.ingredientImg}/>
                        </div>
                    </li>
                    <li>
                        <div className={orderCardStyles.ingredientPreview}>
                            <img src="https://code.s3.yandex.net/react/code/meat-02-mobile.png" alt="" className={orderCardStyles.ingredientImg}/>
                        </div>
                    </li>

                </ul>
                <div className={orderCardStyles.priceInfo}>
                <p className={`text text_type_digits-default ${orderCardStyles.totalPrice}`}>480</p>
                <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}