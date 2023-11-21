import { FoodContext } from "../../context/food-context";
import styles from "./Cart.module.css";
import { BiCartAlt } from "react-icons/bi";
import { useContext, useState } from "react";
import CartContent from "./CartContent";
import { AnimatePresence, motion } from "framer-motion";

export default function Cart() {
  const foodCtx = useContext(FoodContext);
  const count = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount;
  }, 0);
  function onCartClick() {
    foodCtx.setModalOpen(true);
  }

  return (
    <>
      <motion.div
        animate={{ x: [-10, 0, 10, 0, -10, 0, 10, 0, -10, 0] }}
        className={styles.container}
        onClick={onCartClick}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <div className={styles.innerContainer}>
          <BiCartAlt size={20} color="#0e2343" />
          <div className={styles.CartText}>Cart</div>
          <div className={styles.count}>{count}</div>
        </div>
      </motion.div>
    </>
  );
}
