var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/users', { useNewUrlParser: true }, function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected on mongodb");
});