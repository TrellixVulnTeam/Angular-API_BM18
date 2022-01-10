// login.spec.js created with Cypress

/// <reference types="cypress" />

// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import Chance from 'chance';
const chance = new Chance();

describe('Objet', () => {

    //Initialisation des variables
    const email = 'jean.dujardin@email.com';
    const password = 'Jean';

    const title = chance.word();
    const describe = chance.word();
    const filepath = 'images/matin.jpg'
    const price = chance.integer({ min: 1, max: 200000000 });

    //Visite de la partie frontend
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    //Test de vente d'un produit
    it('Test e2e – 3 - Vendre un produit', () => {
        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();

        //Recherche d'éléments HTML
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

        //Recherche d'éléments HTML et clique
        cy.contains('Vendre').click();

        //Affirmation URL
        cy.url().should('include', 'body/new-thing');

        //Complétion d'un formulaire
        cy.get('input[name=title]').type(title);
        cy.get('input[type="file"]').attachFile(filepath);
        cy.get('input[name=price]').type(price);
        cy.get('textarea[name=describe]').type(describe);

        cy.wait(1000);

        //Recherche d'éléments HTML et clique
        cy.get('button[type=submit]').click();
    })

    //Test de consultation d'un produit
    it('Test e2e – 7 - Consulter un produit', () => {

        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

        //Recherche d'éléments HTML
        cy.contains('Connexion').click();

        //Complétion d'un formulaire
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        //Recherche d'éléments HTML et clique
        cy.get('button[type=submit]').click();

        //Affirmation URL
        cy.url().should('include', 'body/all-stuff');

        cy.wait(1000);

        //Recherche d'éléments HTML et clique
        cy.get('h3[name="title"]').contains(title).click();

        cy.wait(1000);

        //Recherche d'éléments HTML
        cy.get('h1[name="title"]').contains(title);
        cy.get('p[name="paraph"]').contains(describe);
    })

    //Test de modification d'un produit
    it('Test e2e – 4 - Modifier un produit', () => {

        //Recherche d'éléments HTML
        cy.get('div.card.text-white.mx-auto').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

        //Recherche d'éléments HTML
        cy.contains('Connexion').click();

        //Complétion d'un formulaire
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        //Recherche d'éléments HTML et clique
        cy.get('button[type=submit]').click();

        //Affirmation URL
        cy.url().should('include', 'body/all-stuff');

        //Recherche d'éléments HTML
        cy.contains(title).click();

        //Recherche d'éléments HTML et clique
        cy.get('button[name="modifier"]').click();

        //Initialisation d'une nouvelle variable
        const newtitle = chance.word();

        //Complétion d'un formulaire
        cy.get('input[name=title]').type(newtitle);

        cy.get('button[type=submit]').click();
    })

    //Test non passant de modification d'un produit
    it('Test e2e – 4.2 - Mauvais prix', () => {

        //Recherche d'éléments HTML et clique
        cy.get('div.card.text-white.mx-auto').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

        //Recherche d'éléments HTML
        cy.contains('Connexion').click();

        //Complétion d'un formulaire
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button[type=submit]').click();

        //Confirmation URL
        cy.url().should('include', 'body/all-stuff');

        //Recherche d'éléments URL
        cy.contains(title).click();

        //Recherche d'éléments URL et clique
        cy.get('button[name="modifier"]').click();

        //Initialisation d'une nouvelles variable
        const newprice = -1;

        //Complétion d'un formulaire
        cy.get('input[name=price]').type(newprice);

        //Recherche d'éléments URL et clique
        cy.get('button[type=submit]').click();
    })


    //Test de suppression d'un produit
    it('Test e2e – 6 - Supprimer un produit', () => {

        //Recherche d'éléments URL et clique
        cy.get('div.card.text-white.mx-auto').click();

        //Affirmation URL
        cy.url().should('include', 'body/login');

        //Recherche d'éléments URL et clique
        cy.contains('Connexion').click();

        //Complétion d'un formulaire
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button[type=submit]').click();

        //Affirmation URL
        cy.url().should('include', 'body/all-stuff');

        //Recherche d'éléments URL et clique
        cy.contains(title).click();

        cy.wait(1000);

        //Recherche d'éléments URL et clique
        cy.get('button[name="supprimer"]').click();
        cy.wait(1000);
    })

});