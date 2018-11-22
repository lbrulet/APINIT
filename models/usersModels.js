const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) 
        return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

var User = mongoose.model('User', UserSchema);

module.exports = User