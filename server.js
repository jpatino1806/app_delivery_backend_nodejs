const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require ('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');


//////////   INICIALIZAR FIREBASE  ///////////////////
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const upload = multer({
    storage: multer.memoryStorage()
})



/////// RUTAS ////////
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');



const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

/////// LLAMANDO A LAS RUTAS  ////////////////
users(app, upload);
categories(app); 
address(app); 
products(app, upload);


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
