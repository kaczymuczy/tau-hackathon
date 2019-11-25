/// <reference types="cypress"/>

export const urlPart = '/hackathonApp'

export function showExpensesChart() {
    cy.get('#showExpensesChart').click()
}

export function getFirstAd() {
    return cy.get('#flashSale img')
}

export function getSecondAd() {
    return cy.get('#flashSale2 img')
}