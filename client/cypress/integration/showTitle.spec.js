describe('Show Site Title', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/')
  })

  it('the title is visible', () => {
    cy.get('[data-cy=site-title]')
      .should('have.text', 'Spelling Test');
  })

})
