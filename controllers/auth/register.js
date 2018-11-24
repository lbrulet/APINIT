const express = require("express")
const User = require('../../models/usersModels')
const router = express.Router()

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
            res.status(200).send({ message: "User: " + req.body.user.username + " has been registered!" })
        })
    })
})

module.exports = router
