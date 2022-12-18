import { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import userInStyles from "./userIn.module.css";
import { setPassword as setPasswordAPI } from "../utils/burger-api";
import { useDispatch, useSelector } from "react-redux";
import { canResetPassword as setcanResetPassword } from "../services/reduces/user";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const history = useHistory();
  const canResetPassword = useSelector((state) => state.userInfo.canResetPassword);
  const dispatch = useDispatch();

  if (!canResetPassword) {
    return <Redirect to={{ pathname: "/forgot-password"}}/>
  }

  const handleChange = (event) => {
    if (event.target.name === "password") {
      setNewPassword(event.target.value);
    } else {
      setVerificationCode(event.target.value);
    }
  };

  const setPassword = (event) => {
    event.preventDefault();
    if (newPassword && verificationCode) {
      setPasswordAPI(newPassword, verificationCode)
        .then((res) => {
          dispatch(setcanResetPassword(false));
          history.replace({ pathname: "/login" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form className={userInStyles.userInform} onSubmit={setPassword}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          extraClass="mt-6"
          name="password"
          value={newPassword}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          extraClass="mt-6 mb-6"
          name="verificationCode"
          value={verificationCode}
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
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
