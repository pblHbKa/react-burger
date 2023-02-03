import { OrderCard } from "../order-card/order-card";
import feedListStyles from "./feed-list.module.css";
import { IOrder } from "../../services/types/data";

interface IFeedListProps {
  data: Array<IOrder>;
  common: boolean
}

export const FeedList: React.FC<IFeedListProps> = ({ data, common}) => {
  return (
    <>
    {data.length > 0 && (
      <section className={feedListStyles.feedList}>
        {data.map((order) => {
          return <OrderCard order={order} key={order._id} common={common}/>;
        })}
      </section>
    )}
    </>
  );
};