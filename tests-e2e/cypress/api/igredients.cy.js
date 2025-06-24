describe('API - Ingredients', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:8080';

  it('Deve listar ingredientes', () => {
    cy.request('GET', `${apiUrl}/admin/ingredients`)
      .its('status')
      .should('eq', 200);
  });

  it('Deve criar um ingrediente', () => {
    cy.request('POST', `${apiUrl}/admin/ingredients`, {
      name: `Teste ${Date.now()}`,
      type: 'BASE',
      price: 5.00,
      stockQuantity: 100,
      active: true
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
    });
  });

  it('Deve atualizar um ingrediente', () => {
    cy.request('POST', `${apiUrl}/admin/ingredients`, {
      name: `Update ${Date.now()}`,
      type: 'BASE',
      price: 3.00,
      stockQuantity: 50,
      active: true
    }).then((res) => {
      const id = res.body.id;
      cy.request('PUT', `${apiUrl}/admin/ingredients/${id}`, {
        name: 'Ingrediente Atualizado',
        price: 4.00
      }).its('status').should('eq', 200);
    });
  });

  it('Deve deletar um ingrediente', () => {
    cy.request('POST', `${apiUrl}/admin/ingredients`, {
      name: `Deletar ${Date.now()}`,
      type: 'BASE',
      price: 2.00,
      stockQuantity: 30,
      active: true
    }).then((res) => {
      const id = res.body.id;
      cy.request('DELETE', `${apiUrl}/admin/ingredients/${id}`)
        .its('status')
        .should('eq', 200);
    });
  });

  it('Deve ativar um ingrediente', () => {
    cy.request('POST', `${apiUrl}/admin/ingredients`, {
      name: `Ativar ${Date.now()}`,
      type: 'BASE',
      price: 2.00,
      stockQuantity: 30,
      active: true
    }).then((res) => {
      const id = res.body.id;
      cy.request('PUT', `${apiUrl}/admin/ingredients/${id}/status?active=true`)
        .its('status')
        .should('eq', 200);
    });
  });

  it('Deve inativar um ingrediente', () => {
    cy.request('POST', `${apiUrl}/admin/ingredients`, {
      name: `Inativar ${Date.now()}`,
      type: 'BASE',
      price: 2.00,
      stockQuantity: 30,
      active: true
    }).then((res) => {
      const id = res.body.id;
      cy.request('PUT', `${apiUrl}/admin/ingredients/${id}/status?active=false`)
        .its('status')
        .should('eq', 200);
    });
  });

});
