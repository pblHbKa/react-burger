import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Error404 } from "../../pages/error404";
import { Registration } from "../../pages/register";
import { LogIn } from "../../pages/login";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";
import { Main } from "../../pages/main";
import { Profile } from "../../pages/profile";
import { ProtectedRoute } from "../protectedRoute/protectedRoute";
import { useState, useEffect } from "react";
import { Ingredient } from "../../pages/ingredient";
import { ProvideAuth } from "../../services/reduces/user";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal/modal";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { AppHeader } from "../app-header/app-header";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.burgerIngredients.data);
  
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  //const ingredients = useSelector((state) => state.burgerIngredients.data);

  const history = useHistory();
  const location = useLocation();

  const background = location.state?.background;

  const onModalClose = () => {
    history.goBack();
  };

  return (
    <>
    <AppHeader/>
      <ProvideAuth>
        <Switch location={background || location}>
          <Route path="/" exact>
            <Main/>
          </Route>
          <ProtectedRoute onlyUnAuth path="/register">
            <Registration />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth path="/login">
            <LogIn />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth path="/forgot-password">
            <ForgotPassword />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth path="/reset-password">
            <ResetPassword />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>
          <Route path="/ingredients/:idIngredient">
            <Ingredient />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
        {background && (
          <Route path="/ingredients/:idIngredient">
            <Modal closeModal={onModalClose}>
              <Ingredient />
            </Modal>
          </Route>
        )}
      </ProvideAuth>
    </>
  );
}

export default App;
