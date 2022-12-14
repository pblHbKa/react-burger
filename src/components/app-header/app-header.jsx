import appHeaderStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={`${appHeaderStyles.nav} pb-4 pt-4`}>
        <ul className={appHeaderStyles.ul}>
          <li className="pl-5 pr-5 pb-4 pt-4">
            <NavLink
              exact
              to={{ pathname: "/" }}
              className={`${appHeaderStyles.link} text_color_inactive`}
              activeStyle={{
                color: "white",
              }}
            >
              <div className={appHeaderStyles.link}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </div>
            </NavLink>
          </li>
          <li className="pl-5 pr-5 pb-4 pt-4 ml-2">
            <NavLink
              to="/order"
              className={`${appHeaderStyles.link} text text_type_main-default text_color_inactive ml-2`}
              activeStyle={{
                color: "white",
              }}
            >
              <div className={appHeaderStyles.link}>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default ml-2">
                  Лента заказов
                </p>
              </div>
            </NavLink>
          </li>
        </ul>

        <Logo />

        <ul className={appHeaderStyles.ul}>
          <li className="pl-5 pr-5 pb-4 pt-4 ml-2">
            <NavLink
              to="/profile"
              className={`${appHeaderStyles.link} text text_type_main-default text_color_inactive ml-2`}
              activeStyle={{
                color: "white",
              }}
            >
              <div className={appHeaderStyles.link}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default ml-2">
                  Личный кабинет
                </p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
