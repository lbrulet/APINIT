const User = require('../models/usersModels')
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;

exports.jwtOptions = jwtOptions;

exports.strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    User.findOne({ _id: jwt_payload.id }, function (err, user) {
        if (err)
            next(null, false);
        if (user)
            next(null, user);
        else
            next(null, false);
    });
});
