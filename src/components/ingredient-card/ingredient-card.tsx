import IngredientCardStyles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd/dist/hooks";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../services/types/data";

interface IIngredientCardProps {
  ingredient: IIngredient;
}

export const IngredientCard: React.FC<IIngredientCardProps> = ({ ingredient }) => {
  const location = useLocation();

  const [, ref] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <div draggable ref={ref}>
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
        key={ingredient._id}
        className={IngredientCardStyles.link}
      >
        <div className={IngredientCardStyles.card}>
          <img
            src={ingredient.image}
            className="ml-4 mr-4"
            alt={ingredient.name}
          />
          {ingredient.count > 0 && (
            <Counter count={ingredient.count} size="default" />
          )}
          <div className={`mt-1 mb-1 ${IngredientCardStyles.priceInfo}`}>
            <p className="text text_type_digits-default mr-2">
              {ingredient.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <p
            className={`text text_type_main-default ${IngredientCardStyles.name}`}
          >
            {ingredient.name}
          </p>
        </div>
      </Link>
    </div>
  );
};
