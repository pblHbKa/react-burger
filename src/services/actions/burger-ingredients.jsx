import { getIngredients as getIngredientsAPI } from "../../utils/burger-api";
import { setIngredients } from "../../services/reduces/burger-ingredients";

export function getIngredients() {
  return function (dispatch) {
    getIngredientsAPI()
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
