import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import styles from "./App.module.css";
import TableRoot from "./components/TableGenerator/TableRoot";
import TableInputContextProvider from "./context/table-input-context";
import FoodOrderRoot from "./components/FoodOrder/FoodOrderRoot";
import FoodContextProvider from "./context/food-context";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignInUp from "./components/FoodOrder/SignInUp";
import HomePage from "./components/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to={"Auth"} />} />
      <Route path="/Auth" element={<SignInUp />} />
      <Route path="/HomePage" element={<HomePage />}>
        <Route
          path="TableGenerator"
          element={
            <TableInputContextProvider>
              <TableRoot />
            </TableInputContextProvider>
          }
        />
        <Route
          path="FoodOrder"
          element={
            <FoodContextProvider>
              <FoodOrderRoot />
            </FoodContextProvider>
          }
        ></Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
