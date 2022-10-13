import React from "react";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/common";


export const BurgerIngredients = (props: any) => {
    
    const [current, setCurrent] = React.useState('Булки');
    const ingredientsGroups = [props.data.filter((el: any) => el.type == "bun"), props.data.filter((el: any) => el.type == "sauce"), props.data.filter((el: any) => el.type == "main")];
    const nameOfGroups = ["Булки", "Соусы", "Начинки"];

    return (
        props.data.length &&
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
                {ingredientsGroups.map((group: any, index) => {
                    return (
                        <div className="pb-10">
                            <h2 className="text text_type_main-medium mb-6">{nameOfGroups[index]}</h2>
                            <ul className={burgerIngredientsStyles.ul}>
                                {group.map((el: any) => {
                                    return (
                                        <li key={el._id}>
                                            <div className={burgerIngredientsStyles.card}>
                                                <img src={el.image} className="ml-4 mr-4" />
                                                {el.count && <Counter count={el.count} size="default" />}
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
                        </div>)
                })}
            </div >
        </section >
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};