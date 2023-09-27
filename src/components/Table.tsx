import { Form } from "./Input";
import styles from "./Table.module.css";

interface Props {
  Data: Form;
}
interface ResData {
  number: number;
  factor: number;
  result: number;
}
const Table = (props: Props) => {
  var resArray: Array<ResData> = [];
  for (let i = 1; i <= props.Data.till; i++) {
    resArray.push({
      number: props.Data.number,
      factor: i,
      result: props.Data.number * i,
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
