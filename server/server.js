const express = require('express')
const app = express();
const cors = require("cors");

require('./components/config/pirates.config');

app.use(cors());
app.use(express.json(), express.urlencoded({extended:true}));

require('./components/routes/pirate.routes') (app);
const server = app.listen(8000, () => console.log("connnected to port 8000"));

const socketio = require('socket.io');
const { Pirate, user } = require('./components/models/pirate');
io = socketio(server, {cors:true});

io.on("connection", socket => {
    socket.on("updateAllPirates", async () => {
        let res = [];
        await(Pirate.find().sort({name: "asc"}).then(e => res = [...e])).catch(e => res = e);
        io.emit("pirates", res);
    })
    socket.on("updateUser", async (id) => {
        let res = await(user.findById(id));
        console.log(id);
        socket.emit("user", res);
    })
    // socket.on("chat", async (room) => {
    //     let res = await(message.find({room:room}));
    //     io.in(room).emit("messages", res);
    // })
    // socket.on("joinChat", async (room) => {
    //     let res = await(message.find({room:room}));
    //     socket.join(room);
    // })
})