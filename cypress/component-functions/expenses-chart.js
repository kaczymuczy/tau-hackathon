/// <reference types="cypress"/>

export function getChartScript() {
    return cy.get('#container + script')
}

export function addNextYear() {
    cy.get('#addDataset').click()
}