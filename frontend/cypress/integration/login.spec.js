// login.spec.js created with Cypress

/// <reference types="cypress" />

// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import Chance from 'chance';
const chance = new Chance();

describe('Login', () => {

    //Initialisation des variables
    const email = 'jean.dujardin@email.com';
    const password = 'Jean';

    //Visite de la partie frontend
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    //Test de passage de la page d'acceuil
    it('cliquer sur le carte de la page d\'acceuil', () => {

        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();
        cy.contains('Connexion').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');
    });

    //Test de connexion à l'API
    it('connexion', () => {

        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();
        cy.contains('Connexion').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

        //Complétion d'un formulaire
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        //Recherche d'éléments HTML et clique
        cy.get('button[type=submit]').click();

        //Affirmation URL
        cy.url().should('include', 'body/all-stuff');
    })

    //Tets non passant de connexion à l'API
    it('mauvaise connexion', () => {

        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

        //Recherche d'éléments HTML et clique
        cy.contains('Connexion').click();

        //Complétion d'un formulaire
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type('bad password');

        //Recherche d'éléments HTML et clique
        cy.get('button[type=submit]').click();

        //Interception d'un trame d'échec
        cy.intercept('POST', 'http://localhost:3000/api/auth/signup', {
            statusCode: 401,
            body: 'Unauthorized',
        })

    })



});