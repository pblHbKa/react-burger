import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import userInStyles from "./userIn.module.css";

export const LogIn = () => {
  return (
    <>
      <AppHeader />
      <form className={userInStyles.userInform}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input type="email" placeholder="E-mail" extraClass="mt-6 mb-6" name="email"/>
        <PasswordInput type="password" placeholder="Пароль" extraClass="mb-6" name="password"/>
        <Button htmlType="button" type="primary" size="medium">Войти</Button>
        <p className="text text_type_main-default mt-20">Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p> 
        <p className="text text_type_main-default mt-4">Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p> 
      </form>
    </>
  );
};
