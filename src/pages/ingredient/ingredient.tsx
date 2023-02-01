import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import ingredientStyles from "./ingredient.module.css";
import PropTypes from "prop-types";
import { selectors, useAppSelector } from "../..";
import { TIngredient } from "../../services/types/data";

interface IIngredientProps {
  title?: string;
}

export const Ingredient: React.FC<IIngredientProps> = ({title}) => {
  const ingredients = useAppSelector(state => state.burgerIngredients.data);
  const { idIngredient }: {idIngredient: string} = useParams();
  const ingredient = ingredients.find(
    ingredient => ingredient._id === idIngredient
  )!;

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
