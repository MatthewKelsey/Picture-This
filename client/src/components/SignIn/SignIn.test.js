import { render, screen } from "@testing-library/react";
import SignIn from "./SignIn";
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Store/store";

test("renders sign in component", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </Provider>
  );

  const signInHeading = screen.getByText("Sign In");

  expect(signInHeading).toBeInTheDocument();

  const signInButton = screen.getByRole("button", { name: /Sign In/i });
  expect(signInButton).toBeInTheDocument();
  expect(signInButton).toBeDisabled();
  const emailInput = screen.getByRole("textbox", { name: /Email Address/i });
  expect(emailInput).toBeInTheDocument();
  const passwordInput = screen.getByTestId("password-input");
  expect(passwordInput).toBeInTheDocument();
});

