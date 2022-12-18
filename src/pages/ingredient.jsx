import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { useSelector } from "react-redux";
import ingredientStyles from "./ingredient.module.css";
import PropTypes from "prop-types";

export const Ingredient = ({title}) => {
  const ingredients = useSelector((state) => state.burgerIngredients.data);
  const { idIngredient } = useParams();
  const ingredient = ingredients.find(
    (ingredient) => ingredient._id === idIngredient
  );

  return (
    <>
      <main className={`${ingredientStyles.ingredientContainer} mt-30`}>
        {title && (
          <h4 className="text text_type_main-large ml-10 mr-10 mt-10">
            {title}
          </h4>
        )}
        <IngredientDetails data={ingredient} />
      </main>
    </>
  );
};

Ingredient.propTypes = {
  title: PropTypes.string,
};
