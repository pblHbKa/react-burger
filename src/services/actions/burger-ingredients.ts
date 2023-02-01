import { AppDispatch } from "../..";
import { getIngredients as getIngredientsAPI } from "../../utils/burger-api";
import { setIngredients } from "../reduces/burger-ingredients";

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    getIngredientsAPI()
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
