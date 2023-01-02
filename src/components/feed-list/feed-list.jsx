import { OrderCard } from "../order-card/order-card";
import feedListStyles from "./feed-list.module.css";
import PropTypes from "prop-types";
import { orderType } from "../../utils/common";

export const FeedList = ({ data }) => {
  return (
    data.length > 0 && (
      <section className={feedListStyles.feedList}>
        {data.map((order) => {
          return <OrderCard order={order} />;
        })}
      </section>
    )
  );
};

FeedList.propTypes = {
  data: PropTypes.arrayOf(orderType.isRequired).isRequired,
};
