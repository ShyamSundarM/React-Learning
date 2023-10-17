import { FoodContext } from "../../context/food-context";
import styles from "./Cart.module.css";
import { BiCartAlt } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import CartContent from "./CartContent";

export default function Cart() {
  const foodCtx = useContext(FoodContext);
  const { foodItems } = foodCtx;
  const [modalOpen, setModalOpen] = useState(false);
  const [bumpAnimShow, setBumpAnimShow] = useState(false);
  const count = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount;
  }, 0);
  function onCartClick() {
    setModalOpen((prev) => !prev);
  }
  useEffect(() => {
    if (foodItems.length === 0) {
      return;
    }
    setBumpAnimShow(true);
    const timer = setTimeout(() => setBumpAnimShow(false), 300);
    return () => clearTimeout(timer);
  }, [foodItems]);
  const rootClasses = `${styles.container} ${
    bumpAnimShow ? styles.bumpAnim : ""
  }`;
  return (
    <>
      <div className={rootClasses} onClick={onCartClick}>
        <div className={styles.innerContainer}>
          <BiCartAlt size={20} color="#0e2343" />
          <div className={styles.CartText}>Cart</div>
          <div className={styles.count}>{count}</div>
        </div>
      </div>
      <CartContent modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
