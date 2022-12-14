import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import profileStyles from "./profile.module.css";
import { useAuth } from "../services/reduces/user";
import { useState } from "react";

export const Profile = () => {
  const auth = useAuth();
  const user = auth.user;

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user.name);
  const [modified, setModified] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
      setModified(true);
    } else if (event.target.name === "userName") {
      setName(event.target.value);
      setModified(true);
    } else {
      setPassword(event.target.value);
      setModified(true);
    }
  };

  const logout = () => {
    auth.signOut();
  };

  const resetChanges = () => {
    auth.getUserInfo().then((res) => {
      setEmail(user.email);
      setPassword("");
      setName(user.name);
      setModified(false);
    });
  };

  const saveChanges = () => {
    auth.updateUserInfo({ name, user, password });
    setModified(false);
  };

  return (
    <>
      <AppHeader />
      <main className={profileStyles.main}>
        <div className={profileStyles.linkPanel}>
          <NavLink
            exact
            to={{ pathname: "/profile" }}
            className={`${profileStyles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
            activeStyle={{
              color: "white",
            }}
          >
            Профиль
          </NavLink>
          <NavLink
            exact
            to={{ pathname: "/profile/orders" }}
            className={`${profileStyles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
            activeStyle={{
              color: "white",
            }}
          >
            История заказов
          </NavLink>
          <Button
            htmlType="button"
            type="secondary"
            size="small"
            onClick={logout}
            style={{ textAlign: "left" }}
            extraClass="text text_type_main-medium text_color_inactive pt-4 pb-4"
          >
            Выход
          </Button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Имя"
            name="userName"
            icon="EditIcon"
            value={name}
            onChange={handleChange}
          />
          <EmailInput
            isIcon={true}
            placeholder="Логин"
            extraClass="mt-6 mb-6"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <PasswordInput
            type="password"
            placeholder="Пароль"
            name="password"
            icon="EditIcon"
            value={password}
            onChange={handleChange}
          />
          {modified && (
            <>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass={profileStyles.profileButton}
                onClick={saveChanges}
              >
                Сохранить
              </Button>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass={profileStyles.profileButton}
                onClick={resetChanges}
              >
                Отмена
              </Button>
            </>
          )}
        </div>
      </main>
    </>
  );
};
