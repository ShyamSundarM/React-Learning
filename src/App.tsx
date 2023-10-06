import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import styles from "./App.module.css";
import TableRoot from "./components/TableRoot";
import TableInputContextProvider from "./context/table-input-context";
import FoodOrderRoot from "./components/FoodOrder/FoodOrderRoot";
import FoodContextProvider from "./context/food-context";

function App() {
  return (
    <div className={styles.container}>
      <TableInputContextProvider>
        {null && <TableRoot />}
      </TableInputContextProvider>
      <FoodContextProvider>
        <FoodOrderRoot />
      </FoodContextProvider>
    </div>
  );
}

export default App;
