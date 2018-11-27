const User = require('../models/usersModels')
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//Secret into the .env file otherwise "SECRET", change it is recommend
jwtOptions.secretOrKey = process.env.SECRET || "SECRET";

exports.jwtOptions = jwtOptions;

exports.strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    User.findOne({ _id: jwt_payload.id }, function (err, user) {
        if (err)
            next(null, false);
        if (user)
            next(null, user);
        else
            next(null, false);
    });
});
