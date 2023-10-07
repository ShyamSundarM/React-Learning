import styles from "./CartItem.module.css";
import { RxCross2 } from "react-icons/rx";
import Counter from "./Counter";

type Props = {
  id: number;
  name: string;
  image: string;
  count: number;
  price: number;
};
export default function CartItem(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img src={props.image} className={styles.image} />
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
      <Counter id={props.id} count={props.count} />
      <div className={styles.itemSum}>{props.count * props.price}₹</div>
    </div>
  );
}
