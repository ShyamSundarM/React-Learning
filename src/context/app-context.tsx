import { Slide, SlideProps } from "@mui/material";
import { PropsWithChildren, createContext, useState } from "react";

type ContextType = {
  setLoginSnackBarVisible: (status: boolean) => void;
  setRegisterSnackBarVisible: (status: boolean) => void;
  loginSnackBarVisible: boolean;
  registerSnackBarVisible: boolean;
  setLoginStatusData: (data: { message: string; code: number }) => void;
  setRegisterStatusData: (data: { message: string; code: number }) => void;
  loginStatusData: { message: string; code: number };
  registerStatusData: { message: string; code: number };
};
export const AppContext = createContext<ContextType>({
  setLoginSnackBarVisible: (status: boolean) => {},
  setRegisterSnackBarVisible: (status: boolean) => {},
  loginSnackBarVisible: false,
  registerSnackBarVisible: false,
  setLoginStatusData: (data: { message: string; code: number }) => {},
  setRegisterStatusData: (data: { message: string; code: number }) => {},
  loginStatusData: { message: "", code: 0 },
  registerStatusData: { message: "", code: 0 },
});

export function AppContextProvider(props: PropsWithChildren) {
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [regSnackBarVisible, setRegSnackBarVisible] = useState(false);
  const [logStatusData, setLogStatusData] = useState<{
    message: string;
    code: number;
  }>({ message: "", code: 0 });
  const [regStatusData, setRegStatusData] = useState<{
    message: string;
    code: number;
  }>({ message: "", code: 0 });
  function setLoginStatusData(data: { message: string; code: number }) {
    setLogStatusData(data);
  }
  function setRegisterStatusData(data: { message: string; code: number }) {
    setRegStatusData(data);
  }
  function setLoginSnackBarVisible(status: boolean) {
    setSnackBarVisible(status);
  }
  function setRegisterSnackBarVisible(status: boolean) {
    setRegSnackBarVisible(status);
  }
  return (
    <AppContext.Provider
      value={{
        setLoginSnackBarVisible,
        setRegisterSnackBarVisible,
        loginSnackBarVisible: snackBarVisible,
        registerSnackBarVisible: regSnackBarVisible,
        setLoginStatusData,
        setRegisterStatusData,
        loginStatusData: logStatusData,
        registerStatusData: regStatusData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
