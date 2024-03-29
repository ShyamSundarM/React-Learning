import { useContext } from "react";
import { FoodContext } from "../../context/food-context";
import styles from "./Counter.module.css";

type Props = {
  count: number;
  id: string;
};

export default function Counter(this: any, props: Props) {
  const foodCtx = useContext(FoodContext);
  function onAddSubClick(isAdd: boolean) {
    var resCount = props.count;
    isAdd ? resCount++ : resCount--;
    if (resCount >= 0) {
      foodCtx.incDecFoodItem(props.id, isAdd);
    }
  }
  return (
    <div className={styles.container}>
      <button className={styles.plus} onClick={onAddSubClick.bind(this, true)}>
        +
      </button>
      <div className={styles.chosenCount}>{props.count}</div>
      <button
        className={styles.minus}
        onClick={onAddSubClick.bind(this, false)}
      >
        -
      </button>
    </div>
  );
}
