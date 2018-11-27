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

router.route('/metadata')
    //GET will get the metadata of a specific user
    .get(async function (req, res) {
        User.findOne({ username: req.user.username }, function (err, metadata) {
            if (err)
                return res.status(403).send({ message: err })
            if (!metadata)
                return res.status(200).send({ message: "Metadata does not exist!" })
            res.status(200).send({ message: metadata.metadata })
        })
    })
    //POST will update metadata of a specific user
    .post(async function (req, res) {
        User.updateOne({ _id: req.body.user._id }, { $set: { metadata: req.body.user.metadata } }, function (err, result) {
            if (err)
                return res.status(403).send({ message: err })
            res.status(200).send({ message: req.body.user._id + "'s metadata has been modified!" });
        })
    })
    //DELETE will delete a metadata of a specific user
    .delete(async function (req, res) {
        User.deleteOne({_id: req.body.user._id}, function(err) {
            if (err)
                res.status(403).send({message: req.body.user._id + "'s metadata has been deleted!"})
        })
    })

router.route('/user')
    //GET will get all users that are store into the database
    .get(async function (req, res) {
        User.find({}, function (err, users) {
            if (err)
                return res.status(403).send(err)
            res.status(200).send(users);
        });
    })
    //POST will update a specific user finded by id
    .post(async function (req, res) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err)
                return res.status(403).send({ message: err });
            bcrypt.hash(req.body.user.password, salt, function (err, hashedPassword) {
                if (err)
                    return res.status(403).send({ message: err });
                User.updateOne({ _id: req.body.user._id }, { $set: { password: hashedPassword } }, function (err) {
                    if (err)
                        return res.status(403).send({ message: err });
                    res.status(200).send({ message: req.body.user._id + " has been modified!" });
                })
            })
        })
    })
    //PUT will create a new user into the database
    .put(async function (req, res) {
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
    .delete(async function (req, res) {
        User.deleteOne({ _id: req.body.user._id }, function (err) {
            if (err)
                return res.status(403).send({ message: err })
            res.status(200).send({ message: req.body.user._id + "has been deleted!" })
        })
    })

module.exports = router