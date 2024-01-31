import { Slide, SlideProps } from "@mui/material";
import { PropsWithChildren, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export type User = {
  id: string;
  fullName: string;
  uName: string;
  phoneNumber: string;
  role: string;
};

type ContextType = {
  setLoginSnackBarVisible: (status: boolean) => void;
  setRegisterSnackBarVisible: (status: boolean) => void;
  loginSnackBarVisible: boolean;
  registerSnackBarVisible: boolean;
  setLoginStatusData: (data: { message: string; code: number }) => void;
  setRegisterStatusData: (data: { message: string; code: number }) => void;
  loginStatusData: { message: string; code: number };
  registerStatusData: { message: string; code: number };
  LoggedUser: User;
  setLoggedUser: (user: User, expiresInMs: number) => void;
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
  LoggedUser: null,
  setLoggedUser: (user: User, expiresInMs: number) => {},
});

export function AppContextProvider(props: PropsWithChildren) {
  //const navigate = useNavigate();
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [regSnackBarVisible, setRegSnackBarVisible] = useState(false);
  const [LoggedUser, setLoggedUser] = useState(null);
  const [logStatusData, setLogStatusData] = useState<{
    message: string;
    code: number;
  }>({ message: "", code: 0 });
  const [regStatusData, setRegStatusData] = useState<{
    message: string;
    code: number;
  }>({ message: "", code: 0 });
  function setCurrentLoggedUser(user: User, expiresInMs: number) {
    setLoggedUser(user);
    const logOutTimer = setTimeout(() => {
      //navigate("/");
    }, expiresInMs);
  }
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
        LoggedUser,
        setLoggedUser: setCurrentLoggedUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
