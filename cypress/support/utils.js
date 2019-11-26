/// <reference types="cypress" />

export function expectedUrl(urlPart) {
    return Cypress.config().baseUrl + urlPart + Cypress.env('urlSuffix')
}

export function runEyes(test) {
    cy.eyesOpen({ appName: 'TAU Hackathon', batchName: 'TAU Hackathon', testName: test, browser: { width: 1366, height: 768 } })
    // wait for the app to adjust - mainly dynamic and animated things like the expenses chart
    cy.wait(500)
    cy.eyesCheckWindow({ fully: true })
    cy.eyesClose()
}