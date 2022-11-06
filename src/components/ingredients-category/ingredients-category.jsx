import ingredientsCategoryStyles from "./ingredients-category.module.css";
import { forwardRef } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/common";
import { IngredientCard } from "../ingredient-card/ingredient-card";

export const IngredientsCategory = forwardRef(({categoryId, categoryName, group, onCardClick}, ref) => (  

        <div className="pb-10">
          <h2
            id={categoryId}
            className="text text_type_main-medium mb-6"
            ref={ref}
          >
            {categoryName}
          </h2>
          <ul className={ingredientsCategoryStyles.ul}>
            {group.map((el) => {
              return (
                <li key={el._id}>
                    <IngredientCard onCardClick={onCardClick} ingredient={el} />
                </li>
              );
            })}
          </ul>
        </div>
      ));

IngredientsCategory.propTypes = {
    categoryId: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    group: PropTypes.arrayOf(ingredientType).isRequired,
    onCardClick: PropTypes.func
  };