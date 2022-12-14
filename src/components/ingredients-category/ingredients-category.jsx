import ingredientsCategoryStyles from "./ingredients-category.module.css";
import { forwardRef } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/common";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import { Link, useLocation } from "react-router-dom";

export const IngredientsCategory = forwardRef(
  ({ categoryId, categoryName, group}, ref) => {
    const location = useLocation();
    return (
    <div className="pb-10">
      <h2 id={categoryId} className="text text_type_main-medium mb-6" ref={ref}>
        {categoryName}
      </h2>
      <ul className={ingredientsCategoryStyles.ul}>
        {group.map((el) => {
          return (
            <li key={el._id}>
              <Link
                to={{
                  pathname: `/ingredients/${el._id}`,
                  state: { background: location },
                }}
                key={el._id}
                className={ingredientsCategoryStyles.link}
              >
                <IngredientCard ingredient={el} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  )}
);

IngredientsCategory.propTypes = {
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(ingredientType).isRequired,
};
