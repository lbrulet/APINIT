require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser")
const passport = require("passport")
const mongoose = require('./config/mongo')
const app = express();
const jwt = require("./config/jwt")
const user = require("./routes/users")
const register = require("./controllers/auth/register")
const login = require("./controllers/auth/login")

//env port by default otherwise 8080
const PORT = process.env.PORT || 8080

passport.use(jwt.strategy)

//bodyParser module is added to parse the body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET:POST:DELETE:PUT of user into ./routes/users
app.use('/', user)

app.use('/', register)
app.use('/', login)

//The main request of the api
app.get('/', function (req, res) {
    res.send({ message: "API SETUP BY @https://github.com/lbrulet/APINIT" });
});

//Server start
app.listen(PORT, function (req, res) {
    console.log("Server launched");
});

