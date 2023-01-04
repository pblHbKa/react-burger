import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";
import profileStyles from "./profile.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, updateUserInfo, getUserInfo } from "../../services/actions/user";
import { selectors } from "../..";

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectors.userInfoUser);
  const history = useHistory();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user.name);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setPassword(user.password);
  }, [user]);

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "userName") {
      setName(event.target.value);
    } else {
      setPassword(event.target.value);
    }
    setModified(true);
  };

  const logout = () => {
    dispatch(signOut())
    .then((res) => {
      history.push('/login')
    });
  };

  const resetChanges = () => {
      setEmail(user.email);
      setPassword("");
      setName(user.name);
      setModified(false);
    }

  const saveChanges = () => {
    dispatch(updateUserInfo({ name, email, password }))
    .then(() => {setModified(false)})
  };

  return (
    <>
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
            extraClass={`${profileStyles.exitButton} text text_type_main-medium text_color_inactive pt-4 pb-4`}
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
