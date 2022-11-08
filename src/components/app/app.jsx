import { React, useEffect } from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { getIngredients } from "../../utils/burger-api";
import { useDispatch } from "react-redux";
import { setIngredients } from "../../services/reduces/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { setData } from "../../services/reduces/burger-constructor";
import { increaseCount } from "../../services/reduces/burger-ingredients";
import { data } from "../../utils/data";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getIngredients()
      .then((res) => {
        dispatch(setIngredients(res.data));
        dispatch(setData(data));
        data.forEach(item => {dispatch(increaseCount(item._id))});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   dispatch(setData(data));
  //   data.forEach(item => {dispatch(increaseCount(item._id)); console.log(item)});
  // }, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
