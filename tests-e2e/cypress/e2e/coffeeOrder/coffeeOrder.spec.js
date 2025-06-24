import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estou na página home", () => {
  cy.visit(Cypress.env("frontendUrl"));
  cy.contains("h1", "Monte Seu Café").should("be.visible");
});

When("seleciono os ingredientes base {string}", (ingredientes) => {
  const ingredientesArray = ingredientes.split(",").map((item) => item.trim());

  ingredientesArray.forEach((ingredient) => {
    cy.get(`[data-testid="base-${ingredient}"]`).click();
  });
});

When("adiciono os adicionais {string} e {string}", (adicional1, adicional2) => {
  cy.get(`[data-testid="additional-${adicional1}"]`).click();
  cy.get(`[data-testid="additional-${adicional2}"]`).click();
  cy.get('[data-testid="confirm-additional-button"]').click()
});

When('adiciono três adicionais', () => {
  cy.get('[data-testid="additional-ingredients-list"] > button')
    .each(($el, index) => {
      if (index < 3) {
        cy.wrap($el).click();
      }
    });
});


When("confirmo a seleção dos ingredientes base", () => {
  cy.get('[data-testid="confirm-base-button"]').click();
});

When("confirmo o pedido", () => {
  cy.get('[data-testid="create-order-button"]').click();
});

Then("o sistema deve reconhecer o sabor clássico {string}", (flavor) => {
  cy.get('[data-testid="matched-flavor"] > div > p > strong').should("contain.text", flavor);
});

Then("o sistema deve reconhecer o adicional {string}", (additional) => {
  cy.get('[data-testid="additional-summary"]').should(
    "contain.text",
    additional
  );
});

Then('o sistema deve reconhecer os adicionais {string} e {string}', (adicional1, adicional2) => {
  cy.get('[data-testid="additional-summary"]')
    .should('contain.text', adicional1)
    .and('contain.text', adicional2);
});


Then(
  "o preço total deve ser exibido corretamente com o valor {string}",
  (expectedPrice) => {
    cy.get('[data-testid="total-price"]').should(
      "contain.text",
      `R$ ${expectedPrice}`
    );
  }
);

Then("o sistema deve exibir {string}", (message) => {
  cy.get('[data-testid="matched-flavor"]').should("contain.text", message);
});

Then("o sistema deve exibir a mensagem de erro {string}", (errorMessage) => {
  cy.contains(errorMessage).should("be.visible");
});

Then("preço total deve incluir o adicional", () => {});
