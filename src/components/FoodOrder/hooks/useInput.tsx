import { BaseSyntheticEvent, useState } from "react";
import { ValidatorFnObj } from "../SignInUp";

export default function useInput(validatorFnObj: ValidatorFnObj = null) {
  const [isTouched, setIsTouched] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const isEmptyRes = !!validatorFnObj.isEmpty
    ? validatorFnObj.isEmpty(enteredValue)
    : true;
  const lengthRes = !!validatorFnObj.length
    ? validatorFnObj.length(enteredValue)
    : true;
  const matchRes = !!validatorFnObj.matchErr
    ? validatorFnObj.matchErr(enteredValue)
    : true;
  const allDigits = !!validatorFnObj.allDigits
    ? validatorFnObj.allDigits(enteredValue)
    : true;
  const userNameRes = !!validatorFnObj.checkUserName
    ? validatorFnObj.checkUserName(enteredValue)
    : true;
  const isValid =
    isEmptyRes && lengthRes && matchRes && allDigits && userNameRes;
  function valueChangeHandler(event: BaseSyntheticEvent) {
    setEnteredValue(event.target.value);
  }
  function inputBlurHandler() {
    setIsTouched(true);
  }

  return {
    enteredValue,
    valueChangeHandler,
    inputBlurHandler,
    errors: {
      isEmpty: isTouched && !isEmptyRes,
      length: isTouched && !lengthRes,
      matchErr: isTouched && !matchRes,
      allDigits: isTouched && !allDigits,
      userNameExists: isTouched && !userNameRes,
    },
    isValid: isValid,
  };
}
