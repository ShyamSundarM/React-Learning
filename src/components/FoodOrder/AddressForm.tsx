import { useEffect, useRef } from "react";
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
  shouldValidate: boolean;
};

const AddressForm = (props: Props) => {
  const { formValid } = props;
  useEffect(() => {}, [formValid]);
  const { shouldValidate } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (shouldValidate) {
      if (nameRef.current.value.trim() === "") {
        console.log("err case" + nameRef.current.value);
        props.setFormValid((prev) => {
          return { name: false, address: prev?.address, phone: prev?.phone };
        });
      }
      if (addressRef.current?.value.trim() === "") {
        props.setFormValid((prev) => {
          return { name: prev?.name, address: false, phone: prev?.phone };
        });
      }
      if (phoneRef.current?.value.trim() === "") {
        props.setFormValid((prev) => {
          return { name: prev?.name, address: prev?.address, phone: false };
        });
      }
    }
  }, [shouldValidate]);
  return (
    <>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control"
            ref={nameRef}
          />
          {!props.formValid?.name && (
            <p className={styles.errorText}>Name cannot be blank</p>
          )}
        </div>
        <div className={styles.formElement}>
          <input
            type="text"
            placeholder="Address"
            className="form-control"
            ref={addressRef}
          />
          {!props.formValid?.address && (
            <p className={styles.errorText}>Address cannot be blank</p>
          )}
        </div>
        <div className={styles.formElement}>
          <input
            ref={phoneRef}
            type="text"
            placeholder="Phone Number"
            className="form-control"
          />
          {!props.formValid?.phone && (
            <p className={styles.errorText}>Number cannot be blank</p>
          )}
        </div>
      </form>
    </>
  );
};

export default AddressForm;
