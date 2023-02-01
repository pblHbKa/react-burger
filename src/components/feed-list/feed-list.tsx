import { OrderCard } from "../order-card/order-card";
import feedListStyles from "./feed-list.module.css";
import { TOrder } from "../../services/types/data";

interface IFeedListProps {
  data: Array<TOrder>;
}

export const FeedList: React.FC<IFeedListProps> = ({ data }) => {
  return (
    <>
    {data.length > 0 && (
      <section className={feedListStyles.feedList}>
        {data.map((order) => {
          return <OrderCard order={order} key={order._id}/>;
        })}
      </section>
    )}
    </>
  );
};