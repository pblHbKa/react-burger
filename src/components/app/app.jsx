import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Error404 } from "../../pages/error404/error404";
import { Registration } from "../../pages/register/register";
import { LogIn } from "../../pages/login/login";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Main } from "../../pages/main/main";
import { Profile } from "../../pages/profile/profile";
import { ProtectedRoute } from "../protectedRoute/protectedRoute";
import { useEffect } from "react";
import { Ingredient } from "../../pages/ingredient/ingredient";
import { useDispatch } from "react-redux";
import { Modal } from "../modal/modal";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { AppHeader } from "../app-header/app-header";
import { getUserInfo } from "../../services/actions/user";
import { Feed } from "../../pages/feed/feed";
import { OrderInfo } from "../order-info/order-info";
import { ProfileOrders } from "../../pages/profile-orders/profile-orders";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const onModalClose = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <Main />
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
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <ProfileOrders />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderInfo fullPage/>
        </ProtectedRoute>
        <Route path="/ingredients/:idIngredient">
          <Ingredient title="Детали ингредиента" />
        </Route>
        <Route path="/feed/:id">
          <OrderInfo fullPage/>
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
      {background && (
        <>
          <Route path="/ingredients/:idIngredient">
            <Modal closeModal={onModalClose} title="Детали ингредиента">
              <Ingredient />
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal closeModal={onModalClose}>
              <OrderInfo />
            </Modal>
          </Route>
        </>
      )}
    </>
  );
}

export default App;
