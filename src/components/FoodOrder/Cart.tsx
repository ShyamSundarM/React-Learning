import { FoodContext } from "../../context/food-context";
import styles from "./Cart.module.css";
import { BiCartAlt } from "react-icons/bi";
import { useContext } from "react";

export default function Cart() {
  const foodCtx = useContext(FoodContext);
  const count = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount;
  }, 0);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <BiCartAlt size={20} color="#0e2343" />
          <div className={styles.CartText}>Cart</div>
          <div className={styles.count}>{count}</div>
        </div>
      </div>
    </>
  );
}
