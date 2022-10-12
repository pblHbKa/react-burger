import React from "react";
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string
});

export const BurgerConstructor = (props: any) => {
    return (
        <section className={burgerConstructorStyles.constructorBox}>
            <div className="pl-10 pr-10 pt-25 mb-10 ml-40">
                <ul className={burgerConstructorStyles.ul}>
                    <li className={`ml-8 ${burgerConstructorStyles.li}`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={props.data[0].name}
                    price={props.data[0].price}
                    thumbnail={props.data[0].image}
                />
                </li>
                    {props.data.filter((el : any) => el.type !== "bun")
                        .map((el: any) => {
                            return (
                                <li className={burgerConstructorStyles.li}>
                                    <DragIcon type={"primary"} />
                                    <ConstructorElement
                                        text={el.name}
                                        price={el.price}
                                        thumbnail={el.image}
                                    />
                                </li>
                            );
                        })}
                <li className="ml-8">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={props.data[props.data.length-1].name}
                    price={props.data[props.data.length-1].price}
                    thumbnail={props.data[props.data.length-1].image}
                />
                </li>
                </ul>
            <div className={`mt-10 ${burgerConstructorStyles.order}`}>
                <div className={`mr-10 ${burgerConstructorStyles.order}`}>
                    <p className="text text_type_digits-medium" style={{marginRight: '9px'}}>610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            </div>
        </section>
    )
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};