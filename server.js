const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('./config/mongo')
const User = require("./models/usersModels")
const app = express();
const user = require("./routes/users")

//env port by default otherwise 8080
const PORT = process.env.PORT || 8080

//bodyParser module is added to parse the body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET:POST:DELETE:PUT of user into ./routes/users
app.use('/', user);

//The main request of the api
app.get('/', function (req, res) {
    res.send({ message: "API SETUP BY @https://github.com/lbrulet/APINIT" });
});

//Server start
app.listen(PORT, function (req, res) {
    console.log("Server launched");
});

