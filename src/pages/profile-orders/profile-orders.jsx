import {
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";
import profileOrdersStyles from "./profile-orders.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, updateUserInfo, getUserInfo } from "../../services/actions/user";
import { FeedList } from "../../components/feed-list/feed-list";
import { selectors } from "../..";

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectors.userInfoUser);
  const history = useHistory();
  const data = useSelector(selectors.orderInfoData);

  useEffect(() => {
    dispatch({
      type: "WS_CONNECTION_START",
      payload: {
        url: "wss://norma.nomoreparties.space/orders",
        isAuth: true,
      },
    });
    return () => {
      dispatch({
        type: "WS_CONNECTION_STOP",
      });
    };
  }, [dispatch]);

  const logout = () => {
    dispatch(signOut())
    .then((res) => {
      history.push('/login')
    });
  };

  return (
    <>
      <main className={profileOrdersStyles.main}>
        <div className={profileOrdersStyles.linkPanel}>
          <NavLink
            exact
            to={{ pathname: "/profile" }}
            className={`${profileOrdersStyles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
            activeStyle={{
              color: "white",
            }}
          >
            Профиль
          </NavLink>
          <NavLink
            exact
            to={{ pathname: "/profile/orders" }}
            className={`${profileOrdersStyles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
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
            extraClass={`${profileOrdersStyles.exitButton} text text_type_main-medium text_color_inactive pt-4 pb-4`}
          >
            Выход
          </Button>
          <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
          </p>
        </div>
        {data && <FeedList data={data}/>}
      </main>
    </>
  );
};
