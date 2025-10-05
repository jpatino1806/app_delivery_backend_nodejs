const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {
    //traer datos
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findById/:id', UsersController.findById);

    //guardar datos
    app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);
    app.post('/api/users/login', UsersController.login);
    
    //actualizar datos
    app.put('/api/users/update', upload.array('image', 1), UsersController.update);



}