import {
  createContext,
  useState,
  PropsWithChildren,
  BaseSyntheticEvent,
} from "react";
import { Form } from "../components/Input";

export const TableInputContext = createContext({
  formData: { number: 0, till: 0 },
  resData: { number: 0, till: 0 },
  updateFormData: (formData: Form) => {},
  formDataInputChange: (event: BaseSyntheticEvent) => {},
  setResultData: (formData: Form) => {},
});

const TableInputContextProvider = (props: PropsWithChildren) => {
  const [formData, setFormData] = useState<Form>({ number: 0, till: 0 });
  const [resFormData, setResFormData] = useState<Form>({ number: 0, till: 0 });
  function updateFormData(formData: Form) {
    setFormData((prev) => formData);
  }
  function formDataInputChange(event: BaseSyntheticEvent) {
    setFormData((prev: Form) => {
      return { ...prev, [event.target.name]: +event.target.value } as Form;
    });
  }
  function setResultData(formData: Form) {
    setResFormData((prev) => formData);
  }
  return (
    <TableInputContext.Provider
      value={{
        formData: formData,
        updateFormData: updateFormData,
        formDataInputChange: formDataInputChange,
        setResultData: setResultData,
        resData: resFormData,
      }}
    >
      {props.children}
    </TableInputContext.Provider>
  );
};

export default TableInputContextProvider;
