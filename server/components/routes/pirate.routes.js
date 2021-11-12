const controller = require("../controllers/pirates.controller");

module.exports = app => {
    //Pirates
    app.get('/api/pirates/:_id', controller.findPirate);
    app.get('/api/pirates', controller.findAllPirates);
    app.post('/api/pirates/new', controller.createPirate);
    app.put('/api/pirates/update/:_id', controller.updatePirate);
    app.delete('/api/pirates/delete/:_id', controller.deletePirate);
    //users
    app.get('/api/users/name/:username', controller.findUser);
    app.get('/api/users/email/:email', controller.findUserByEmail);
    app.get('/api/users/:_id', controller.findUserByID)
    app.get('/api/users', controller.findAllUsers);
    app.post('/api/users/new', controller.createUser);
    app.put('/api/users/update/:_id', controller.updateUser);
    app.delete('/api/users/delete/:_id', controller.deleteUser);
}

