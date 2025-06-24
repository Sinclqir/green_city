describe('Debug Tests', () => {
  it("Test simple de soumission de formulaire", () => {
    cy.visit('/register')
    
    // Vérifier que la page se charge
    cy.get('h2').should('contain', 'Créer un compte')
    
    // Remplir le formulaire avec des données valides
    cy.get('input[name="email"]').clear().type('debug@test.com')
    cy.get('input[name="password"]').clear().type('test1234')
    
    // Vérifier que les champs sont remplis
    cy.get('input[name="email"]').should('have.value', 'debug@test.com')
    cy.get('input[name="password"]').should('have.value', 'test1234')
    
    // Cliquer sur le bouton
    cy.get('button[type="submit"]').should('be.visible').click()
    
    // Attendre et voir ce qui se passe
    cy.wait(3000)
    
    // Vérifier s'il y a des messages
    cy.get('body').then(($body) => {
      const messages = $body.find('p')
      cy.log(`Nombre de messages trouvés: ${messages.length}`)
      messages.each((i, el) => {
        cy.log(`Message ${i}: ${el.textContent}`)
      })
    })
    
    // Vérifier l'URL
    cy.url().then((url) => {
      cy.log(`URL actuelle: ${url}`)
    })
  })
}) 