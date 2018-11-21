const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const PORT = 5000
const HOST = "localhost"


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.json({message: "API SETUP BY @https://github.com/lbrulet/APINIT"});
});

app.listen(PORT, HOST, function (req, res) {
    console.log("Server launched on " + HOST + ":" + PORT);
});

