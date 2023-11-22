import { BaseSyntheticEvent, useContext, useState } from "react";
import styles from "./SignInUp.module.css";
import useInput from "./hooks/useInput";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentURL } from "./Shared";
import { AppContext } from "../../context/app-context";
import { AnimatePresence, motion } from "framer-motion";
export type ValidatorFnObj = {
  isEmpty?: (value: string) => boolean;
  length?: (value: string) => boolean;
  matchErr?: (value: string) => boolean;
  regexRequired?: (value: string) => boolean;
  checkUserName?: (value: string) => Promise<boolean>;
};

export default function SignInUp() {
  const [queryParams] = useSearchParams();
  const AppCtx = useContext(AppContext);
  const navigate = useNavigate();
  var formState = "login";
  if (queryParams.get("mode") === "login") {
    formState = "login";
  }
  if (queryParams.get("mode") === "register") {
    formState = "register";
  }

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

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
    clearInput: regFullNameClearInput,
    valueChangeHandler: regFullNameChangeHandler,
    inputBlurHandler: regFullNameBlurHandler,
    errors: regFullNameErrors,
    isValid: regFullNameIsValid,
  } = useInput({ isEmpty: (value: string) => value.trim() !== "" });
  const {
    enteredValue: regPhoneNum,
    clearInput: regPhoneNumClearInput,
    valueChangeHandler: regPhoneNumChangeHandler,
    inputBlurHandler: regPhoneNumBlurHandler,
    errors: regPhoneNumErrors,
    isValid: regPhoneNumIsValid,
  } = useInput({
    isEmpty: (value: string) => value.trim() !== "",
    regexRequired: (value: string) =>
      new RegExp("^[6789]{1}[1-9]{9}$").test(value),
  });
  const {
    enteredValue: regUserName,
    clearInput: regUserNameClearInput,
    valueChangeHandler: regUserNameChangeHandler,
    inputBlurHandler: regUserNameBlurHandler,
    errors: regUserNameErrors,
    isValid: regUserNameIsValid,
  } = useInput({
    isEmpty: (value: string) => value.trim() !== "",
    checkUserName: async (value: string) => {
      setIsUserNameChecking(true);
      const res = await axios.get<boolean>(
        getCurrentURL() + "/auth/isUserNameAvailable/" + value
      );
      setIsUserNameChecking(false);
      console.log(res.data);
      return res.data;
    },
    length: (value: string) => value.trim().length > 3,
  });
  const {
    enteredValue: regPwd,
    clearInput: regPwdClearInput,
    valueChangeHandler: regPwdChangeHandler,
    inputBlurHandler: regPwdBlurHandler,
    errors: regPwdErrors,
    isValid: regPwdIsValid,
  } = useInput({
    isEmpty: (value: string) => value.trim() !== "",
    regexRequired: (value: string) =>
      new RegExp("[A-Z]").test(value) &&
      new RegExp("[a-z]").test(value) &&
      new RegExp("[0-9]").test(value) &&
      new RegExp("[.@$%#]").test(value),
    length: (value: string) =>
      value.trim().length >= 6 && value.trim().length <= 9,
  });
  const {
    enteredValue: regRePwd,
    clearInput: regRePwdClearInput,
    valueChangeHandler: regRePwdChangeHandler,
    inputBlurHandler: regRePwdBlurHandler,
    errors: regRePwdErrors,
    isValid: regRePwdIsValid,
  } = useInput({
    isEmpty: (value: string) => value.trim() !== "",
    matchErr: (value: string) => value === regPwd,
  });

  function resetRegistrationForm() {
    regFullNameClearInput();
    regPhoneNumClearInput();
    regUserNameClearInput();
    regPwdClearInput();
    regRePwdClearInput();
  }

  function handleError(ex: any) {
    if (formState === "login") {
      if (ex.response) {
        if (ex.response.status === 401) {
          AppCtx.setLoginStatusData({
            message: "Incorrect UserName/Password",
            code: ex.response.status,
          });
        } else {
          AppCtx.setLoginStatusData({
            message: "Internal Server Error",
            code: ex.response.status,
          });
        }
      } else AppCtx.setLoginStatusData({ message: "Network Error", code: 500 });
    } else {
      if (ex.response) {
        AppCtx.setRegisterStatusData({
          message: "Internal Server Error",
          code: ex.response.status,
        });
      }
      AppCtx.setRegisterStatusData({ message: "Network Error", code: 500 });
    }
  }
  async function regFormSubmitHandler(event: BaseSyntheticEvent) {
    event.preventDefault();
    AppCtx.setRegisterStatusData({ message: "", code: 0 });
    if (
      regFullNameIsValid &&
      regPhoneNumIsValid &&
      regUserNameIsValid &&
      regPwdIsValid &&
      regRePwdIsValid
    ) {
      setIsRegistering(true);
      try {
        const res = await axios.post(getCurrentURL() + "/auth/register", {
          fullName: regFullName,
          phoneNumber: regPhoneNum,
          userName: regUserName,
          password: regPwd,
        });
        if (res.status === 200) {
          if (res.data === "1") {
            AppCtx.setRegisterStatusData({
              message: "Registration Success",
              code: 200,
            });
            resetRegistrationForm();
            navigate("?mode=login");
          } else {
            AppCtx.setRegisterStatusData({ message: res.data, code: 500 });
          }
        }
      } catch (ex: any) {
        handleError(ex);
      }
      AppCtx.setRegisterSnackBarVisible(true);
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
    AppCtx.setLoginStatusData({ message: "", code: 0 });
    //console.log(loginUserNameIsValid, loginPwdIsValid);
    if (loginUserNameIsValid && loginPwdIsValid) {
      //console.log(loginUserNameIsValid + " " + loginPwdIsValid);
      setIsLoggingIn(true);
      try {
        const res = await axios.post(getCurrentURL() + "/auth/login", {
          userName: loginUserName,
          password: loginUserPwd,
        });
        //console.log(res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("expires", res.data.expiresIn);
          AppCtx.setLoginStatusData({ message: "Login Success", code: 200 });
          navigate("/HomePage", { replace: true });
        }
      } catch (ex: any) {
        handleError(ex);
      }
      AppCtx.setLoginSnackBarVisible(true);
      //setSnackBarVisible(true);
      setIsLoggingIn(false);
    } else {
      loginUserNameBlurHandler();
      loginUserPwdBlurHandler();
    }
  }
  return (
    <AnimatePresence>
      <div className={styles.center}>
        {formState === "login" && (
          <motion.div
            className={styles.formRoot}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            //exit={{ opacity: 0, x: 50 }}
          >
            <form onSubmit={loginFormSubmitHandler}>
              <input
                type="text"
                disabled={isLoggingIn}
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
                disabled={isLoggingIn}
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
                <Link to={"?mode=register"} className={styles.registerLink}>
                  here
                </Link>
              </p>
            </form>
          </motion.div>
        )}
        {formState === "register" && (
          <motion.div
            className={styles.formRoot}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            //exit={{ opacity: 0, x: 50 }}
          >
            <form onSubmit={regFormSubmitHandler}>
              <input
                type="text"
                disabled={isRegistering}
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
                disabled={isRegistering}
                className={`form-control`}
                placeholder="Phone Number"
                onChange={regPhoneNumChangeHandler}
                onBlur={regPhoneNumBlurHandler}
                value={regPhoneNum}
              />
              {regPhoneNumErrors.isEmpty && (
                <p className={styles.errText}>Phone Number cannot be empty</p>
              )}
              {regPhoneNumErrors.regex && (
                <p className={styles.errText}>
                  Phone Number not in correct format
                </p>
              )}
              <input
                type="text"
                disabled={isRegistering}
                className={`form-control ${styles.regUname}`}
                placeholder="User Name"
                onChange={regUserNameChangeHandler}
                onBlur={regUserNameBlurHandler}
                value={regUserName}
              />
              <div className="unameProgressDiv">
                {isUserNameChecking && (
                  <CircularProgress
                    size={16}
                    className={styles.unameProgress}
                  />
                )}
                {regUserNameErrors.userNameExists !== null &&
                  !regUserNameErrors.userNameExists && (
                    <p className={styles.errText}>Username already taken</p>
                  )}
                {regUserNameErrors.userNameExists && (
                  <p className={styles.successText}>UserName available</p>
                )}
              </div>

              {regUserNameErrors.isEmpty && (
                <p className={styles.errText}>UserName cannot be empty</p>
              )}
              {regUserNameErrors.length && (
                <p className={styles.errText}>
                  UserName cannot be less than 4 characters
                </p>
              )}

              <input
                type="password"
                disabled={isRegistering}
                className={`form-control`}
                placeholder="Password"
                onChange={regPwdChangeHandler}
                onBlur={regPwdBlurHandler}
                value={regPwd}
              />
              {regPwdErrors.isEmpty && (
                <p className={styles.errText}>Password cannot be empty</p>
              )}
              {(regPwdErrors.regex || regPwdErrors.length) && (
                <p className={styles.errText}>
                  Password must contain 1Small, 1Capital and any of .@&$# with
                  length range of 6,9
                </p>
              )}

              <input
                type="password"
                disabled={isRegistering}
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
                <Link to={"?mode=login"} className={styles.registerLink}>
                  Sign In
                </Link>
              </p>
            </form>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
