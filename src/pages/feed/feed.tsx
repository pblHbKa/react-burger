import feedStyles from "./feed.module.css";
import { FeedList } from "../../components/feed-list/feed-list";
import { OrdersProcessing } from "../../components/orders-processing/orders-processing";
import { wsInit, connectionClose } from "../../services/reduces/wsReducers";
import { useEffect } from "react";
import { selectors, useAppDispatch, useAppSelector } from "../..";
import { BURGER_WS_ORDERS } from "../../utils/burger-api";

export const Feed = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.orderInfo.data);
  const total = useAppSelector(state => state.orderInfo.total);
  const totalToday = useAppSelector(state => state.orderInfo.totalToday);

  useEffect(() => {
    dispatch(wsInit({
          url: `${BURGER_WS_ORDERS}/all`,
          isAuth: false,
        }));
    return () => {
      dispatch(connectionClose())
    };
  }, [dispatch]);

  return (
    <>
      <h1 className={`text text_type_main-large ${feedStyles.feedHead}`}>
        Лента заказов
      </h1>
      <main className={feedStyles.main}>
        {data.length > 0 && (<>
        <FeedList data={data} />
        <OrdersProcessing data={data} total={total} totalToday={totalToday}/>
        </>)}
      </main>
    </>
  );
};
