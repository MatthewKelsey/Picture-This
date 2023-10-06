import { deleteUser } from "../../src/ApiClient";
import "cypress-file-upload";

const testEmail = "test@test.com";
Cypress.Commands.add("deleteUserByEmail", (email) => {
  deleteUser({ email });
});

describe("Register User", () => {
  it("registers a new user and deletes them", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=firstName]").type("Test");
    cy.get("input[name=lastName]").type("User");
    cy.get("input[name=email]").type(testEmail);
    cy.get("input[name=password]").type("TestUser{enter}");
  });
});

describe("Login User", () => {
  it("logs in test account", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name=email]").type(testEmail);
    cy.get("input[name=password]").type("TestUser{enter}");
  });
});

describe("Upload Album", () => {
  it("Creates a new album and uploads photos", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name=email]").type(testEmail);
    cy.get("input[name=password]").type("TestUser{enter}");
    cy.get(".add-photo").click();
    cy.get("input[name=albumName]").type("Test Album{enter}");
    cy.get("#add").click();
    cy.get('input[type="file"]').attachFile("TestImg.jpg", {
      subjectType: "input",
    });
    cy.get("button").click();
    cy.get("img");
    cy.deleteUserByEmail(testEmail);
  });
});

