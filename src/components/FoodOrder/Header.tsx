import { useContext, useState } from "react";
import Cart from "./Cart";
import styles from "./Header.module.css";
import { FoodContext } from "../../context/food-context";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const foodCtx = useContext(FoodContext);
  const totalCount = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount;
  }, 0);
  return (
    <nav className={`navbar navbar-light bg-dark ${styles.container}`}>
      <a className={`navbar-brand ${styles.title}`} href="#">
        React Food Order
      </a>
      <div className={styles.cartPos}>
        <Cart key={!foodCtx.modalOpen ? totalCount : ""} />
      </div>
    </nav>
  );
}
