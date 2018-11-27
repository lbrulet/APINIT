const express = require("express")
const User = require('../../models/usersModels')
const colors = require("colors")
const dateFormat = require("dateformat")
const router = express.Router()

//Register function will search if username already exist, and create a new user into the database
router.put('/register', function (req, res) {
    if (!req.body.user.username || !req.body.user.password)
        return res.status(403).send({ message: "Username or password is undefined!" })
    User.findOne({ username: req.body.user.username }, function (err, user) {
        if (user)
            return res.status(403).send({ message: "Username already exist!" })
        var newUser = new User()
        newUser.username = req.body.user.username
        newUser.password = req.body.user.password
        newUser.save(function (err) {
            if (err)
                return res.status(403).send({ message: err })
            var now = new Date();
            console.log(colors.bold.green('[%s] - [ %s ] : connexion to %s'), dateFormat(now, "yyyy-mm-dd, HH:MM:ss"), req.body.user.username, req.originalUrl);
            res.status(200).send({ message: "User: " + req.body.user.username + " has been registered!" })
        })
    })
})

module.exports = router
