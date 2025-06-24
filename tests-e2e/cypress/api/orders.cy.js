describe('API - Orders', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:8080';

  let ingredientId1;
  let ingredientId2;
  let additionalId1;
  let additionalId2;
  let orderId;

  before(() => {
    cy.request('POST', `${apiUrl}/admin/ingredients`, {
      name: `Base 1 - ${Date.now()}`,
      type: 'BASE',
      price: 5.00,
      stockQuantity: 100,
      active: true
    }).then((res1) => {
      ingredientId1 = res1.body.id;

      cy.request('POST', `${apiUrl}/admin/ingredients`, {
        name: `Base 2 - ${Date.now()}`,
        type: 'BASE',
        price: 4.00,
        stockQuantity: 100,
        active: true
      }).then((res2) => {
        ingredientId2 = res2.body.id;

        cy.request('POST', `${apiUrl}/admin/ingredients`, {
          name: `Adicional 1 - ${Date.now()}`,
          type: 'ADDITIONAL',
          price: 2.50,
          stockQuantity: 100,
          active: true
        }).then((res3) => {
          additionalId1 = res3.body.id;

          cy.request('POST', `${apiUrl}/admin/ingredients`, {
            name: `Adicional 2 - ${Date.now()}`,
            type: 'ADDITIONAL',
            price: 1.50,
            stockQuantity: 100,
            active: true
          }).then((res4) => {
            additionalId2 = res4.body.id;

            cy.request({
              method: 'POST',
              url: `${apiUrl}/orders`,
              qs: {
                baseIds: [ingredientId1, ingredientId2],
                additionalIds: [additionalId1, additionalId2]
              }
            }).then((resOrder) => {
              orderId = resOrder.body.id;
            });
          });
        });
      });
    });
  });

  it('Deve criar um pedido com adicionais com sucesso', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/orders`,
      qs: {
        baseIds: [ingredientId1, ingredientId2],
        additionalIds: [additionalId1, additionalId2]
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('totalPrice');
    });
  });

  it('Deve criar um pedido sem adicionais', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/orders`,
      qs: {
        baseIds: [ingredientId1, ingredientId2],
        additionalIds: []
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.additionalIngredients.length).to.eq(0);
    });
  });

  it('Deve retornar erro ao criar pedido sem bases', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/orders`,
      qs: {
        baseIds: [],
        additionalIds: [additionalId1]
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  });

  it('Deve retornar o resumo do pedido', () => {
    cy.request('GET', `${apiUrl}/orders/${orderId}/summary`)
      .its('status')
      .should('eq', 200);
  });

  it('Deve confirmar o pedido', () => {
    cy.request('POST', `${apiUrl}/orders/${orderId}/confirm`)
      .its('status')
      .should('eq', 200);
  });
});
