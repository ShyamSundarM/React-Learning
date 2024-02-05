import { useContext, useState } from "react";
import Cart from "./Cart";
import styles from "./Header.module.css";
import { FoodContext } from "../../context/food-context";
import { AnimatePresence } from "framer-motion";
import { AppBar, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "../../context/app-context";
import { UserRole } from "../../enums/UserRole";

export default function Header() {
  const foodCtx = useContext(FoodContext);
  const user = useSelector((s: any) => s.auth.user) as User;
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
        <div className={styles.leftItems}>
          <Link className={`${styles.title}`} to="/HomePage/FoodOrder">
            <span className={styles.ReactText}>React </span>Food Order
          </Link>
          {user.role === UserRole.Admin && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.HeaderItem} ${styles.HeaderItemActive}`
                  : styles.HeaderItem
              }
              to="orders"
            >
              Orders
            </NavLink>
          )}
        </div>
        <div className={styles.cartPos}>
          <Cart key={!foodCtx.modalOpen ? totalCount : ""} />
        </div>
      </Toolbar>
    </AppBar>
  );
}
