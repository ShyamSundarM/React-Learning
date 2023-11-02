import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import styles from "./App.module.css";
import TableRoot from "./components/TableRoot";
import TableInputContextProvider from "./context/table-input-context";
import FoodOrderRoot from "./components/FoodOrder/FoodOrderRoot";
import FoodContextProvider from "./context/food-context";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInUp from "./components/FoodOrder/SignInUp";

const router = createBrowserRouter([
  { path: "/", element: <SignInUp /> },
  {
    path: "tables",
    element: (
      <TableInputContextProvider>
        <TableRoot />
      </TableInputContextProvider>
    ),
  },
  {
    path: "foodOrder",
    element: (
      <FoodContextProvider>
        <FoodOrderRoot />
      </FoodContextProvider>
    ),
  },
]);

function App() {
  return (
    <div className={styles.container}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
