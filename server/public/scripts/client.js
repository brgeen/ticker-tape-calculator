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
    getCalculationResult()
    getCalculationHistory()
})


function calculatorBodyButtonsHandler() {
    let buttonValue = $(this).closest('.calc-body-buttons').text();
    console.log(buttonValue);

}

function addButton() {
    operator = '+';
}
function subtractButton() {
    operator = '-';
}
function multiplyButton() {
    operator = '*';
}
function divideButton() {
    operator = '/';
}

let operator = '';

function clearFieldsButton() {
    $('#left-value').val('');
    $('#right-value').val('');
}

function calculate() {

    $('#calculation-result').empty();

    $.ajax({
        url: '/calculations',
        method: 'POST',
        data: {
            leftNumber: $('#left-value').val(),
            operator: operator,
            rightNumber: $('#right-value').val(),
            result: 0,
        }
    }).then(function (response) {
        getCalculationResult();
    });
}

function getCalculationResult() {

    $.ajax({
        type: 'GET',
        url: '/calculations'
    }).then(function (response) {
        appendCalculationResult(response)
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
        appendCalculationHistory(response)
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

