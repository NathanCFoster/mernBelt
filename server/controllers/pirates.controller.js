const Pirate = require('../models/pirate');

module.exports.findAllPirates = (req, res) => {
    Pirate.Pirate.find()
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findPirate = (req, res) => {
    Pirate.Pirate.findById(req.params._id)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.createPirate = (req, res) => {
    Pirate.Pirate.create(req.body)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.updatePirate = (req, res) => {
    Pirate.Pirate.updateOne({_id: req.params._id}, req.body, { new:true, runValidators: true})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.deletePirate = (req, res) => {
    Pirate.Pirate.deleteOne({_id: req.params._id})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findAllUsers = (req, res) => {
    Pirate.user.find()
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findUser = (req, res) => {
    Pirate.user.find({username:req.params.username})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findUserByID = (req, res) => {
    Pirate.user.findById(req.params._id)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findUserByEmail = (req, res) => {
    Pirate.user.find({email:req.params.email})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.createUser = (req, res) => {
    Pirate.user.create(req.body)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.updateUser = (req, res) => {
    Pirate.user.updateOne({_id: req.params._id}, req.body, { new: true, runValidators: true })
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.deleteUser = (req, res) => {
    Pirate.user.deleteOne({_id:req.params._id})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.sendMsg = (req, res) => {
    Pirate.message.create(req.body)
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}