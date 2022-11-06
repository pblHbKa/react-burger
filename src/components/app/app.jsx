import { React, useEffect } from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { getIngredients } from "../../utils/burger-api";
import { useDispatch } from "react-redux";
import { setIngredients } from "../../services/reduces/burger-ingredients";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getIngredients()
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
