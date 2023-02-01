import {
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";
import profileOrdersStyles from "./profile-orders.module.css";
import { useEffect } from "react";
import { signOut } from "../../services/actions/user";
import { FeedList } from "../../components/feed-list/feed-list";
import { selectors, useAppDispatch, useAppSelector } from "../..";
import { wsInit, connectionClose } from "../../services/reduces/wsReducers";
import { BURGER_WS_ORDERS } from "../../utils/burger-api";

export const ProfileOrders = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo.user);
  const history = useHistory();
  const data = useAppSelector(state => state.orderInfo.data);

  useEffect(() => {
    dispatch(wsInit({
      url: BURGER_WS_ORDERS,
      isAuth: true,
    }));
    return () => {
      dispatch(connectionClose())
    };
  }, [dispatch]);

  const logout = () => {
    dispatch(signOut())
    .then(() => {
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
