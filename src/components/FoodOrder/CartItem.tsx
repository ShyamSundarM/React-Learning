import styles from "./CartItem.module.css";
import { RxCross2 } from "react-icons/rx";
import Counter from "./Counter";
import { useContext } from "react";
import { FoodContext } from "../../context/food-context";
import { Skeleton } from "@mui/material";

type Props = {
  id: number;
  name: string;
  image: string;
  count: number;
  price: number;
};
export default function CartItem(props: Props) {
  const { dataLoaded } = useContext(FoodContext);
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {dataLoaded ? (
          <img src={props.image} className={styles.image} />
        ) : (
          <Skeleton
            variant="rounded"
            className={styles.image}
            animation="wave"
          />
        )}
        <div className={styles.details}>
          <div>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.price}>Price: {props.price}₹</div>
          </div>
          <div className="d-flex align-items-end">
            <RxCross2 color="#000000" />
            <div className={styles.count}>{props.count}</div>
          </div>
        </div>
      </div>
      <div className={styles.secContainer}>
        <Counter id={props.id} count={props.count} />
        <div className={styles.itemSum}>{props.count * props.price}₹</div>
      </div>
    </div>
  );
}
