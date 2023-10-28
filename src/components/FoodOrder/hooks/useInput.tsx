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
  const isValid = isEmptyRes && lengthRes;
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
    },
    isValid: isValid,
  };
}
