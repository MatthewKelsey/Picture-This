import { render, screen } from "@testing-library/react";
import Uploader from "./Uploader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Store/store";

test("renders uploader component", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Uploader />
      </BrowserRouter>
    </Provider>
  );

  const submitButton = screen.getByText('Submit')
expect(submitButton).toBeInTheDocument()
expect(submitButton).toBeDisabled()



});

