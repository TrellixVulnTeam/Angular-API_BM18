// login.spec.js created with Cypress

/// <reference types="cypress" />

// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import Chance from 'chance';
const chance = new Chance();

describe('Login', () => {

    const email = 'jean.dujardin@email.com';
    const password = 'Jean';
    
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('click on card', () => {

        cy.get('div.card.text-white.mx-auto').click();
        cy.contains('Connexion').click();
        cy.url().should('include', 'body/login');
    });

    it('login', () => {
        cy.get('div.card.text-white.mx-auto').click();

        cy.contains('Connexion').click();

        cy.url().should('include', 'body/login');

        //Fill out the form
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button[type=submit]').click();

        //Asset URL
        cy.url().should('include', 'body/all-stuff');

    })

    it('bad login', () => {
        cy.get('div.card.text-white.mx-auto').click();

        cy.url().should('include', 'body/login');

        cy.contains('Connexion').click();

        //Fill out the form
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type('bad password');

        cy.get('button[type=submit]').click();


        cy.intercept('POST', 'http://localhost:3000/api/auth/signup',  {
            statusCode: 401,
            body: 'Unauthorized',
        })

    })



});