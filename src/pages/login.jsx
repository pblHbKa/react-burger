import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import userInStyles from "./userIn.module.css";
import { useState } from "react";
import { useAuth } from "../services/reduces/user";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const auth = useAuth();

  const handleSubmit = event => {
    event.preventDefault();
    auth.signIn({ email, password });
  };

  if (auth.user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <>
      <AppHeader />
      <form className={userInStyles.userInform} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          placeholder="E-mail"
          extraClass="mt-6 mb-6"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <PasswordInput
          type="password"
          placeholder="Пароль"
          extraClass="mb-6"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
        <p className="text text_type_main-default mt-20">
          Вы — новый пользователь?{" "}
          <Link to="/register" className={userInStyles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default mt-4">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={userInStyles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </>
  );
};
