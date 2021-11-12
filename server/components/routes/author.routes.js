const controller = require("../controllers/author.controller");

module.exports = app => {
    //authors
    app.get('/api/authors/:_id', controller.findAuthor);
    app.get('/api/authors', controller.findAllAuthors);
    app.post('/api/authors/new', controller.createAuthor);
    app.put('/api/authors/update/:_id', controller.updateAuthor);
    app.delete('/api/authors/delete/:_id', controller.deleteAuthor);
    //users
    app.get('/api/users/name/:username', controller.findUser);
    app.get('/api/users/email/:email', controller.findUserByEmail);
    app.get('/api/users/:_id', controller.findUserByID)
    app.get('/api/users', controller.findAllUsers);
    app.post('/api/users/new', controller.createUser);
    app.put('/api/users/update/:_id', controller.updateUser);
    app.delete('/api/users/delete/:_id', controller.deleteUser);
    //messages
    app.post('/api/messages/new', controller.sendMsg);
}

