import {
  Button,
  Input,
  PasswordInput,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import userInStyles from "./userIn.module.css";
import { useAuth } from "../services/reduces/user";
import { useState } from "react";

export const Registration = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "userName") {
      setName(event.target.value);
    } else {
      setPassword(event.target.value);

    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    auth.createUser({ email, password, name});
  };

  return (
    <>
      <form className={userInStyles.userInform} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type="text"
          placeholder="Имя"
          extraClass="mt-6"
          name="userName"
          value={name}
          onChange={handleChange}
        />
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
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default mt-20">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={userInStyles.link}>
            Войти
          </Link>
        </p>
      </form>
    </>
  );
};
