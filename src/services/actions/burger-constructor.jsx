import { createOrder as createOrderAPI } from "../../utils/burger-api";
import { setOrder } from "../reduces/order";
import { setData, startLoadOrder, endLoadOrder } from "../reduces/burger-constructor";
import { resetCount } from "../reduces/burger-ingredients";
import { getCookie } from "../../utils/cookies";

export function createOrder(ingredientsId) {
  return function (dispatch) {
    dispatch(startLoadOrder());
    const token = getCookie("accessToken");
    createOrderAPI(ingredientsId, token)
      .then((res) => {
        dispatch(setOrder(res.order.number));
        dispatch(setData([]));
        dispatch(resetCount());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(dispatch(endLoadOrder()));
  }
};