import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const { isLoading, showAlert } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            value={values.name}
            name="name"
            onChange={handleChange}
            labelText="Name"
          />
        )}
        <FormRow
          type="email"
          value={values.email}
          name="email"
          handleChange={handleChange}
          labelText={"Email"}
        />
        <FormRow
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
          labelText={"Password"}
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
