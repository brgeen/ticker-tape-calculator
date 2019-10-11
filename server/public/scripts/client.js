console.log('javascript running');

$(document).ready(() => {
    console.log('jQuery loaded');
    $('#equals-button').on('click', calculate);

})

function calculate() {
    console.log('clicked');

    // $('#gameTable').empty();

    $.ajax({
        url: '/calculations',
        method: 'POST',
        data: {
            leftNumber: $('#left-value').val(),
            operator: $('#add-button').val(),
            rightNumber: $('#right-value').val(),
            result: 0,
        }

    }).then(function (response) {

        getCalculationResult();
    });
    // $('#newPlayerName').val('');
}

/*


function getCalculationResult() {
    $.ajax({
        type: 'GET',
        url: '/add-games'
    }).then(function (response) {
        appendCalculationResult(response)
        // this is calling the external function
    });
}

function appendCalculationResult(response) {

    for (let i = 0; i < response.length; i++) {



        $('#gameTable').append(`
        <tr>
        <td>${response[i].playerName}</td>
        <td>${response[i].playerScore}</td>
        <td>${response[i].opponentName}</td>
        <td>${response[i].opponentScore}</td>
        <td>${response[i].gameWinner}</td>
        </tr>
    `);

        console.log(response);

    }
}

*/