import { useContext } from "react";
import Input from "./Input";
import Table from "./Table";
import { TableInputContext } from "../../context/table-input-context";
import styles from "./TableRoot.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/redux-store";

const TableRoot = () => {
  const tableCtx = useContext(TableInputContext);
  const count = useSelector((state: RootState) => state.count);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <Input />
      {tableCtx.resData.number !== 0 && <Table />}
      <div>count : {count}</div>
      <button onClick={() => dispatch({ type: "inc" })}>inc</button>
      <button onClick={() => dispatch({ type: "dec" })}>dec</button>
    </div>
  );
};

export default TableRoot;
