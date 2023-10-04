import { useContext } from "react";
import Input from "./Input";
import Table from "./Table";
import { TableInputContext } from "../context/table-input-context";

const TableRoot = () => {
  const tableCtx = useContext(TableInputContext);
  return (
    <>
      <Input />
      {tableCtx.resData.number !== 0 && <Table />}
    </>
  );
};

export default TableRoot;
