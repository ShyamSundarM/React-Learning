import { useContext } from "react";
import Input from "./Input";
import Table from "./Table";
import { TableInputContext } from "../../context/table-input-context";
import styles from "./TableRoot.module.css";

const TableRoot = () => {
  const tableCtx = useContext(TableInputContext);
  return (
    <div className={styles.container}>
      <Input />
      {tableCtx.resData.number !== 0 && <Table />}
    </div>
  );
};

export default TableRoot;
