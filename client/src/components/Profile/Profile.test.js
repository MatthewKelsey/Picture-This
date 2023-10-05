import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Store/store";

test("renders Profile component", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </Provider>
  );

  const myAlbums = screen.getByText("My albums");
  expect(myAlbums).toBeInTheDocument();

  const sharedAlbums = screen.getByText("Shared albums");
  expect(sharedAlbums).toBeInTheDocument();
});

test("renders new Album component with the '+' Add Album button", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </Provider>
  );

  const addAlbumButton = screen.getByText("+");
  expect(addAlbumButton).toBeInTheDocument();

  fireEvent.click(addAlbumButton);
  const newAlbumComponent = screen.getByTestId("new-album-form");
  expect(newAlbumComponent).toBeInTheDocument();
});
