import appHeaderStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={`${appHeaderStyles.nav} pb-4 pt-4`}>
        <ul className={appHeaderStyles.ul}>
          <li className="pl-5 pr-5 pb-4 pt-4">
            <a className={appHeaderStyles.link} href="/#">
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </a>
          </li>
          <li className="pl-5 pr-5 pb-4 pt-4 ml-2">
            <a className={appHeaderStyles.link} href="/#">
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive ml-2">
                Лента заказов
              </p>
            </a>
          </li>
        </ul>

        <Logo />

        <ul className={appHeaderStyles.ul}>
          <li className="pl-5 pr-5 pb-4 pt-4 ml-2">
            <a className={appHeaderStyles.link} href="/#">
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive ml-2">
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
