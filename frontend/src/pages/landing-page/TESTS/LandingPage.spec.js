import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "../LandingPage";

describe("Tests for LandingPage", () => {
  test("should have header text 'Sign-up'", () => {
    render(<LandingPage />);

    const headerText = screen.getByRole("heading", { name: "Sign-up!" });

    expect(headerText).toBeInTheDocument();
  });

  test("should have a button that says 'Switch To Login' ", () => {
    render(<LandingPage />);
    const headerText = screen.getByRole("heading", { name: "Sign-up!" });
    const button = screen.getByRole("button", { name: "Switch To Login" });
    const passwordConfirmInput = screen.getByRole("passwordInput", {
      name: "Confirm Password:",
    });

    fireEvent.click(button);

    expect(headerText.textContent).toBe("Login!");
    expect(button.textContent).toBe("Switch To Sign-up");
    expect(passwordConfirmInput).not.toBeInTheDocument();
  });

  // test("should have a button that submits a signup request", async () => {
  //   render(<LandingPage />);

  //   const submitButton = screen.getByRole("button", { name: "Submit" });

  //   fireEvent(submitButton);

  // });

  test("should have labels and inputs for email and password", () => {
    render(<LandingPage />);

    const emailLabel = screen.getByLabelText("Email:");
    const emailInput = screen.getByRole("textbox", { name: "Email:" });

    const passwordLabel = screen.getByLabelText("Password:");
    const passwordInput = screen.getByRole("passwordInput", { name: "Password:" });

    const passwordConfirmLabel = screen.getByLabelText("Confirm Password:");
    const passwordConfirmInput = screen.getByRole("passwordInput", {
      name: "Confirm Password:",
    });
  });
});
