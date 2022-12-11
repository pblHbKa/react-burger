import { useState } from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import userInStyles from "./userIn.module.css";
import { setPassword as setPasswordAPI } from "../utils/burger-api";

export const ResetPassword = () => {
    
    const [newPassword, setNewPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    const handleChange = event => {
        if (event.target.name === "password") {
            setNewPassword(event.target.value);
        } else {
            setVerificationCode(event.target.value);
        }
    }

    const setPassword = event => {
        event.preventDefault();
        setPasswordAPI(newPassword, verificationCode)
        .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
    }

  return (
    <>
      <AppHeader />
      <form className={userInStyles.userInform} onSubmit={setPassword}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput type="password" placeholder="Введите новый пароль" extraClass="mt-6" name="password" value={newPassword} onChange={handleChange}/>
        <Input type="text" placeholder="Введите код из письма" extraClass="mt-6 mb-6" name="verificationCode" value={verificationCode} onChange={handleChange}/>
        <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
        <p className="text text_type_main-default mt-20">Вспомнили пароль? <Link to="/login">Войти</Link></p>
      </form>
    </>
  );
};
