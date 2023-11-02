import { BaseSyntheticEvent, useContext } from "react";
import styles from "./Input.module.css";
import { type } from "os";
import { TableInputContext } from "../../context/table-input-context";

export type Form = {
  number: number;
  till: number;
};

const Input = () => {
  const tableCtx = useContext(TableInputContext);
  function onInputDataChange(event: BaseSyntheticEvent) {
    tableCtx.formDataInputChange(event);
  }
  function onFormSubmit(event: BaseSyntheticEvent) {
    event.preventDefault();
    if (tableCtx.formData.number !== 0 && tableCtx.formData.till !== 0) {
      tableCtx.setResultData({
        number: tableCtx.formData.number,
        till: tableCtx.formData.till,
      });
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
          value={tableCtx.formData.number || ""}
        />
        <input
          className="form-control"
          type="number"
          placeholder="Till ?"
          onChange={onInputDataChange}
          name="till"
          value={tableCtx.formData.till || ""}
        />
      </div>
      <button className="btn btn-primary generateBtn" type="submit">
        Generate
      </button>
    </form>
  );
};

export default Input;
