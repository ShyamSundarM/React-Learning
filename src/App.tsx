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
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./context/app-context";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}
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
  const AppCtx = useContext(AppContext);
  return (
    <>
      <RouterProvider router={router} />
      <Snackbar
        open={AppCtx.loginSnackBarVisible}
        onClose={() => AppCtx.setLoginSnackBarVisible(false)}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          severity={AppCtx.loginStatusData.code === 200 ? "success" : "error"}
        >
          {AppCtx.loginStatusData.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={AppCtx.registerSnackBarVisible}
        onClose={() => AppCtx.setRegisterSnackBarVisible(false)}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          severity={
            AppCtx.registerStatusData.code === 200 ? "success" : "error"
          }
        >
          {AppCtx.registerStatusData.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
