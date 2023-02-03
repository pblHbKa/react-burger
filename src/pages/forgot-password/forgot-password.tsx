import { useState } from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { resetPassword as resetPasswordAPI } from "../../utils/burger-api";
import userInStyles from "../userIn.module.css";
import { canResetPassword as setCanResetPassword } from "../../services/reduces/user";
import { useAppDispatch } from "../..";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useAppDispatch();

  const setUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const resetPassword: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(setCanResetPassword(true));
    if (email) {
      resetPasswordAPI(email)
        .then((res) => {
          history.replace({ pathname: "/reset-password" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form className={userInStyles.userInform} onSubmit={resetPassword}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          placeholder="E-mail"
          extraClass="mt-6 mb-6"
          name="email"
          value={email}
          onChange={setUserEmail}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
        <p className="text text_type_main-default mt-20">
          Вспомнили пароль?{" "}
          <Link to="/login" className={userInStyles.link}>
            Войти
          </Link>
        </p>
      </form>
    </>
  );
};
