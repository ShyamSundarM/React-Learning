import React, { BaseSyntheticEvent, useState } from "react";
import styles from "./SignInUp.module.css";
import useInput from "./hooks/useInput";
import axios, { AxiosResponse } from "axios";
import { LoadingButton } from "@mui/lab";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
export type ValidatorFnObj = {
  isEmpty?: (value: string) => boolean;
  length?: (value: string) => boolean;
  matchErr?: (value: string) => boolean;
  allDigits?: (value: string) => boolean;
  checkUserName?: (value: string) => Promise<boolean>;
};
export default function SignInUp() {
  const [formState, setFormState] = useState("login");
  const [loginStatusData, setLoginStatusData] = useState<{
    message: string;
    code: number;
  }>({ message: "", code: 0 });
  const [registerStatusData, setRegisterStatusData] = useState<{
    message: string;
    code: number;
  }>({ message: "", code: 0 });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [regSnackBarVisible, setRegSnackBarVisible] = useState(false);
  const [isUserNameChecking, setIsUserNameChecking] = useState(false);
  const {
    enteredValue: loginUserName,
    valueChangeHandler: loginUserNameChangeHandler,
    inputBlurHandler: loginUserNameBlurHandler,
    errors: LoginUserNameErrors,
    isValid: loginUserNameIsValid,
  } = useInput({
    isEmpty: (value: string) => value.trim() !== "",
  });
  const {
    enteredValue: loginUserPwd,
    valueChangeHandler: loginUserPwdChangeHandler,
    inputBlurHandler: loginUserPwdBlurHandler,
    errors: LoginUserPwdErrors,
    isValid: loginPwdIsValid,
  } = useInput({ isEmpty: (value: string) => value.trim() !== "" });
  const {
    enteredValue: regFullName,
    valueChangeHandler: regFullNameChangeHandler,
    inputBlurHandler: regFullNameBlurHandler,
    errors: regFullNameErrors,
    isValid: regFullNameIsValid,
  } = useInput({ isEmpty: (value: string) => value.trim() !== "" });
  const {
    enteredValue: regPhoneNum,
    valueChangeHandler: regPhoneNumChangeHandler,
    inputBlurHandler: regPhoneNumBlurHandler,
    errors: regPhoneNumErrors,
    isValid: regPhoneNumIsValid,
  } = useInput({
    isEmpty: (value: string) => value.trim() !== "",
    allDigits: (value: string) => new RegExp("^[6789]{1}[1-9]{9}$").test(value),
  });
  const {
    enteredValue: regUserName,
    valueChangeHandler: regUserNameChangeHandler,
    inputBlurHandler: regUserNameBlurHandler,
    errors: regUserNameErrors,
    isValid: regUserNameIsValid,
  } = useInput({
    isEmpty: (value: string) => value.trim() !== "",
    checkUserName: async (value: string) => {
      //setIsUserNameChecking(true);
      if (value.trim().length === 0) return false;
      const res = await axios.get<boolean>(
        "https://rproj.somee.com/isUserNameAvailable/" + value
      );
      //setIsUserNameChecking(false);
      console.log(res.data);
      return res.data;
    },
  });
  const {
    enteredValue: regPwd,
    valueChangeHandler: regPwdChangeHandler,
    inputBlurHandler: regPwdBlurHandler,
    errors: regPwdErrors,
    isValid: regPwdIsValid,
  } = useInput({ isEmpty: (value: string) => value.trim() !== "" });
  const {
    enteredValue: regRePwd,
    valueChangeHandler: regRePwdChangeHandler,
    inputBlurHandler: regRePwdBlurHandler,
    errors: regRePwdErrors,
    isValid: regRePwdIsValid,
  } = useInput({
    isEmpty: (value: string) => value.trim() !== "",
    matchErr: (value: string) => value === regPwd,
  });

  function handleError(ex: any) {
    if (formState === "login") {
      if (ex.response.status === 401) {
        setLoginStatusData({
          message: "Incorrect UserName/Password",
          code: ex.response.status,
        });
      } else if (ex.response.status === 500) {
        setLoginStatusData({
          message: "Internal Server Error",
          code: ex.response.status,
        });
      } else {
        setLoginStatusData({
          message: "Unknown Error occured",
          code: ex.response.status,
        });
      }
    } else {
      if (ex.response.status === 401) {
        setRegisterStatusData({
          message: "Incorrect UserName/Password",
          code: ex.response.status,
        });
      } else if (ex.response.status === 500) {
        setRegisterStatusData({
          message: "Internal Server Error",
          code: ex.response.status,
        });
      } else {
        setRegisterStatusData({
          message: "Unknown Error occured",
          code: ex.response.status,
        });
      }
    }
  }
  async function regFormSubmitHandler(event: BaseSyntheticEvent) {
    event.preventDefault();
    setRegisterStatusData({ message: "", code: 0 });
    if (
      regFullNameIsValid &&
      regPhoneNumIsValid &&
      regUserNameIsValid &&
      regPwdIsValid &&
      regRePwdIsValid
    ) {
      setIsRegistering(true);
      try {
        const res = await axios.post("https://rproj.somee.com/register", {
          fullName: regFullName,
          phoneNumber: regPhoneNum,
          userName: regUserName,
          password: regPwd,
        });
        if (res.status === 200) {
          //console.log(res.data);
          if (res.data === "1") {
            setRegisterStatusData({
              message: "Registration Success",
              code: 200,
            });
          } else {
            setRegisterStatusData({ message: res.data, code: 500 });
          }
        }
      } catch (ex: any) {
        handleError(ex);
      }
      setRegSnackBarVisible(true);
      setIsRegistering(false);
    } else {
      regFullNameBlurHandler();
      regPhoneNumBlurHandler();
      regUserNameBlurHandler();
      regPwdBlurHandler();
      regRePwdBlurHandler();
    }
  }

  async function loginFormSubmitHandler(event: BaseSyntheticEvent) {
    event.preventDefault();
    setLoginStatusData({ message: "", code: 0 });
    if (loginUserNameIsValid && loginPwdIsValid) {
      console.log(loginUserNameIsValid + " " + loginPwdIsValid);
      setIsLoggingIn(true);
      try {
        const res = await axios.post("https://rproj.somee.com/auth", {
          userName: loginUserName,
          password: loginUserPwd,
        });
        if (res.status === 200) {
          setLoginStatusData({ message: "Login Success", code: 200 });
        }
      } catch (ex: any) {
        handleError(ex);
      }
      setSnackBarVisible(true);
      setIsLoggingIn(false);
    } else {
      loginUserNameBlurHandler();
      loginUserPwdBlurHandler();
    }
  }

  function registerClickHandler() {
    setFormState("register");
  }

  function signInClickHandler() {
    setFormState("login");
  }
  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }
  if (formState === "login")
    return (
      <>
        <div className={styles.formRoot}>
          <form onSubmit={loginFormSubmitHandler}>
            <input
              type="text"
              placeholder="UserName"
              className={`form-control`}
              onChange={loginUserNameChangeHandler}
              onBlur={loginUserNameBlurHandler}
              value={loginUserName}
            />
            {LoginUserNameErrors.isEmpty && (
              <p className={styles.errText}>UserName cannot be empty</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className={`form-control`}
              onChange={loginUserPwdChangeHandler}
              onBlur={loginUserPwdBlurHandler}
              value={loginUserPwd}
            />
            {LoginUserPwdErrors.isEmpty && (
              <p className={styles.errText}>Password cannot be empty</p>
            )}
            <LoadingButton
              type="submit"
              className="btn btn-primary"
              loading={isLoggingIn}
              variant="contained"
            >
              Login
            </LoadingButton>
            <p>
              Dont have an account ? Register{" "}
              <span
                onClick={registerClickHandler}
                className={styles.registerLink}
              >
                here
              </span>
            </p>
          </form>
        </div>
        <Snackbar
          open={snackBarVisible}
          onClose={() => setSnackBarVisible(false)}
          TransitionComponent={SlideTransition}
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Alert severity={loginStatusData.code === 200 ? "success" : "error"}>
            {loginStatusData.message}
          </Alert>
        </Snackbar>
      </>
    );
  if (formState === "register")
    return (
      <>
        <div className={styles.formRoot}>
          <form onSubmit={regFormSubmitHandler}>
            <input
              type="text"
              className={`form-control`}
              placeholder="Full Name"
              onChange={regFullNameChangeHandler}
              onBlur={regFullNameBlurHandler}
              value={regFullName}
            />
            {regFullNameErrors.isEmpty && (
              <p className={styles.errText}>Full Name cannot be empty</p>
            )}
            <input
              type="text"
              className={`form-control`}
              placeholder="Phone Number"
              onChange={regPhoneNumChangeHandler}
              onBlur={regPhoneNumBlurHandler}
              value={regPhoneNum}
            />
            {regPhoneNumErrors.isEmpty && (
              <p className={styles.errText}>Phone Number cannot be empty</p>
            )}
            {regPhoneNumErrors.allDigits && (
              <p className={styles.errText}>
                Phone Number not in correct format
              </p>
            )}
            <input
              type="text"
              className={`form-control`}
              placeholder="User Name"
              onChange={regUserNameChangeHandler}
              onBlur={regUserNameBlurHandler}
              value={regUserName}
            />
            {regUserNameErrors.isEmpty && (
              <p className={styles.errText}>UserName cannot be empty</p>
            )}
            <input
              type="password"
              className={`form-control`}
              placeholder="Password"
              onChange={regPwdChangeHandler}
              onBlur={regPwdBlurHandler}
              value={regPwd}
            />
            {regPwdErrors.isEmpty && (
              <p className={styles.errText}>Password cannot be empty</p>
            )}

            <input
              type="password"
              className={`form-control`}
              placeholder="Re-Enter Password"
              onChange={regRePwdChangeHandler}
              onBlur={regRePwdBlurHandler}
              value={regRePwd}
            />
            {regRePwdErrors.isEmpty && (
              <p className={styles.errText}>This field cannot be empty</p>
            )}
            {regRePwdErrors.matchErr && (
              <p className={styles.errText}>Passwords doesn't match</p>
            )}
            <LoadingButton
              type="submit"
              className="btn btn-success"
              variant="contained"
              loading={isRegistering}
            >
              Register
            </LoadingButton>
            <p>
              Already a member ?{" "}
              <span
                onClick={signInClickHandler}
                className={styles.registerLink}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
        <Snackbar
          open={regSnackBarVisible}
          onClose={() => setRegSnackBarVisible(false)}
          TransitionComponent={SlideTransition}
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Alert
            severity={registerStatusData.code === 200 ? "success" : "error"}
          >
            {registerStatusData.message}
          </Alert>
        </Snackbar>
      </>
    );
}
