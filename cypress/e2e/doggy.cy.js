const mockData = require('../../src/tests/utils/data');

describe('dog api process', () => {
  beforeEach(() => {
    console.log("defe")
    process.env.REACT_APP_DOG_CEO_URL = Cypress.env("apiUrl")
    console.log(process.env)
    cy.intercept(
      {
        method: 'GET',
        url: `**/breeds/list/all`, 
      },
      mockData.breeds
    ).as('getDogs')

    cy.intercept(
      {
        method: 'GET',
        url: `**/images/random/*`,
      },
      mockData.images
    ).as('getImages')
  })

  it('opens the frontend successfully', () => {
    process.env.REACT_APP_DOG_CEO_URL = Cypress.env("apiUrl")
    cy.visit('/')
    cy.contains('Dogs CEO')
    cy.contains("No Images? Try adjusting the filter!")
  })

  it('fails upon invalid input', () => {
    cy.visit('/')
    cy.contains('View Images').click()
    cy.contains("Dog breed is required!")
    cy.contains("Image count is required!")
    cy.contains("No Images? Try adjusting the filter!")
  })

  it('passes upon valid input and loads images of dogs', () => {
    cy.visit('/')
    cy.get('[name="breed"]').select(1).should('have.value', Object.keys(mockData.breeds.message)[0])
    cy.get('[name="imageCount"]').select(1).should('have.value', 1)
    cy.contains('View Images').click()
    cy.get('.alert').should('not.exist');
    cy.get('.my-masonry-grid').find('img').should('have.attr', 'src', mockData.images.message[0])
  })

  it('gets a sub-breed value and works just fine', () => {
    cy.visit('/')
    cy.get('[name="breed"]').select(6).should('have.value', Object.keys(mockData.breeds.message)[5])
    cy.get('[name="subBreed"]').select(1).should('have.value', mockData.breeds.message.australian[0])
    cy.get('[name="imageCount"]').select(1).should('have.value', 1)
    cy.contains('View Images').click()
    cy.get('.alert').should('not.exist');
    cy.get('.my-masonry-grid').find('img').should('have.attr', 'src', mockData.images.message[0])
  })
})