import { Route, Switch } from "react-router-dom";
import { Error404 } from "../../pages/error404";
import { Registration } from "../../pages/register";
import { LogIn } from "../../pages/login";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";
import { Main } from "../../pages/main";
import { Profile } from "../../pages/profile";
import { ProtectedRoute } from "../protectedRoute/protectedRoute";
import { useState } from "react";
import { Ingredient } from "../../pages/ingredient";
import { data } from "../../utils/data";

function App() {

  const [user, setUser] = useState(null);

  return (
    <>
      <Switch>
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
        <ProtectedRoute user={user} path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:idIngredient">
          <Ingredient ingredients={data}/>
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
