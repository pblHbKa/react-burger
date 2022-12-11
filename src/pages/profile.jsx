import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import profileStyles from "./profile.module.css";

export const Profile = () => {
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
          <NavLink
            exact
            to={{ pathname: "/logout" }}
            className={`${profileStyles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
            activeStyle={{
              color: "white",
            }}
          >
            Выход
          </NavLink>
          <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Имя"
            name="userName"
            icon="EditIcon"
          />
          <EmailInput
            isIcon={true}
            placeholder="Логин"
            extraClass="mt-6 mb-6"
            name="login"
          />
          <PasswordInput
            type="password"
            placeholder="Пароль"
            name="password"
            icon="EditIcon"
          />
        </div>
      </main>
    </>
  );
};
