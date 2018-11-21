const mongoose = require("mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);

module.exports = User