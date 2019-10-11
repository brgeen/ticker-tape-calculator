const express = require('express');

const bodyParser = require('body-parser'); 

const app = express();

app.use(bodyParser.urlencoded({extended: true})); 

app.use(express.static('server/public'))

const PORT = 5000;









app.listen(PORT, () => { // this listens for the port
    console.log('Up and running on port', PORT);
});