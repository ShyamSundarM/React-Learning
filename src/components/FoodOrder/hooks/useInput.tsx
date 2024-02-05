import { BaseSyntheticEvent, useEffect, useState } from "react";
import { ValidatorFnObj } from "../SignInUp";

export default function useInput(validatorFnObj: ValidatorFnObj = null) {
  const [isTouched, setIsTouched] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const [unameRes, setUnameRes] = useState(null);
  useEffect(() => {
    var timer: NodeJS.Timeout;
    async function asyncBlock() {
      if (validatorFnObj.checkUserName) {
        if (enteredValue.trim().length > 3)
          timer = setTimeout(
            async () =>
              setUnameRes(await validatorFnObj.checkUserName(enteredValue)),
            1000
          );
        else setUnameRes(null);
      } else {
        setUnameRes(true);
      }
    }
    asyncBlock();
    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue]);

  const isEmptyRes = !!validatorFnObj.isEmpty
    ? validatorFnObj.isEmpty(enteredValue)
    : true;
  const lengthRes = !!validatorFnObj.length
    ? validatorFnObj.length(enteredValue)
    : true;
  const matchRes = !!validatorFnObj.matchErr
    ? validatorFnObj.matchErr(enteredValue)
    : true;
  const regex = !!validatorFnObj.regexRequired
    ? validatorFnObj.regexRequired(enteredValue)
    : true;

  const isValid = isEmptyRes && lengthRes && matchRes && regex && unameRes;
  function valueChangeHandler(event: BaseSyntheticEvent) {
    setEnteredValue(event.target.value);
    //if (validatorFnObj.checkUserName) inputBlurHandler();
  }
  function inputBlurHandler() {
    setIsTouched(true);
  }
  function clearInput() {
    setEnteredValue("");
    setIsTouched(false);
  }

  return {
    enteredValue,
    valueChangeHandler,
    inputBlurHandler,
    clearInput,
    errors: {
      isEmpty: isTouched && !isEmptyRes,
      length: isTouched && !lengthRes,
      matchErr: isTouched && !matchRes,
      regex: isTouched && !regex,
      userNameExists: unameRes,
    },
    isValid: isValid,
  };
}
