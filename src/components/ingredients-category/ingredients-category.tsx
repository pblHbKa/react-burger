import ingredientsCategoryStyles from "./ingredients-category.module.css";
import { forwardRef } from "react";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import { TIngredient } from "../../services/types/data";

interface IIngredientsCategoryProps {
  categoryId: string;
  categoryName: string;
  group: Array<TIngredient>;
  ref: React.Ref<HTMLDivElement>;
}

export const IngredientsCategory: React.FC<IIngredientsCategoryProps> = forwardRef<HTMLDivElement, IIngredientsCategoryProps>(
  ({ categoryId, categoryName, group }, ref) => {
    return (
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
                <IngredientCard ingredient={el} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);