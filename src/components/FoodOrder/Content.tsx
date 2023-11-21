import { useContext } from "react";
import { FoodContext } from "../../context/food-context";
import FoodItem from "./FoodItem";
import styles from "./Content.module.css";
import { motion } from "framer-motion";
import CartContent from "./CartContent";

export default function Content() {
  const foodCtx = useContext(FoodContext);
  return (
    <>
      <motion.ul
        className={styles.container}
        animate={{ transition: { staggerChildren: 0.5 } }}
      >
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
      </motion.ul>
      <CartContent />
    </>
  );
}
