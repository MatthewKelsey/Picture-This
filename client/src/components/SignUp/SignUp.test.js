import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Store/store";

test("renders sign up component", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </Provider>
  );

  const signInHeading = screen.getByText("Sign Up");

  expect(signInHeading).toBeInTheDocument();

  const signInButton = screen.getByRole("button", { name: /Sign Up/i });
  expect(signInButton).toBeInTheDocument();
  expect(signInButton).toBeDisabled();
  const emailInput = screen.getByRole("textbox", { name: /Email Address/i });
  expect(emailInput).toBeInTheDocument();
  const firstNameInput = screen.getByRole("textbox", { name: /First Name/i });
  expect(firstNameInput).toBeInTheDocument();
  const lastNameInput = screen.getByRole("textbox", { name: /Last Name/i });
  expect(lastNameInput).toBeInTheDocument();
  const passwordInput = screen.getByTestId("password-input");
  expect(passwordInput).toBeInTheDocument();
});

