import { useContext } from "react";
import { FoodContext } from "../../context/food-context";
import FoodItem from "./FoodItem";
import styles from "./Content.module.css";

export default function Content() {
  const foodCtx = useContext(FoodContext);
  return (
    <div className={styles.container}>
      {foodCtx.foodItems.map((food) => {
        return (
          <FoodItem
            key={food.id}
            id={food.id}
            name={food.name}
            image={food.image}
            count={food.chosenCount}
            price={food.price}
          />
        );
      })}
    </div>
  );
}
