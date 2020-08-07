describe('Take the Test', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/')
  })

  it('submit an incorrect word', () => {
    cy.get('[data-cy=input]')
      .type('abcd')
    cy.get('[data-cy=submit').click()
    cy.get('[data-cy=helper-text')
      .invoke('text').should('contain', 'Incorrect')
  })
})
