const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [
            true,
            "Pirate's name is required!"
        ],
        minlength:[
            3,
            "Must be at least 3 characters!"
        ]
    },
    image: {
        type: String,
        required: [true, "Image is required!"]
    },
    numofchests: {
        type: String,
        required: [true, "A pirate needs his chests!"]
    },
    catchphrase: {
        type: String,
        required: [true, "A pirate needs at least one catchphrase!"]
    },
    position: {
        type: String,
        required: true
    },
    pegleg: {
        type: Boolean,
        required: true
    },
    eyepatch: {
        type: Boolean,
        required: true
    },
    hookhand: {
        type: Boolean,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [
            true,
            "There must be a username!"
        ],
        minlength: [3, 'username must be at least 3 characters']
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/]
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+[\.]+[a-zA-Z]{2,}$/]
    },
    favorites: [String]
});

const Pirate = mongoose.model("Author", PirateSchema);
const User = mongoose.model("User", UserSchema);

module.exports.Pirate = Pirate;
module.exports.user = User;