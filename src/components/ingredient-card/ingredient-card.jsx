import IngredientCardStyles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/common";

export const IngredientCard = ({ onCardClick, ingredient }) => {
  return (
    <div
      className={IngredientCardStyles.card}
      onClick={() => {
        onCardClick(ingredient);
      }}
    >
      <img src={ingredient.image} className="ml-4 mr-4" />
      {ingredient.count && <Counter count={ingredient.count} size="default" />}
      <div className={`mt-1 mb-1 ${IngredientCardStyles.priceInfo}`}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${IngredientCardStyles.name}`}>
        {ingredient.name}
      </p>
    </div>
  );
};

IngredientCard.propTypes = {
  onCardClick: PropTypes.func,
  ingredient: ingredientType.isRequired,
};
