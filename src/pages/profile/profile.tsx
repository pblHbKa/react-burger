import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";
import profileStyles from "./profile.module.css";
import { useState, useEffect } from "react";
import { signOut, updateUserInfo } from "../../services/actions/user";
import { selectors, useAppDispatch, useAppSelector } from "../..";
import { useForm } from "../../utils/hooks/useForm";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo.user);
  const history = useHistory();

   const [modified, setModified] = useState(false);
  const {values, handleChange, setValues} = useForm<{email: string; password: string; name: string}>({email: "", password: "", name: ""});

  useEffect(() => {
    setValues(user);
  }, [user]);

  const handleChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    setModified(true);
  }

  const logout = () => {
    dispatch(signOut())
    .then(() => {
      history.push('/login')
    });
  };

  const resetChanges = () => {
    setValues({email: user.email, name: user.name, password: ""});
      setModified(false);
    }

  const saveChanges = () => {
    dispatch(updateUserInfo(values))
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
            name="name"
            icon="EditIcon"
            value={values.name}
            onChange={handleChangeLocal}
          />
          <EmailInput
            isIcon={true}
            placeholder="Логин"
            extraClass="mt-6 mb-6"
            name="email"
            value={values.email}
            onChange={handleChangeLocal}
          />
          <PasswordInput
            placeholder="Пароль"
            name="password"
            icon="EditIcon"
            value={values.password}
            onChange={handleChangeLocal}
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
