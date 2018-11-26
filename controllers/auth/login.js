const express = require("express")
const User = require('../../models/usersModels')
const jwtConf = require('../../config/jwt')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/login', function (req, res) {
    if (!req.body.user.username || !req.body.user.password)
        return res.status(403).send({ message: "Username or password is undefined!" })
    User.findOne({ username: req.body.user.username }, function (err, user) {
        if (!user)
            return res.status(403).send({ message: "Username or password does not exist!" })
        user.comparePassword(req.body.user.password, function (err, isMatch) {
            if (err)
                return res.status(403).send({ message: err })
            if (!isMatch)
                return res.status(403).send({ message: "Username or password does not exist!" })
            var payload = { id: user.id };            
            var token = jwt.sign(payload, jwtConf.jwtOptions.secretOrKey);
            console.log(process.env.SECRET)
            res.status(200).send({ message: "Logged in with success!", token: token, client_id: user._id })
        })
    })
})

module.exports = router