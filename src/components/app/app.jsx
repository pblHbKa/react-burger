import { Route, Switch} from "react-router-dom";
import { Error404 } from "../../pages/error404";
import { Registration } from "../../pages/register";
import { LogIn } from "../../pages/login";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";
import { Main } from "../../pages/main";
import { Profile } from "../../pages/profile";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Main/>  
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
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
