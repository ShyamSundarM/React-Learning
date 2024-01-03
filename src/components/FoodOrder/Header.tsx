import { useContext, useState } from "react";
import Cart from "./Cart";
import styles from "./Header.module.css";
import { FoodContext } from "../../context/food-context";
import { AnimatePresence } from "framer-motion";
import { AppBar, Toolbar } from "@mui/material";

export default function Header() {
  const foodCtx = useContext(FoodContext);
  const totalCount = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount;
  }, 0);
  return (
    <AppBar
      position="static"
      className={styles.AppBar}
      style={{ backgroundColor: "#000000" }}
    >
      <Toolbar className={`${styles.container}`}>
        <a className={`${styles.title}`} href="#">
          React Food Order
        </a>
        <div className={styles.cartPos}>
          <Cart key={!foodCtx.modalOpen ? totalCount : ""} />
        </div>
      </Toolbar>
    </AppBar>
  );
}
