import styles from "./CartContent.module.css";
import { Divider, Modal } from "@mui/material";
import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../../context/food-context";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContent = (props: Props) => {
  const foodCtx = useContext(FoodContext);
  const { modalOpen } = props;
  const { foodItems } = foodCtx;
  const cartData = foodItems.filter((f) => f.chosenCount > 0);
  const netItemAmount = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount * f.price;
  }, 0);
  const [modalAnimClass, setModalAnimClass] = useState(styles.modalStartAnim);

  //  ;
  //const classes = isInitLoad ?  : ;
  function onModalClose() {
    setModalAnimClass(styles.modalCloseAnim);
    setTimeout(() => {
      setModalAnimClass("");
      props.setModalOpen((prev) => !prev);
    }, 200);
  }
  useEffect(() => {
    if (modalOpen) {
      setModalAnimClass(styles.modalStartAnim);
      const timer = setTimeout(() => {
        setModalAnimClass("");
      }, 200);
    }
  }, [modalOpen]);
  return (
    <Modal
      className={modalAnimClass}
      open={props.modalOpen}
      onClose={onModalClose}
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
  );
};

export default CartContent;
