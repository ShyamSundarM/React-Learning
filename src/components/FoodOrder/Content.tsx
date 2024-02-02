import { useContext } from "react";
import { FoodContext } from "../../context/food-context";
import FoodItem from "./FoodItem";
import styles from "./Content.module.css";
import { motion } from "framer-motion";
import CartContent from "./CartContent";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { User } from "../../context/app-context";
import { UserRole } from "../../enums/UserRole";

export default function Content() {
  const foodCtx = useContext(FoodContext);
  const isUnsavedItemPresent =
    foodCtx.foodItems.find((f) => f.id === "") !== undefined;
  const user = useSelector((s: any) => s.auth.user) as User;

  function newFoodItemClickHandler(event: any): void {
    var foodData = foodCtx.foodItems;
    foodData.unshift({
      id: "",
      name: "",
      image: "",
      description: "",
      price: 0,
      chosenCount: 0,
    });
    foodCtx.setAllFoodItems([...foodData]);
  }

  return (
    <>
      {user?.role === UserRole.Admin && (
        <Button
          onClick={newFoodItemClickHandler}
          variant="contained"
          color="primary"
          className={styles.AddButton}
          disabled={isUnsavedItemPresent}
        >
          Add New Item
        </Button>
      )}
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
              description={food.description}
            />
          );
        })}
      </motion.ul>
      <CartContent />
    </>
  );
}
