console.log('javascript running');

$(document).ready(() => {
    console.log('jQuery loaded');
    $('#equals-button').on('click', calculate);
    $('#add-button').on('click', addButton);
    $('#subtract-button').on('click', subtractButton);
    $('#multiply-button').on('click', multiplyButton);
    $('#divide-button').on('click', divideButton);

})

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

    $('#left-value').val('');
    $('#right-value').val('');
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

}

