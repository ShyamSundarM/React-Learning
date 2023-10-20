import { BaseSyntheticEvent, useEffect, useRef } from "react";
import styles from "./AddressForm.module.css";

type Props = {
  formValid: {
    name: boolean;
    address: boolean;
    phone: boolean;
  };
  setFormValid: React.Dispatch<
    React.SetStateAction<{
      name: boolean;
      address: boolean;
      phone: boolean;
    }>
  >;
  formValues: {
    name: string;
    address: string;
    phone: string;
  };
  setFormValues: React.Dispatch<
    React.SetStateAction<{
      name: string;
      address: string;
      phone: string;
    }>
  >;
  shouldValidate: boolean;
};

const AddressForm = (props: Props) => {
  function nameChangeHandler(event: BaseSyntheticEvent) {
    props.setFormValues((prev) => ({
      name: event.target.value,
      address: prev.address,
      phone: prev.phone,
    }));
  }
  function addressChangeHandler(event: BaseSyntheticEvent) {
    props.setFormValues((prev) => ({
      name: prev.name,
      address: event.target.value,
      phone: prev.phone,
    }));
  }
  function phoneChangeHandler(event: BaseSyntheticEvent) {
    props.setFormValues((prev) => ({
      name: prev.name,
      address: prev.address,
      phone: event.target.value,
    }));
  }
  function onNameBlur() {
    if (props.formValues.name === null || props.formValues.name === "") {
      props.setFormValid((prev) => ({
        name: false,
        address: prev.address,
        phone: prev.phone,
      }));
    } else {
      props.setFormValid((prev) => ({
        name: true,
        address: prev.address,
        phone: prev.phone,
      }));
    }
  }
  function onAddressBlur() {
    if (props.formValues.address === null || props.formValues.address === "") {
      props.setFormValid((prev) => ({
        name: prev.name,
        address: false,
        phone: prev.phone,
      }));
    } else {
      props.setFormValid((prev) => ({
        name: prev.name,
        address: true,
        phone: prev.phone,
      }));
    }
  }
  function onPhoneBlur() {
    if (props.formValues.phone === null || props.formValues.phone === "") {
      props.setFormValid((prev) => ({
        name: prev.name,
        address: prev.address,
        phone: false,
      }));
    } else {
      props.setFormValid((prev) => ({
        name: prev.name,
        address: prev.address,
        phone: true,
      }));
    }
  }
  const { formValid } = props;
  useEffect(() => {}, [formValid]);

  return (
    <>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control"
            onChange={nameChangeHandler}
            onBlur={onNameBlur}
            value={props.formValues.name || ""}
          />
          {props.formValid.name === false && (
            <p className={styles.errorText}>Name cannot be blank</p>
          )}
        </div>
        <div className={styles.formElement}>
          <input
            type="text"
            placeholder="Address"
            className="form-control"
            onChange={addressChangeHandler}
            onBlur={onAddressBlur}
            value={props.formValues.address || ""}
          />
          {props.formValid.address === false && (
            <p className={styles.errorText}>Address cannot be blank</p>
          )}
        </div>
        <div className={styles.formElement}>
          <input
            onChange={phoneChangeHandler}
            type="text"
            placeholder="Phone Number"
            className="form-control"
            onBlur={onPhoneBlur}
            value={props.formValues.phone || ""}
          />
          {props.formValid.phone === false && (
            <p className={styles.errorText}>Number cannot be blank</p>
          )}
        </div>
      </form>
    </>
  );
};

export default AddressForm;
