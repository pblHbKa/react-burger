import { React, useEffect } from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Error404 } from "../../pages/error404";
import { Registration } from "../../pages/register";
import { LogIn } from "../../pages/login";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <AppHeader />
          <main className={appStyles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </Route>
        <Route path="/register">
          <Registration/>
        </Route>
        <Route path="/login">
          <LogIn/>
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword/>
        </Route>
        <Route path="/reset-password">
          <ResetPassword/>
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
