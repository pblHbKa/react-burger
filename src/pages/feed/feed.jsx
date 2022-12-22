import feedStyles from "./feed.module.css";
import { FeedList } from "../../components/feed-list/feed-list";
import { OrdersProcessing } from "../../components/orders-processing/orders-processing";

export const Feed = () => {
  return (
    <>
    <h1 className={`text text_type_main-large ${feedStyles.feedHead}`}>Лента заказов</h1>
      <main className={feedStyles.main}>
        <FeedList/>
        <OrdersProcessing/>
      </main>
    </>
  );
};
