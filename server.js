const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('./mongo')
const User = require("./models/usersModels")
const app = express();

const PORT = process.env.PORT || 8080
const HOST = "localhost"


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send({ message: "API SETUP BY @https://github.com/lbrulet/APINIT" });
});

app.get('/add', function (req, res) {
    var user = new User();
    user.username = "Luc Brulet";
    user.password = "oui"
    user.save(function (err) {
        if (err)
            res.send({ message: err })
        res.send({ message: "Success" })
    })
})

app.get('/get', function (req, res) {
    User.find({}, function (err, data) {
        if (err)
            res.send(err)
        res.send(data);
    });
})

app.listen(PORT, function (req, res) {
    console.log("Server launched");
});

