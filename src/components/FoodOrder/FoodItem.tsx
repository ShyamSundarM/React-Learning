import Counter from "./Counter";
import styles from "./FoodItem.module.css";

type Props = {
  id: number;
  name: string;
  image: string;
  count: number;
  price: number;
};

export default function FoodItem(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img src={props.image} className={styles.image} />
        <div className={styles.details}>
          <div className={styles.name}>{props.name}</div>
          <div className={styles.price}>Price: {props.price}₹</div>
        </div>
      </div>
      <div className={styles.counter}>
        <Counter count={props.count} id={props.id} />
      </div>
    </div>
  );
}
