const express = require('express')
const app = express();
const cors = require("cors");

require('./components/config/authors.config');

app.use(cors());
app.use(express.json(), express.urlencoded({extended:true}));

require('./components/routes/author.routes') (app);
const server = app.listen(8000, () => console.log("connnected to port 8000"));

const socketio = require('socket.io');
const { author, user, message } = require('./components/models/author');
io = socketio(server, {cors:true});

io.on("connection", socket => {
    socket.on("updateAllAuthors", async () => {
        let res = [];
        await(author.find().then(e => res = [...e])).catch(e => res = e);
        io.emit("authors", res);
    })
    socket.on("updateUser", async (id) => {
        let res = await(user.findById(id));
        console.log(id);
        socket.emit("user", res);
    })
    socket.on("chat", async (room) => {
        let res = await(message.find({room:room}));
        io.in(room).emit("messages", res);
    })
    socket.on("joinChat", async (room) => {
        let res = await(message.find({room:room}));
        socket.join(room);
    })
})