const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR = 10

//UserSchema is the model of the users collection
var UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    metadata: { type: Object, required: false}
}, { timestamps: true });

//comparePassword is a function that will compare the user password with his password into the database
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

//pre('save') is a method that will execute before save, it will hash the password before saving
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

//This line is to link the model to the collection
var User = mongoose.model('User', UserSchema);

module.exports = User