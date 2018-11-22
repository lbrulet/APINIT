const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('./config/mongo')
const User = require("./models/usersModels")
const app = express();
const user = require("./routes/users")

const PORT = process.env.PORT || 8080
const HOST = "localhost"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', user);

app.get('/', function (req, res) {
    res.send({ message: "API SETUP BY @https://github.com/lbrulet/APINIT" });
});

app.listen(PORT, function (req, res) {
    console.log("Server launched");
});

