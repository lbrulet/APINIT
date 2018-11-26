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

//Passport will use jsonwebtoken
passport.use(jwt.strategy)

//bodyParser module is added to parse the body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET:POST:DELETE:PUT of user model
app.use('/api', passport.authenticate('jwt', { session: false }), user)

//Authentification route
app.use('/auth', register)
app.use('/auth', login)

//The secret route that will prove that your token is working
app.get('/secret', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send({ message: "You are authentified, gratz!"})
})

//The main request of the api
app.get('/', function (req, res) {
    res.send({ message: "API SETUP BY @https://github.com/lbrulet/APINIT" });
});

//Server start
app.listen(PORT, function (req, res) {
    console.log("Server launched");
});

