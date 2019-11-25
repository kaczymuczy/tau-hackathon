/// <reference types="cypress"/>

const tableId = '#transactionsTable'

export function collectTableData(dataStorage) {
    return cy.get(tableId)
        .find('tbody tr')
        .each(($row, index, $list) => {
            cy.wrap($row)
                .find('td *')
                .then(($cells) => {
                    dataStorage.push({
                        'status': {
                            'color': getComputedStyle($cells[0])['backgroundColor'],
                            'text': $cells[1].innerText
                        },
                        'date': {
                            'day': $cells[2].innerText,
                            'time': $cells[3].innerText
                        },
                        'description': {
                            'imgSrc': $cells[4].src,
                            'text': $cells[5].innerText
                        },
                        'category': {
                            'color': getComputedStyle($cells[6])['backgroundColor'],
                            'text': $cells[6].innerText
                        },
                        'amount': {
                            'color': getComputedStyle($cells[7])['color'],
                            'text': $cells[7].innerText
                        }
                    })
                })
        })
}

export function sortTransactionsBy(headerText) {
    cy.get(tableId)
        .find('thead')
        .contains('Amount')
        .click()
}

export function parseAmountToFloat(value) {
    return parseFloat(value
        .replace(' USD', '')
        .replace('- ', '-')
        .replace('+ ', '')
        .replace(',', ''))
}