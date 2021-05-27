import React, { useState } from "react";

import "./landing-page.css";

const LandingPage = () => {
  const [headerText, setHeaderText] = useState("Sign-up!");
  const [headerButtonText, setHeaderButtonText] = useState("Switch To Login");

  const handleAuthType = () => {
    setHeaderText(headerText === "Sign-up!" ? "Login!" : "Sign-up!");
    setHeaderButtonText(
      headerButtonText === "Switch To Login"
        ? "Switch To Sign-up"
        : "Switch To Login"
    );
  };

  return (
    <header className="header_container">
      <div className="card_container">
        <h1 className="card_title">{headerText}</h1>
        <label htmlFor="emailInput">Email:</label>
        <input type="email" id="emailInput" />
        <label htmlFor="passwordInput">Password:</label>
        <input type="password" id="passwordInput" />
        {headerText === "Sign-up!" && (
          <>
            <label htmlFor="passwordConfirmInput">Confirm Password:</label>
            <input type="password" id="passwordConfirmInput" />
          </>
        )}

        <button className="card_button">Submit</button>
        <button className="card_button_underlined" onClick={handleAuthType}>
          {headerButtonText}
        </button>
      </div>
    </header>
  );
};

export default LandingPage;
