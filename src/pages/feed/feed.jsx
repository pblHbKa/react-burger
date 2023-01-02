import feedStyles from "./feed.module.css";
import { FeedList } from "../../components/feed-list/feed-list";
import { OrdersProcessing } from "../../components/orders-processing/orders-processing";
import { useDispatch, useSelector } from "react-redux";
import { connectionStart } from "../../services/reduces/wsReducers";
import { useEffect } from "react";

export const Feed = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orderInfo.data);
  const total = useSelector((state) => state.orderInfo.total);
  const totalToday = useSelector((state) => state.orderInfo.totalToday);

  useEffect(() => {
    dispatch({
      type: "WS_CONNECTION_START",
      payload: {
        url: "wss://norma.nomoreparties.space/orders/all",
        isAuth: true,
      },
    });
    return () => {
      dispatch({
        type: "WS_CONNECTION_STOP",
      });
    };
  }, [dispatch]);

  return (
    <>
      <h1 className={`text text_type_main-large ${feedStyles.feedHead}`}>
        Лента заказов
      </h1>
      <main className={feedStyles.main}>
        {data.length && (<>
        <FeedList data={data} />
        <OrdersProcessing data={data} total={total} totalToday={totalToday}/>
        </>)}
      </main>
    </>
  );
};
