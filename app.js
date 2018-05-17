var express       = require('express'),
    app           = express(),
    bodyParser    = require("body-parser"),
    mysql         = require('mysql'),
    routes        = require('./routes'),
    user          = require('./routes/user'),
    login         = require('./routes/login'),
    http          = require('http'),
    path          = require('path');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "GROUPCHAT"
});

connection.connect();

global.db = connection;

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname));


app.use(function(req, res, next){
   res.locals.currentUser = 'Pankaj';
   next();
});

// var message = "Pankaj";
// app.get("/", function(req, res){
//     res.render("index",{message: message});
// });

app.get('/', routes.index);//call for main index page
app.get('/login', login.login);//call for login page
app.get('/signup', user.signup);//call for signup page

app.listen(2444, function(){
   console.log("The GC Server Has Started!");
});
