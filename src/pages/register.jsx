import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import userInStyles from "./userIn.module.css";

export const Registration = () => {
  return (
    <>
      <AppHeader />
      <form className={userInStyles.userInform}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input type="text" placeholder="Имя" extraClass="mt-6" name="userName"/>
        <Input type="email" placeholder="E-mail" extraClass="mt-6 mb-6" name="email"/>
        <PasswordInput type="password" placeholder="Пароль" extraClass="mb-6" name="password"/>
        <Button htmlType="button" type="primary" size="medium">Зарегистрироваться</Button>
        <p className="text text_type_main-default mt-20">Уже зарегистрированы? <Link to="/login">Войти</Link></p> 
      </form>
    </>
  );
};
