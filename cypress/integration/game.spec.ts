/// <reference types="cypress" />

const keyClick = (key: string) =>
  cy.get("[data-cy=key-container]").contains(key).click();

const keysClick = (keys: string[], enter: boolean = true) => {
  keys.forEach((key) => keyClick(key));
  return enter && keyClick("ENTER");
};

describe("game", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/word", (req) => {
      req.body = { ...req.body, wordId: 0 };
    }).as("gameRequest");

    cy.visit("/");
  });

  it("should correctly show the status of each letter after each attempt", () => {
    cy.get("[data-cy=letters-row]")
      .should("be.visible")
      .should("have.length", 6);

    keysClick(["T", "R", "E", "T", "A"]);

    cy.get("[data-cy=letter-container-wrong]").should("have.length", 2);
    cy.get("[data-cy=letter-container-exists]").should("have.length", 1);
    cy.get("[data-cy=letter-container-right]").should("have.length", 2);
  });

  it("should update keyboard letter colors after every attempt", () => {
    cy.get("[data-cy=letters-row]")
      .should("be.visible")
      .should("have.length", 6);

    keysClick(["M", "E", "T", "R", "O"]);

    cy.get("[data-cy=key-container]")
      .contains("M")
      .should("have.class", "bg-neutral-800");

    cy.get("[data-cy=key-container]")
      .contains("E")
      .should("have.class", "bg-green-600");

    cy.get("[data-cy=key-container]")
      .contains("T")
      .should("have.class", "bg-yellow-600");
  });

  it("should show a modal-won when all letters is right", () => {
    cy.get("[data-cy=letters-row]")
      .should("be.visible")
      .should("have.length", 6);

    keysClick(["T", "E", "S", "T", "E"]);

    cy.get("[data-cy=modal-won]").should("be.visible").contains("Parabéns");
  });

  it("should show a modal-lost when all attempts run out", () => {
    cy.get("[data-cy=letters-row]")
      .should("be.visible")
      .should("have.length", 6);

    keysClick(["V", "I", "D", "E", "O"]);
    keysClick(["V", "I", "D", "E", "O"]);
    keysClick(["V", "I", "D", "E", "O"]);
    keysClick(["V", "I", "D", "E", "O"]);
    keysClick(["V", "I", "D", "E", "O"]);
    keysClick(["V", "I", "D", "E", "O"]);

    cy.get("[data-cy=modal-lost]").should("be.visible").contains("Perdeu");
  });

  it("should start a new game by clicking 'Jogar novamente", () => {
    cy.get("[data-cy=letters-row]")
      .should("be.visible")
      .should("have.length", 6);

    keysClick(["T", "E", "S", "T", "E"]);

    cy.get("[data-cy=modal-won]").should("be.visible");
    cy.get("[data-cy=play-again]").should("be.visible").click();
    cy.get("[data-cy=modal-won]").should("not.exist");

    cy.get("[data-cy=selector-indicator]").parent().should("not.have.text");
  });

  it("should show error if trying to send incomplete word", () => {
    cy.get("[data-cy=letters-row]")
      .should("be.visible")
      .should("have.length", 6);

    keysClick(["T", "E", "S", "T"]);

    cy.get("[data-cy=error-container]")
      .should("be.visible")
      .contains("Apenas palavras com 5 letras");
  });

  it("should be possible to select letter with click", () => {
    cy.get("[data-cy=letters-row]")
      .should("be.visible")
      .should("have.length", 6);

    keysClick(["T", "E", "A", "T", "E"], false);

    cy.get("[data-cy=letters-row]")
      .contains("A")
      .should("have.length", 1)
      .click()
      .get("[data-cy=selector-indicator]")
      .should("have.length", 1);

    keysClick(["S"]);

    cy.get("[data-cy=modal-won]").should("be.visible");
  });

  it("should show an error if you try to send a word that doesn't exist in the list", () => {
    cy.get("[data-cy=letters-row]")
      .should("be.visible")
      .should("have.length", 6);

    keysClick(["T", "E", "S", "T", "R"]);

    cy.get("[data-cy=error-container]")
      .should("be.visible")
      .contains("Palavra inválida");
  });
});
