import { OrderCard } from "../order-card/order-card";
import feedListStyles from "./feed-list.module.css";

export const FeedList = () => {
    return (
        <section className={feedListStyles.feedList}>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        </section>
    )
}