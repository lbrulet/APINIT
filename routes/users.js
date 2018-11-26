const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const colors = require("colors")
const dateFormat = require("dateformat")
const User = require("../models/usersModels")
const SALT_WORK_FACTOR = 10

// middleware that is specific to this router : 
// Ex : [2018-11-26, 19:35:17] - [ Sankamille ]: connexion to /api/user
router.use(function timeLog(req, res, next) {
    var now = new Date();
    console.log(colors.bold.green('[%s] - [ %s ] : connexion to %s'), dateFormat(now, "yyyy-mm-dd, HH:MM:ss"), req.user.username, req.originalUrl);
    next();
});

router.route('/user')
    //GET will get all users that are store into the database
    .get(function (req, res) {
        User.find({}, function (err, users) {
            if (err)
                return res.status(403).send(err)
            res.status(200).send(users);
        });
    })
    //POST will update a specific user finded by id
    .post(function (req, res) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err)
                return res.status(403).send({ message: err });
            bcrypt.hash(req.body.user.password, salt, function (err, hashedPassword) {
                if (err)
                    return res.status(403).send({ message: err });
                User.updateOne({ username: req.body.user._id }, { $set: { password: hashedPassword } }, function (err, result) {
                    if (err)
                        return res.status(403).send({ message: err });
                    res.status(200).send({ message: req.body.user._id + " has been modified!" });
                })
            })
        })
    })
    //PUT will create a new user into the database
    .put(function (req, res) {
        var user = new User()
        user.username = req.body.user.username
        user.password = req.body.user.password
        user.save(function (err) {
            if (err)
                return res.status(403).send({ message: err })
            res.status(200).send({ message: user._id + " - [" + user.username + "] has been registred!" })
        })
    })
    //DELETE will delete a specific user finded by id
    .delete(function (req, res) {
        User.deleteOne({ username: req.body.user._id }, function (err, result) {
            if (err)
                return res.status(403).send({ message: err })
            res.status(200).send({ message: req.body.user._id + "has been deleted!" })
        })
    })

module.exports = router