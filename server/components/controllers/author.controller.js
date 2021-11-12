const Author = require('../models/author');

module.exports.findAllAuthors = (req, res) => {
    Author.author.find()
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findAuthor = (req, res) => {
    Author.author.findById(req.params._id)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.createAuthor = (req, res) => {
    Author.author.create(req.body)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.updateAuthor = (req, res) => {
    Author.author.updateOne({_id: req.params._id}, req.body, { new:true, runValidators: true})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.deleteAuthor = (req, res) => {
    Author.author.deleteOne({_id: req.params._id})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findAllUsers = (req, res) => {
    Author.user.find()
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findUser = (req, res) => {
    Author.user.find({username:req.params.username})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findUserByID = (req, res) => {
    Author.user.findById(req.params._id)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findUserByEmail = (req, res) => {
    Author.user.find({email:req.params.email})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.createUser = (req, res) => {
    Author.user.create(req.body)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.updateUser = (req, res) => {
    Author.user.updateOne({_id: req.params._id}, req.body, { new: true, runValidators: true })
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.deleteUser = (req, res) => {
    Author.user.deleteOne({_id:req.params._id})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.sendMsg = (req, res) => {
    Author.message.create(req.body)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}