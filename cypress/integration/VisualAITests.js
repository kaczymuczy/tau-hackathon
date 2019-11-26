/// <reference types="cypress"/>

import * as LoginForm from '../component-functions/login-form.js'
import * as MainPage from '../component-functions/main-page.js'
import * as TransactionsTable from '../component-functions/transactions-table.js'
import * as ExpensesChart from '../component-functions/expenses-chart.js'
import { runEyes } from '../support/utils.js'

describe('Visual test suite', () => {
    describe('Task 1: Login Page UI Elements Test', () => {
        it('Ensure everything looks OK on the Login Page', () => {
            cy.visit(LoginForm.urlPart)

            runEyes('Task 1: Login Page UI Elements Test')
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

                runEyes(`Task 2: Data-Driven Test: ${testName}`)
            })
        })

        it('Submitting the login form with valid credentials should log you in', () => {
            LoginForm.logInWith('username', 'password')

            runEyes('Task 2: Data-Driven Test: Submitting the login form with valid credentials should log you in')
        })
    })

    describe('Task 3: Table Sort Test', () => {
        it('Clicking once on the \'Amount\' header should sort the transactions in ascending order', () => {
            cy.visit(MainPage.urlPart)

            TransactionsTable.sortTransactionsBy('Amount')

            runEyes('Task 3: Table Sort Test')
        })
    })

    describe('Task 4: Canvas Chart Test', () => {
        it('Expenses chart should display data for incoming years when requested', () => {
            cy.visit(MainPage.urlPart)

            MainPage.showExpensesChart()
            ExpensesChart.addNextYear()

            runEyes('Task 4: Canvas Chart Test')
        })
    })

    describe('Task 5: Dynamic Content Test', () => {
        it('Ensure that flash sale gifs exist on the main page when the "showAdd=true" query is provided', () => {
            cy.visit(MainPage.urlPart, {
                qs: { showAd: 'true' }
            })

            runEyes('Task 5: Dynamic Content Test')
        })
    })
})