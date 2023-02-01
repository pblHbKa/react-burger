import { createOrder as createOrderAPI } from "../../utils/burger-api";
import { setOrder } from "../reduces/order";
import { setData } from "../reduces/burger-constructor";
import { resetCount } from "../reduces/burger-ingredients";
import { getCookie } from "../../utils/cookies";
import { AppDispatch } from "../..";

export function createOrder(ingredientsId: Array<string>) {
  return function (dispatch: AppDispatch ) {
    const token = getCookie("accessToken");
    return createOrderAPI(ingredientsId, token)
      .then((res) => {
        dispatch(setOrder(res.order.number));
        dispatch(setData([]));
        dispatch(resetCount());
      })
      .catch((err) => {
        console.log(err);
      });
  }
};