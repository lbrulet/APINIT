const User = require('../models/usersModels')
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
//Extract the token from the request
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//Secret into the .env file otherwise "SECRET", change it is recommend
jwtOptions.secretOrKey = process.env.SECRET || "SECRET";

exports.jwtOptions = jwtOptions;

//The JWT authentication strategy, return the user into the request if the token is correct
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
