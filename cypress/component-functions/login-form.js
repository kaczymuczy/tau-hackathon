/// <reference types="cypress"/>

export const urlPart = '/hackathon'

export function getLogo() {
    return cy.get('.logo-w img')
}

export function getFormTitle() {
    return cy.get('h4')
}

export function getFormGroup(index) {
    return cy.get('.form-group').eq(index)
}

export function getFormFieldLabel(index) {
    return getFormGroup(index).find('label')
}

export function getFormFieldInput(index) {
    return getFormGroup(index).find('input')
}

export function getFormFieldIcon(index) {
    return getFormGroup(index).find('.os-icon')
}

export function getLoginButton() {
    return cy.get('#log-in')
}

export function getRememberMeCheckbox() {
    return cy.get('.form-check-input')
}

export function getRememberMeLabel() {
    return cy.get('.form-check-label')
}

export function getTwitterIcon() {
    return cy.get('img[src="img/social-icons/twitter.png"]')
}

export function getFacebookIcon() {
    return cy.get('img[src="img/social-icons/facebook.png"]')
}

export function getLinkedInIcon() {
    return cy.get('img[src="img/social-icons/linkedin.png"]')
}

export function getAlert() {
    return cy.get('.alert-warning')
}

export function logInWith(username, password) {
    if (username != '') getFormFieldInput(0).type(username)
    if (password != '') getFormFieldInput(1).type(password)
    getLoginButton().click()
}

export function enterUsername(username) {
    getFormFieldInput(0).type(username)
}

export function enterPassword(password) {
    getFormFieldInput(1).type(password)
}

export function submitForm() {
    getLoginButton().click()
}