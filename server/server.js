const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'))

// ------------------------------------------------

let calculations = [];

app.get('/calculations', (req, res) => {
    res.send(calculations);
});

app.post('/calculations', (req, res) => {

    let leftNumber = req.body.leftNumber
    let rightNumber = req.body.rightNumber
    let operator = req.body.operator

    function serverSideCalculation() {

        if (operator === '+') {
            return parseInt(leftNumber) + parseInt(rightNumber);
        } else if (operator === '-') {
            return leftNumber - rightNumber;
        } else if (operator === '*') {
            return leftNumber * rightNumber;
        } else if (operator === '/') {
            return leftNumber / rightNumber;
        }
    };
    req.body.result = serverSideCalculation();
    calculations.push(req.body);
    res.sendStatus(200);
});

app.listen(PORT, () => { // this listens for the port
    console.log('Up and running on port', PORT);
});