import { getIngredients as getIngredientsAPI } from "../../utils/burger-api";
import { setIngredients } from "../../services/reduces/burger-ingredients";
import { setData } from "../../services/reduces/burger-constructor";
import { increaseCount } from "../../services/reduces/burger-ingredients";

export function getIngredients() {
  return function (dispatch) {
    getIngredientsAPI()
      .then((res) => {
        dispatch(setIngredients(res.data));
        const bun = res.data.filter((ingredient) => ingredient.type === "bun")[0];
        dispatch(setData([bun]));
        dispatch(increaseCount(bun._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
