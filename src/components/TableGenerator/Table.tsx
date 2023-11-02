import { type } from "os";
import { Form } from "./Input";
import styles from "./Table.module.css";
import { useContext } from "react";
import { TableInputContext } from "../../context/table-input-context";

type ResData = {
  number: number;
  factor: number;
  result: number;
};
const Table = () => {
  const tableCtx = useContext(TableInputContext);
  var resArray: Array<ResData> = [];
  for (let i = 1; i <= tableCtx.resData.till; i++) {
    resArray.push({
      number: tableCtx.resData.number,
      factor: i,
      result: tableCtx.resData.number * i,
    });
  }

  return (
    <div className={styles.container} style={{ opacity: 1 }}>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Symbol</th>
            <th>Multiplier</th>
            <th>Equals</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {resArray.map((e) => (
            <tr key={e.factor}>
              <td>{e.number}</td>
              <td>X</td>
              <td>{e.factor}</td>
              <td>=</td>
              <td>{e.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
