import { AppHeader } from "../components/app-header/app-header";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { useSelector, useEffect } from "react-redux";

export const Ingredient = () => {
  const ingredients = useSelector((state) => state.burgerIngredients.data);
  const { idIngredient } = useParams();
  const ingredient = ingredients.find(
    (ingredient) => ingredient._id === idIngredient
  );

  return (
    <>
      <main className="mt-30">
        <IngredientDetails data={ingredient} />
      </main>
    </>
  );
};
