import { React, useEffect, useState } from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { getIngredients } from "../../utils/burger-api";
import { BurgerContext } from "../../services/app-context";

function App() {
  const [ingredients, setIngredients] = useState([]);
  
  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
      <BurgerContext.Provider value={[ingredients, setIngredients]}>
        <AppHeader />
        <main className={appStyles.main}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </BurgerContext.Provider>
  );
}

export default App;
