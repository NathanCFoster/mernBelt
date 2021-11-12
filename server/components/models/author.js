const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [
            true,
            "Author's name is required!"
        ],
        minlength:[
            3,
            "Must be at least 3 characters!"
        ]
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

const MessageSchema = new mongoose.Schema({
    sentby: String,
    message: String,
    room: String
})

const Author = mongoose.model("Author", AuthorSchema);
const User = mongoose.model("User", UserSchema);
const Message = mongoose.model("Message", MessageSchema)

module.exports.author = Author;
module.exports.user = User;
module.exports.message = Message;