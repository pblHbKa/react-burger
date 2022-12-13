import { AppHeader } from "../components/app-header/app-header";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { useSelector } from "react-redux";

export const Ingredient = () => {
  const ingredients = useSelector((state) => state.burgerIngredients.data);
  const data = useSelector((state) => state.burgerConstructor.data);
  const { idIngredient } = useParams();

  const ingredient = ingredients.find(
    (ingredient) => ingredient._id === idIngredient
  );

  return (
    <>
      <AppHeader />
      <main className="mt-30">
        <IngredientDetails data={ingredient} />
      </main>
    </>
  );
};