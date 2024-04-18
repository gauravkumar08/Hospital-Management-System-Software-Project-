var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Database1');
var db = mongoose.connection;
db.on('error', (err) => {
    console.error("Error in Connecting to Database:", err);
});
db.once('open', () => {
    console.log("Connected to Database");
});

mongoose.connect('mongodb://localhost:27017/Database1');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: 'Users' }); // Specify the collection name 'users'

const User = mongoose.model('User', userSchema);

app.post("/sign_up", async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    console.log("Received username:", username);
    console.log("Received password:", password);

    try {
        const user = await User.findOne({ username: username, password: password });

        console.log("Retrieved user:", user);

        if (user) {
            console.log("Login Successful");
            return res.redirect('/dashboard.html');
        } else {
            console.log("Invalid Credentials");
            return res.redirect('/invalid_credentials.html');
        }
    } catch (err) {
        console.error("Error during sign-up:", err);
        return res.redirect('/error.html');
    }
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('/login.html');
});

app.listen(3005, () => {
    console.log("Listening on port 3005");
});


