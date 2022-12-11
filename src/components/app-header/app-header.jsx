import appHeaderStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={`${appHeaderStyles.nav} pb-4 pt-4`}>
        <ul className={appHeaderStyles.ul}>
          <li className="pl-5 pr-5 pb-4 pt-4">
            <a className={appHeaderStyles.link} href="/#">
              <BurgerIcon type="primary" />
              <NavLink
                exact
                to={{ pathname: "/" }}
                className={`${appHeaderStyles.link} text text_type_main-default text_color_inactive ml-2`}
                activeStyle={{
                  color: "white",
                }}
              >
                Конструктор
              </NavLink>
            </a>
          </li>
          <li className="pl-5 pr-5 pb-4 pt-4 ml-2">
            <a className={appHeaderStyles.link} href="/#">
              <ListIcon type="secondary" />
              <NavLink
                to="/order"
                className={`${appHeaderStyles.link} text text_type_main-default text_color_inactive ml-2`}
                activeStyle={{
                  color: "white",
                }}
              >
                Лента заказов
              </NavLink>
            </a>
          </li>
        </ul>

        <Logo />

        <ul className={appHeaderStyles.ul}>
          <li className="pl-5 pr-5 pb-4 pt-4 ml-2">
            <a className={appHeaderStyles.link} href="/#">
              <ProfileIcon type="secondary" />
              <NavLink
                to="/profile"
                className={`${appHeaderStyles.link} text text_type_main-default text_color_inactive ml-2`}
                activeStyle={{
                  color: "white",
                }}
              >
                Личный кабинет
              </NavLink>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
