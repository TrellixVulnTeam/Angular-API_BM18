// login.spec.js created with Cypress

/// <reference types="cypress" />

// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import Chance from 'chance';
const chance = new Chance();

describe('Objet', () => {

    const email = 'jean.dujardin@email.com';
    const password = 'Jean';

    const title = chance.word();
    const describe = chance.word();
    const filepath = 'images/matin.jpg'
    const price = chance.integer({ min: 1, max: 200000000 });

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('vendre un produit', () => {
        cy.get('div.card.text-white.mx-auto').click();

        cy.contains('Connexion').click();

        cy.url().should('include', 'body/login');

        //Fill out the form
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button[type=submit]').click();

        //Asset URL
        cy.url().should('include', 'body/all-stuff');

        cy.contains('Vendre').click();

        cy.url().should('include', 'body/new-thing');


        //Fill out the form
        cy.get('input[name=title]').type(title);
        cy.get('input[type="file"]').attachFile(filepath);
        cy.get('input[name=price]').type(price);
        cy.get('textarea[name=describe]').type(describe);

        cy.wait(1000);
        cy.get('button[type=submit]').click();

    })

    it('consulter un produit', () => {
        cy.get('div.card.text-white.mx-auto').click();

        cy.url().should('include', 'body/login');

        cy.contains('Connexion').click();

        //Fill out the form
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button[type=submit]').click();

        //Asset URL
        cy.url().should('include', 'body/all-stuff');

        cy.wait(1000);

        cy.get('h3[name="title"]').contains(title).click();
        cy.wait(1000);
        cy.get('h1[name="title"]').contains(title);
        cy.get('p[name="paraph"]').contains(describe);

    })

    it('modifier un produit', () => {
        cy.get('div.card.text-white.mx-auto').click();

        cy.url().should('include', 'body/login');

        cy.contains('Connexion').click();

        //Fill out the form
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button[type=submit]').click();

        //Asset URL
        cy.url().should('include', 'body/all-stuff');

        cy.contains(title).click();

        cy.get('button[name="modifier"]').click();

        const newtitle = chance.word();

        //Fill out the form
        cy.get('input[name=title]').type(newtitle);

        cy.get('button[type=submit]').click();


    })

    it('modifier un produit ou pas', () => {
        cy.get('div.card.text-white.mx-auto').click();

        cy.url().should('include', 'body/login');

        cy.contains('Connexion').click();

        //Fill out the form
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button[type=submit]').click();

        //Asset URL
        cy.url().should('include', 'body/all-stuff');

        cy.contains(title).click();

        cy.get('button[name="modifier"]').click();

        const newprice = -1;

        //Fill out the form
        cy.get('input[name=price]').type(newprice);

        cy.get('button[type=submit]').click();
        
    })



    it('supprimer un produit', () => {
        cy.get('div.card.text-white.mx-auto').click();

        cy.url().should('include', 'body/login');

        cy.contains('Connexion').click();

        //Fill out the form
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button[type=submit]').click();

        //Asset URL
        cy.url().should('include', 'body/all-stuff');

        cy.contains(title).click();
        cy.wait(1000);
        cy.get('button[name="supprimer"]').click();
        cy.wait(1000);
    

    })

});