import ingredientsDetailsStyles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/common";

const IngredientDetails = (props) => {
  
  return (
    props.data && (
      <div className={ingredientsDetailsStyles.ingredientsDetails}>
        <img
          className={ingredientsDetailsStyles.image}
          src={props.data.image}
          alt={props.data.name}
        />
        <p className="text text_type_main-medium mt-4 mb-8">
          {props.data.name}
        </p>
        <div
          className={`${ingredientsDetailsStyles.nutrients} mb-15 text text_type_main-default text_color_inactive`}
        >
          <div className={ingredientsDetailsStyles.nutrient}>
            <p>Калории,ккал</p>
            <p className="text text_type_digits-default">
              {props.data.calories}
            </p>
          </div>
          <div className={ingredientsDetailsStyles.nutrient}>
            <p>Белки, г</p>
            <p className="text text_type_digits-default">
              {props.data.proteins}
            </p>
          </div>
          <div className={ingredientsDetailsStyles.nutrient}>
            <p>Жиры, г</p>
            <p className="text text_type_digits-default">{props.data.fat}</p>
          </div>
          <div className={ingredientsDetailsStyles.nutrient}>
            <p>Углеводы, г</p>
            <p className="text text_type_digits-default">
              {props.data.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

IngredientDetails.propTypes = {
  data: ingredientType.isRequired,
};

export { IngredientDetails };
