import React from "react";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerIngredients = (props: any) => {
    const [current, setCurrent] = React.useState('Булки');
    return (
        <section className={burgerIngredientsStyles.ingredientsBox}>
            <h1 className="text text_type_main-large mt-10 mb-10">Соберите бургер</h1>
            <div className="mb-10" style={{ display: 'flex' }}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredientsStyles.ingredientsList}>
                <div className="pb-10">
                    <h2 className="text text_type_main-medium mb-6">Булки</h2>
                    <ul className={burgerIngredientsStyles.ul}>
                        {props.data.filter((el: any) => el.type == "bun")
                            .map((el: any) => {
                                return (
                                    <li key={el._id}>
                                        <div className={burgerIngredientsStyles.card}>
                                            <img src={el.image} className="ml-4 mr-4" />
                                            <Counter count={1} size="default" />
                                            <div className={`mt-1 mb-1 ${burgerIngredientsStyles.priceInfo}`}>
                                                <p className="text text_type_digits-default mr-2">{el.price}</p>
                                                <CurrencyIcon type="primary" />
                                            </div>
                                            <p className={`text text_type_main-default ${burgerIngredientsStyles.name}`}>{el.name}</p>
                                        </div>
                                    </li>
                                );
                            })}

                    </ul>
                </div>
                <div className="pb-10">
                    <h2 className="text text_type_main-medium mb-6">Соусы</h2>
                    <ul className={burgerIngredientsStyles.ul}>
                        {props.data.filter((el: any) => el.type == "sauce")
                            .map((el: any) => {
                                return (
                                    <li key={el._id}>
                                        <div className={burgerIngredientsStyles.card}>
                                            <img src={el.image} className="ml-4 mr-4" />
                                            <Counter count={1} size="default" />
                                            <div className={`mt-1 mb-1 ${burgerIngredientsStyles.priceInfo}`}>
                                                <p className="text text_type_digits-default mr-2">{el.price}</p>
                                                <CurrencyIcon type="primary" />
                                            </div>
                                            <p className={`text text_type_main-default ${burgerIngredientsStyles.name}`}>{el.name}</p>
                                        </div>
                                    </li>
                                );
                            })}

                    </ul>
                </div>
                <div className="pb-10">
                    <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                    <ul className={burgerIngredientsStyles.ul}>
                        {props.data.filter((el: any) => el.type == "main")
                            .map((el: any) => {
                                return (
                                    <li key={el._id}>
                                        <div className={burgerIngredientsStyles.card}>
                                            <img src={el.image} className="ml-4 mr-4" />
                                            <Counter count={1} size="default" />
                                            <div className={`mt-1 mb-1 ${burgerIngredientsStyles.priceInfo}`}>
                                                <p className="text text_type_digits-default mr-2">{el.price}</p>
                                                <CurrencyIcon type="primary" />
                                            </div>
                                            <p className={`text text_type_main-default ${burgerIngredientsStyles.name}`}>{el.name}</p>
                                        </div>
                                    </li>
                                );
                            })}

                    </ul>
                </div>
            </div>
        </section>
    );
}