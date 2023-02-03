import { type } from "@testing-library/user-event/dist/type";

export interface IIngredientApi {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IIngredient extends IIngredientApi {
    uuid: string;
    count: number;
} 

export interface IOrder {
    ingredients: Array<string>;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export interface IUserInfo {
    name: string;
    email: string;
    password: string;
}

export interface ILocationState {
    background: {
      pathname: string;
      search: string;
      hash: string;
      state: null;
      key: string;
    };
    from: string;
    state?: object;
  }