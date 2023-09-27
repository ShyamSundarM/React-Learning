import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import Input, { Form } from "./components/Input";
import Table from "./components/Table";

function App() {
  const [formData, setFormData] = useState<Form>();
  function SendDataToTable(formData: Form) {
    setFormData((prev) => formData);
  }
  return (
    <div className={styles.container}>
      <Input SendDataToTable={SendDataToTable} />
      {formData && <Table Data={formData} />}
    </div>
  );
}

export default App;
