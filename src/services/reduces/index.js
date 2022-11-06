import { combineReducers } from "redux";
import { reducer as burgerIngredientsReducer} from "./burger-ingredients";
import { reducer as orderReducer}  from "./order";
import { reducer as burgerConstructorReducer } from "./burger-constructor";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer, 
    order: orderReducer,
    burgerConstructor: burgerConstructorReducer
});