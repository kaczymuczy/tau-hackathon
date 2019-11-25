/// <reference types="cypress" />

export function expectedUrl(urlPart) {
    return Cypress.config().baseUrl + urlPart + Cypress.env('urlSuffix')
}