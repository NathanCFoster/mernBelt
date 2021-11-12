const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/authors', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("established db connection"))
.catch(e => console.log(e));