import { motion } from "framer-motion";
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
    <motion.li
      className={styles.container}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { staggerChildren: 1 } }}
    >
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
    </motion.li>
  );
}
