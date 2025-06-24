describe('API - Flavors', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:8080';

  let ingredientId1 ;
  let ingredientId2;
  let flavorId;

  before(() => {
    cy.request('POST', `${apiUrl}/admin/ingredients`, {
      name: `Ingrediente 1 - ${Date.now()}`,
      type: 'BASE',
      price: 5.00,
      stockQuantity: 100,
      active: true
    }).then((res1) => {
      ingredientId1 = res1.body.id;

      cy.request('POST', `${apiUrl}/admin/ingredients`, {
        name: `Ingrediente 2 - ${Date.now()}`,
        type: 'BASE',
        price: 3.00,
        stockQuantity: 100,
        active: true
      }).then((res2) => {
        ingredientId2 = res2.body.id;

        cy.request({
          method: 'POST',
          url: `${apiUrl}/admin/flavors`,
          qs: {
            name: `Sabor Teste ${Date.now()}`,
            ingredientIds: [ingredientId1, ingredientId2],
            basePrice: 9
          }
        }).then((resFlavor) => {
          flavorId = resFlavor.body.id;
        });
      });
    });
  });

  it('Deve listar sabores', () => {
    cy.request('GET', `${apiUrl}/admin/flavors`)
      .its('status')
      .should('eq', 200);
  });

  it('Deve criar um novo sabor utilizando os mesmos ingredientes base', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/admin/flavors`,
      qs: {
        name: `Novo Sabor ${Date.now()}`,
        ingredientIds: [ingredientId1, ingredientId2],
        basePrice: 10
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.include('Novo Sabor');
      expect(response.body.baseIngredients.length).to.eq(2);
    });
  });

  it('Deve atualizar o sabor criado', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/admin/flavors/${flavorId}`,
      qs: {
        name: 'Sabor Atualizado',
        ingredientIds: [ingredientId1, ingredientId2],
        basePrice: 12
      }
    }).its('status').should('eq', 200);
  });

  it('Deve deletar o sabor criado', () => {
    cy.request('DELETE', `${apiUrl}/admin/flavors/${flavorId}`)
      .its('status')
      .should('eq', 200); 
  });
});
