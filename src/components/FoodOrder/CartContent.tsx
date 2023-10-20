import styles from "./CartContent.module.css";
import { Divider, Modal } from "@mui/material";
import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../../context/food-context";
import AddressForm from "./AddressForm";
import { json } from "stream/consumers";
import axios from "axios";

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
  const [shouldValidateForm, setShouldValidateForm] = useState(false);
  const [formValid, setFormValid] = useState<{
    name: boolean;
    address: boolean;
    phone: boolean;
  }>({ name: null, address: null, phone: null });
  const [formValues, setFormValues] = useState<{
    name: string;
    address: string;
    phone: string;
  }>({
    name: null,
    address: null,
    phone: null,
  });
  const [formState, setFormState] = useState("cart");
  var content;
  var modalTitle;
  if (formState === "cart") {
    content = cartData.map((food) => {
      return (
        <CartItem
          key={food.id}
          id={food.id}
          image={food.image}
          name={food.name}
          price={food.price}
          count={food.chosenCount}
        />
      );
    });
    modalTitle = "Cart Summary";
  } else if (formState === "form") {
    content = (
      <AddressForm
        formValid={formValid}
        setFormValid={setFormValid}
        shouldValidate={shouldValidateForm}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    );
    modalTitle = "Enter Details";
  }

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
  useEffect(() => {
    if (shouldValidateForm) {
      setShouldValidateForm(false);
    }
  }, [shouldValidateForm]);
  useEffect(() => {
    if (
      shouldValidateForm &&
      formState === "form" &&
      formValid.name &&
      formValid.address &&
      formValid.phone
    ) {
      const cartItems = cartData.map((item) => ({
        id: item.id,
        count: item.chosenCount,
      }));
      const data = {
        name: formValues.name,
        address: formValues.address,
        phone: formValues.phone,
        netAmount: netItemAmount,
        cartItems: cartItems,
      };
      updateDatabase(data);
    }
    async function updateDatabase(data: {
      name: string;
      address: string;
      phone: string;
      netAmount: number;
      cartItems: {
        id: number;
        count: number;
      }[];
    }) {
      var resp = await axios.post(
        "https://rproj.somee.com/createOrder",
        JSON.stringify(data)
      );
    }
  }, [formValid, shouldValidateForm]);
  function checkoutClickHandler() {
    setFormState("form");
  }
  function placeOrderClickHandler() {
    setShouldValidateForm(true);
  }
  function resetFormState() {
    setFormValues({
      name: null,
      address: null,
      phone: null,
    });
    setFormValid({
      name: null,
      address: null,
      phone: null,
    });
  }
  function cancelClickHandler() {
    setFormState("cart");
    resetFormState();
  }
  return (
    <Modal
      className={modalAnimClass}
      open={props.modalOpen}
      onClose={onModalClose}
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.8)" } }}
    >
      <div className={styles.ModalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>{modalTitle}</div>
          <Divider color="rgb(91, 86, 86);" className="" />
        </div>

        {cartData.length === 0 ? (
          <div className={styles.noItems}>
            Cart is empty, please go through my list of wonderful dishes
          </div>
        ) : (
          content
        )}
        {cartData.length > 0 && (
          <>
            <div className={styles.footer}>
              <Divider color="rgb(91, 86, 86);" className="mt-3" />
              <div className={styles.footerElements}>
                <div className={styles.netItemAmount}>
                  Total Payable :{" "}
                  <span className={styles.itemSum}>{netItemAmount}₹</span>
                </div>
                {formState === "cart" && (
                  <button
                    onClick={checkoutClickHandler}
                    className={`btn btn-success ${styles.checkOutBtn}`}
                  >
                    Checkout
                  </button>
                )}
                {formState === "form" && (
                  <>
                    <button
                      onClick={placeOrderClickHandler}
                      className={`btn btn-success ${styles.checkOutBtn}`}
                    >
                      Place Order
                    </button>
                    <button
                      onClick={cancelClickHandler}
                      className={`btn btn-danger ${styles.checkOutBtn}`}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CartContent;
