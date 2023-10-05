import { render, screen } from "@testing-library/react";
import ShareAlbum from "./ShareAlbum";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Store/store";

test("renders ShareAlbum component", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ShareAlbum />
      </BrowserRouter>
    </Provider>
  );

  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeInTheDocument();
  
  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();
});
