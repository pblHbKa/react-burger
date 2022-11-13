import { combineReducers } from "redux";
import { reducer as burgerIngredients} from "./burger-ingredients";
import { reducer as order}  from "./order";
import { reducer as burgerConstructor } from "./burger-constructor";
import { reducer as ingredientOpen } from "./ingredient-open";

export const rootReducer = combineReducers({
    burgerIngredients, 
    order,
    burgerConstructor,
    ingredientOpen
});