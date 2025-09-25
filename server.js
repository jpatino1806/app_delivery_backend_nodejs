const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors')

/////// RUTAS ////////
const users = require('./routes/usersRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

/////// LLANDO A LAS RUTAS  ////////////////
users(app);


server.listen(port, '192.168.100.16' , function() {
    console.log('Servidor Nodejs, en el puerto ' + port + ' iniciada...');
});



//Error Handler
app.use( (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}
