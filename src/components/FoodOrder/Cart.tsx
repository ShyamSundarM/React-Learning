import { FoodContext } from "../../context/food-context";
import styles from "./Cart.module.css";
import { BiCartAlt } from "react-icons/bi";
import { useContext, useState } from "react";
import { Divider, Modal } from "@mui/material";
import CartItem from "./CartItem";

export default function Cart() {
  const foodCtx = useContext(FoodContext);
  const cartData = foodCtx.foodItems.filter((f) => f.chosenCount > 0);
  const [modalOpen, setModalOpen] = useState(false);
  const count = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount;
  }, 0);
  const netItemAmount = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount * f.price;
  }, 0);
  function onCartClick() {
    setModalOpen((prev) => !prev);
  }
  return (
    <>
      <div className={styles.container} onClick={onCartClick}>
        <div className={styles.innerContainer}>
          <BiCartAlt size={20} color="#0e2343" />
          <div className={styles.CartText}>Cart</div>
          <div className={styles.count}>{count}</div>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen((prev) => !prev)}
        BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.8)" } }}
      >
        <div className={styles.ModalContainer}>
          <div className={styles.modalTitle}>Your Cart Summary</div>
          <Divider color="rgb(91, 86, 86);" className="mt-2" />
          {cartData.length === 0 ? (
            <div className={styles.noItems}>
              Cart is empty, please go through my list of wonderful dishes
            </div>
          ) : (
            cartData.map((food) => {
              return (
                <CartItem
                  id={food.id}
                  image={food.image}
                  name={food.name}
                  price={food.price}
                  count={food.chosenCount}
                />
              );
            })
          )}
          {cartData.length > 0 && (
            <>
              <Divider color="rgb(91, 86, 86);" className="my-3" />
              <div className={styles.netItemAmount}>
                Total Payable :{" "}
                <span className={styles.itemSum}>{netItemAmount}₹</span>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
