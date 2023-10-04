import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import styles from "./App.module.css";
import TableRoot from "./components/TableRoot";
import TableInputContextProvider from "./context/table-input-context";

function App() {
  return (
    <div className={styles.container}>
      <TableInputContextProvider>
        <TableRoot />
      </TableInputContextProvider>
    </div>
  );
}

export default App;
