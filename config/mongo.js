var mongoose = require('mongoose');

//Function to connect to mongodb, "mongo" is the name of the container, "27017" is the port of mongodb, "users" is the collection used to store data in
mongoose.connect('mongodb://mongo:27017/users', { useNewUrlParser: true }, function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected on mongodb");
});