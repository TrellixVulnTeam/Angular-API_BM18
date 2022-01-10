// login.spec.js created with Cypress

/// <reference types="cypress" />

// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import Chance from 'chance';
const chance = new Chance();

describe('Register', () => {

    //Initialisation des variables
    const email = chance.email();
    const password = 'password';
    const firstname = chance.first();
    const lastname = chance.last();

    //Visite de la partie frontend
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    //Test titre - Polytech Tours
    it('titre - Polytech Tours', () => {

        //Recherche d'éléments HTML et clique
        cy.get('.header-title').contains('Polytech Tours');
        expect(2).to.equal(2);
    });

    //Test bandeau
    it('bandeau', () => {

        //Recherche d'éléments HTML et clique
        cy.get('.display-4').contains('Site interne de Polytech Tours');

    });

    //Test de passage de la page d'acceuil
    it('cliquer sur le carte de la page d\'acceuil', () => {

        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();
        cy.contains('Connexion').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');
    });

    //Test d'inscription
    it('inscription', () => {

        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

        //Recherche d'éléments HTML et clique
        cy.contains('Inscription').click();

        //Affirmation URL
        cy.url().should('include', 'body/register');

        //Complétion d'un formulaire
        cy.get('input[name=lastname]').type(lastname);
        cy.get('input[name=firstname]').type(firstname);
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        //Recherche d'éléments HTML et clique
        cy.get('button[type=submit]').click();

        //Affirmation URL
        cy.url().should('include', 'body/all-stuff');

        //Recherche d'éléments HTML et clique
        cy.contains('Déconnexion').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

    })

    //Test non passant de double inscription
    it('double inscription', () => {

        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

        //Recherche d'éléments HTML et clique
        cy.contains('Inscription').click();

        //Affirmation URL
        cy.url().should('include', 'body/register');

        //Complétion d'un formulaire
        cy.get('input[name=lastname]').type(lastname);
        cy.get('input[name=firstname]').type(firstname);
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        //Recherche d'éléments HTML et clique
        cy.get('button[type=submit]').click();

        //Interception d'un trame d'échec
        /*cy.intercept('POST', 'http://localhost:3000/api/auth/signup',  {
            statusCode: 400,
            body: 'Bad Request',
        })*/

        //Interception d'un trame d'échec
        cy.intercept('POST', 'http://localhost:3000/api/auth/signup', (req) => {
            expect(req.body).include('Bad Request')
        })

    })



});