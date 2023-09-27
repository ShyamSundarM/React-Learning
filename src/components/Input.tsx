import { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./Input.module.css";

export interface Form {
  number: number;
  till: number;
}

interface Props {
  SendDataToTable: (formData: Form) => void;
}

const Input = (props: Props) => {
  const [formData, setFormData] = useState<Form>({ number: 0, till: 0 });
  function onInputDataChange(event: BaseSyntheticEvent) {
    setFormData((prev: Form) => {
      return { ...prev, [event.target.name]: +event.target.value } as Form;
    });
  }
  function onFormSubmit(event: BaseSyntheticEvent) {
    event.preventDefault();
    if (formData.number !== 0 && formData.till !== 0) {
      props.SendDataToTable(formData);
    } else {
      alert("Please fill all fields");
    }
  }
  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <div className={styles.title}>Table Generator</div>
      <div className={styles.inputs}>
        <input
          className="form-control"
          type="number"
          placeholder="Enter number"
          onChange={onInputDataChange}
          name="number"
          value={formData.number || ""}
        />
        <input
          className="form-control"
          type="number"
          placeholder="Till ?"
          onChange={onInputDataChange}
          name="till"
          value={formData.till || ""}
        />
      </div>
      <button className="btn btn-primary generateBtn" type="submit">
        Generate
      </button>
    </form>
  );
};

export default Input;
