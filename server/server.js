const express = require('express');

const bodyParser = require('body-parser'); 

const app = express();

app.use(bodyParser.urlencoded({extended: true})); 

app.use(express.static('server/public'))

const PORT = 5000;


let calculations = [];

app.get('/calculations', (req, res) => {
    res.send(calculations);
});

app.post('/calculations', (req, res) => {
    let leftNumber = req.body.leftNumber
    let rightNumber = req.body.rightNumber
    let operator = req.body.operator

    let result = `${parseInt(leftNumber)} ${operator} ${parseInt(rightNumber)}`

    console.log(eval(result));
    

    calculations.push(req.body);

    console.log(calculations);
    
});








app.listen(PORT, () => { // this listens for the port
    console.log('Up and running on port', PORT);
});