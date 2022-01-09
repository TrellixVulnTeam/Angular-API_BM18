// login.spec.js created with Cypress

/// <reference types="cypress" />

// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import Chance from 'chance';
const chance = new Chance();

describe ('Register', () => {

    const email = chance.email();
    const password = 'password';
    const firstname = chance.first();
    const lastname = chance.last();

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('has a title', () => {

        cy.get('.header-title').contains('Polytech Tours')
        expect(2).to.equal(2);
    });


    it('has a headband', () => {

        cy.get('.display-4').contains('Site interne de Polytech Tours')

    });

it('click on card', () => {

    cy.get('div.card.text-white.mx-auto').click();
    cy.contains('Connexion').click();
    cy.url().should('include', 'body/login');
});

it('register or inscription', () => {
    cy.get('div.card.text-white.mx-auto').click();

    cy.url().should('include', 'body/login');

    cy.contains('Inscription').click();

    //Asset URL
    cy.url().should('include', 'body/register');

    //Fill out the form
    cy.get('input[name=lastname]').type(lastname);
    cy.get('input[name=firstname]').type(firstname);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);

    cy.get('button[type=submit]').click();

    //cy.login(email, password);

    //cy.request('POST', 'http://localhost:3000/api/auth/signup')


})

    

});