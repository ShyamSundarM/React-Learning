import styles from "./CartContent.module.css";
import { Divider } from "@mui/material";
import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../../context/food-context";
import AddressForm from "./AddressForm";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { getCurrentURL } from "./Shared";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";

const CartContent = () => {
  const foodCtx = useContext(FoodContext);
  const { foodItems } = foodCtx;
  const cartData = foodItems.filter((f) => f.chosenCount > 0);
  const netItemAmount = foodCtx.foodItems.reduce((total, f) => {
    return total + f.chosenCount * f.price;
  }, 0);
  const [shouldValidateForm, setShouldValidateForm] = useState(false);
  const [isOrderCreating, setIsOrderCreating] = useState(false);
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
      //console.log(JSON.stringify(data));
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
      setIsOrderCreating(true);
      try {
        var resp = await axios.post(getCurrentURL() + "/createOrder", data);
        if (resp.status === 200) {
          resetFormState();
          resetCart();
          setFormState("cart");
          foodCtx.setModalOpen(false);
        }
        setIsOrderCreating(false);
      } catch (e: any) {
        setIsOrderCreating(false);
      }
    }
  }, [formValid, shouldValidateForm]);
  function checkoutClickHandler() {
    setFormState("form");
  }
  function placeOrderClickHandler() {
    setShouldValidateForm(true);
  }
  function resetCart() {
    const data = foodItems.map((item) => ({ ...item, chosenCount: 0 }));
    foodCtx.setAllFoodItems([...data]);
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
    <Modal modalOpen={foodCtx.modalOpen} setModalOpen={foodCtx.setModalOpen}>
      <div className={styles.rootContainer}>
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
                <div className={styles.footerBtns}>
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
                      <LoadingButton
                        variant="contained"
                        loading={isOrderCreating}
                        onClick={placeOrderClickHandler}
                        className={`btn btn-success ${styles.checkOutBtn}`}
                      >
                        Order
                      </LoadingButton>
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
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CartContent;
