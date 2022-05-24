import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = (props) => {
  const [formValue, setformValue] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    SSN: "",
  });

  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    validate();
    props.resetTimer();
  }, [
    formValue.FirstName,
    formValue.LastName,
    formValue.Address,
    formValue.SSN,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginFormData = new FormData();
    loginFormData.append("firstName", formValue.FirstName);
    loginFormData.append("lastName", formValue.LastName);
    loginFormData.append("address", formValue.Address);
    loginFormData.append("ssn", formValue.SSN);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/members",
        loginFormData,
        {
          headers: {
            Authorization: "Bearer " + props.password,
          },
        }
      );

      props.addMember(response.data);
    } catch (error) {
      props.renderErrorList(error);
    }
  };

  const validate = () => {
    let validityStatus = true;

    const { FirstName, LastName, Address, SSN } = formValue;

    if (FirstName.length <= 1 || FirstName != FirstName.trim()) {
      validityStatus = false;
    } else if (LastName.length <= 1 || LastName != LastName.trim()) {
      validityStatus = false;
    } else if (Address.length <= 1 || Address != Address.trim()) {
      validityStatus = false;
    } else if (!SSN.match(/^\d{3}-\d{2}-\d{4}$/)) {
      validityStatus = false;
    }

    setValidForm(validityStatus);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setformValue({
      ...formValue,
      [event.target.id]: event.target.value,
    });
  };

  const resetForm = (event) => {
    event.preventDefault();
    setformValue({ FirstName: "", LastName: "", Address: "", SSN: "" });
  };

  //Debug Mode Only
  const preFill = (event) => {
    event.preventDefault();
    setformValue({
      FirstName: "Nicolas",
      LastName: "Altomonte",
      Address: "Earth #829",
      SSN: "407-15-9921",
    });
  };

  return (
    <form className="form-container">
      <div>
        <label htmlFor="FirstName">First Name </label>
        <input
          id="FirstName"
          value={formValue.FirstName}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label htmlFor="LastName">Last Name </label>
        <input
          id="LastName"
          value={formValue.LastName}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label htmlFor="Address">Address</label>
        <input
          id="Address"
          value={formValue.Address}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label htmlFor="SSN">SSN</label>
        <input
          placeholder="123-45-6789"
          id="SSN"
          value={formValue.SSN}
          onChange={handleChange}
        ></input>
      </div>
      <div className="button-container">
        <button onClick={resetForm}>Reset</button>
        <button
          onClick={preFill}
          className={!props.debugMode ? "invisible" : ""}
        >
          Prefill
        </button>
        <button disabled={!validForm} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
