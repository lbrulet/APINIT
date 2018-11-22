const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/usersModels")
const SALT_WORK_FACTOR = 10

router.route('/user')
    .get(function (req, res) {
        User.find({}, function (err, users) {
            if (err)
                return res.status(403).send(err)
            res.status(200).send(users);
        });
    })
    .post(function (req, res) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err)
                return res.status(403).send({ message: err });
            bcrypt.hash(req.body.user.password, salt, function (err, hashedPassword) {
                if (err)
                    return res.status(403).send({ message: err });
                User.updateOne({ username: req.body.user.username }, { $set: { password: hashedPassword } }, function (err, result) {
                    if (err)
                        return res.status(403).send({ message: err });
                    res.status(403).send({ message: req.body.user.username + " has been modified with success!" });
                })
            })
        })
    })
    .put(function (req, res) {
        var user = new User()
        user.username = req.body.user.username
        user.password = req.body.user.password
        user.save(function (err) {
            if (err)
                return res.send({ message: err })
            res.send({ message: user._id + " - [" + user.username + "] has just registred!" })
        })
    })
    .delete(function (req, res) {
        res.send('delete a user');
    })

module.exports = router