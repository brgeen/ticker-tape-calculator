console.log('javascript running');

$(document).ready(() => {
    console.log('jQuery loaded');
    $('#equals-button').on('click', calculate);
    $('#add-button').on('click', addButton);
    $('#subtract-button').on('click', subtractButton);
    $('#multiply-button').on('click', multiplyButton);
    $('#divide-button').on('click', divideButton);
    $('#clear-button').on('click', clearFieldsButton);
    $('#calculator-body').on('click', '.calc-body-buttons', calculatorBodyButtonsHandler);
    getCalculationResult();
    getCalculationHistory();
})

let leftSideOfOperator = '';
let operator = '';
let rightSideOfOperator = '';
let fieldInput = '';

function calculatorBodyButtonsHandler() {
    if (operator.length === 0) {
        leftSideOfOperator += $(this).closest('.calc-body-buttons').text();
        fieldInput += $(this).closest('.calc-body-buttons').text();
    }
    if (operator.length === 1) {
        rightSideOfOperator += $(this).closest('.calc-body-buttons').text();
        fieldInput += $(this).closest('.calc-body-buttons').text();
    }
    $('#field-input').val(fieldInput);
}

function addButton() {
    operator = '+';
    fieldInput += '+'
    $('#field-input').val(fieldInput);
}
function subtractButton() {
    operator = '-';
    fieldInput += '-'
    $('#field-input').val(fieldInput);
}
function multiplyButton() {
    operator = '*';
    fieldInput += '*'
    $('#field-input').val(fieldInput);
}
function divideButton() {
    operator = '/';
    fieldInput += '/'
    $('#field-input').val(fieldInput);
}

function clearFieldsButton() {
    $('#left-value').val('');
    $('#right-value').val('');
    $('#field-input').val('');
}

function calculate() {

    if (rightSideOfOperator.length >= 1) { // this test for all necessary input

        $('#calculation-result').empty();

        $.ajax({
            url: '/calculations',
            method: 'POST',
            data: {
                leftNumber: leftSideOfOperator,
                operator: operator,
                rightNumber: rightSideOfOperator,
                result: 0,
            }
        }).then(function (response) {
            getCalculationResult();
        });
        leftSideOfOperator = '';
        operator = '';
        rightSideOfOperator = '';
        fieldInput = '';
    
    } else {
        null;
    }

}

function getCalculationResult() {

    $.ajax({
        type: 'GET',
        url: '/calculations'
    }).then(function (response) {
        appendCalculationResult(response);
    });
}

function appendCalculationResult(response) {

    $('#calculation-result').append(`
        <h3>${response[response.length - 1].result}</h3>
    `);
    getCalculationHistory();
}

function getCalculationHistory() {

    $.ajax({
        type: 'GET',
        url: '/calculations'
    }).then(function (response) {
        appendCalculationHistory(response);
    });
}

function appendCalculationHistory(response) {

    $('#calculation-history').empty();

    for (const object of response) {

        $('#calculation-history').prepend(
            `<li>
            ${object.leftNumber} 
            ${object.operator} 
            ${object.rightNumber} 
            =
            ${object.result} 
            </li>`
        );
    }
}

