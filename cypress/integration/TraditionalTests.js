/// <reference types="cypress"/>

import * as LoginForm from '../component-functions/login-form.js'
import * as MainPage from '../component-functions/main-page.js'
import * as TransactionsTable from '../component-functions/transactions-table.js'
import * as ExpensesChart from '../component-functions/expenses-chart.js'
import { expectedUrl } from '../support/utils.js'

describe('Traditonal functional test suite', () => {
    describe('Task 1: Login Page UI Elements Test', () => {
        it('Ensure everything looks OK on the Login Page', () => {
            cy.visit(LoginForm.urlPart)

            LoginForm.getLogo()
                .should('be.visible')
                .and('have.attr', 'src', 'img/logo-big.png')

            LoginForm.getFormTitle()
                .should('be.visible')
                .and('contain', 'Login Form')

            LoginForm.getFormFieldLabel(0)
                .should('be.visible')
                .and('have.text', 'Username')
            LoginForm.getFormFieldIcon(0)
                .should('be.visible')
                .should('have.class', 'os-icon-user-male-circle')
            LoginForm.getFormFieldInput(0)
                .should('be.visible')
                .and('be.enabled')
                .and('have.attr', 'placeholder', 'Enter your username')

            LoginForm.getFormFieldLabel(1)
                .should('be.visible')
                .and('have.text', 'Password')
            LoginForm.getFormFieldIcon(1)
                .should('be.visible')
                .and('have.class', 'os-icon-fingerprint')
            LoginForm.getFormFieldInput(1)
                .should('be.visible')
                .and('be.enabled')
                .and('have.attr', 'placeholder', 'Enter your password')

            LoginForm.getLoginButton()
                .should('be.visible')
                .and('be.enabled')
                .and('have.text', 'Log In')

            LoginForm.getRememberMeCheckbox()
                .should('be.visible')
                .and('be.enabled')
                .and('not.have.attr', 'style')
            LoginForm.getRememberMeLabel()
                .should('be.visible')
                .and('have.text', 'Remember Me')

            LoginForm.getTwitterIcon().should('be.visible')
            LoginForm.getFacebookIcon().should('be.visible')
            LoginForm.getLinkedInIcon().should('be.visible')
        })
    })

    describe('Task 2: Data-Driven Test', () => {
        const invalidLoginData = [
            { username: '', password: '', error: 'Both Username and Password must be present' },
            { username: 'user', password: '', error: 'Password must be present' },
            { username: '', password: 'pass123', error: 'Username must be present' }
        ]

        beforeEach(() => {
            cy.visit(LoginForm.urlPart)
        })

        invalidLoginData.forEach((testData) => {
            let testName = `Submitting the login form with username "${testData.username}" and password "${testData.password}" should throw an error`
            it(testName, () => {
                LoginForm.logInWith(testData.username, testData.password)
                LoginForm.getAlert()
                    .should('be.visible')
                    .and('contain', testData.error)
                    .and('have.attr', 'style', 'display: block;')
                cy.url().should('be.equal', expectedUrl(LoginForm.urlPart))
            })
        })

        it('Submitting the login form with valid credentials should log you in', () => {
            LoginForm.logInWith('username', 'password')
            cy.url().should('be.equal', expectedUrl(MainPage.urlPart))
        })
    })

    describe('Task 3: Table Sort Test', () => {
        it('Clicking once on the \'Amount\' header should sort the transactions in ascending order', () => {
            var transactionsBeforeSorting = []
            var transactionsAfterSorting = []

            cy.visit(MainPage.urlPart)

            TransactionsTable.collectTableData(transactionsBeforeSorting)
            TransactionsTable.sortTransactionsBy('Amount')
            TransactionsTable.collectTableData(transactionsAfterSorting).then(() => {
                expect(transactionsBeforeSorting).to.have.deep.members(transactionsAfterSorting)
                for (let i = 0; i < transactionsAfterSorting.length - 1; i++) {
                    let value1 = TransactionsTable.parseAmountToFloat(transactionsAfterSorting[i].amount.text)
                    let value2 = TransactionsTable.parseAmountToFloat(transactionsAfterSorting[i + 1].amount.text)
                    expect(value1).to.be.lessThan(value2)
                }
            })
        })
    })

    describe('Task 4: Canvas Chart Test', () => {
        it('Expenses chart should display data for incoming years when requested', () => {
            // testing the chart isn't really possible with Cypress or WebDriver since it's based on a <canvas/> element
            // the only thing I'm able to do here is check the <script/> used by the canvas if it's the one that's expected
            cy.visit(MainPage.urlPart)

            MainPage.showExpensesChart()
            ExpensesChart.getChartScript().then(($script) => {
                cy.fixture('canvas_script.txt').then((canvasScript) => {
                    let actualScript = $script.html().replace(/\s/g, '')
                    let expectedScript = canvasScript.replace(/\s/g, '')
                    expect(actualScript).to.be.equal(expectedScript)
                })
            })
        })
    })

    describe('Task 5: Dynamic Content Test', () => {
        it('Ensure that flash sale gifs exist on the main page when the "showAdd=true" query is provided', () => {
            cy.visit(MainPage.urlPart, {
                qs: { showAd: 'true' }
            })

            MainPage.getFirstAd()
                .should('be.visible')
                .and('have.attr', 'src')
                .and('match', /.*\.gif/)
            MainPage.getSecondAd()
                .should('be.visible')
                .and('have.attr', 'src')
                .and('match', /.*\.gif/)
        })
    })
})