import React, { useState } from "react";

import postSignup from "./handlers/post-signup";
import "./landing-page.css";

const LandingPage = () => {
  const [headerText, setHeaderText] = useState("Sign-up!");
  const [headerButtonText, setHeaderButtonText] = useState("Switch To Login");
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAuthType = () => {
    setHeaderText(headerText === "Sign-up!" ? "Login!" : "Sign-up!");
    setHeaderButtonText(
      headerButtonText === "Switch To Login"
        ? "Switch To Sign-up"
        : "Switch To Login"
    );
  };

  const handlePost = async () => {
    const res = await postSignup("http://localhost:5000/api/v1/user/signup", {
      email: inputValues.email,
      password: inputValues.password,
      confirmPassword: inputValues.confirmPassword,
    });

    console.log(res);
  };

  return (
    <header className="header_container">
      <div className="card_container">
        <h1 className="card_title">{headerText}</h1>
        <label htmlFor="emailInput">Email:</label>
        <input
          type="email"
          id="emailInput"
          value={inputValues.email}
          onChange={(e) => {
            setInputValues({
              ...inputValues,
              email: e.target.value,
            });
          }}
        />

        <label htmlFor="passwordInput">Password:</label>
        <input
          type="password"
          id="passwordInput"
          alt="Password Input"
          value={inputValues.password}
          onChange={(e) => {
            setInputValues({
              ...inputValues,
              password: e.target.value,
            });
          }}
        />

        {headerText === "Sign-up!" && (
          <>
            <label htmlFor="passwordConfirmInput">Confirm Password:</label>
            <input
              type="password"
              id="passwordConfirmInput"
              alt="Confirm Password Input"
              value={inputValues.confirmPassword}
              onChange={(e) => {
                setInputValues({
                  ...inputValues,
                  confirmPassword: e.target.value,
                });
              }}
            />
          </>
        )}

        <button onClick={handlePost} className="card_button">
          Submit
        </button>
        <button className="card_button_underlined" onClick={handleAuthType}>
          {headerButtonText}
        </button>
      </div>
    </header>
  );
};

export default LandingPage;
