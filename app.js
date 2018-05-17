var express       = require('express'),
    app           = express(),
    bodyParser    = require("body-parser"),
    mysql         = require('mysql'),
    routes        = require('./routes'),
    user          = require('./routes/user'),
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

var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// var sess = req.session;  //initialize session variable
// req.session.userId = results[0].id; //set user id
// req.session.user = results[0];//set user name

// req.session.destroy(function(err) {
//       //cal back method
// });

// var message = "Pankaj";
// app.get("/", function(req, res){
//     res.render("index",{message: message});
// });

app.get('/', routes.index);//call for main index page
app.get('/login', user.login);//call for login page
app.get('/signup', user.signup);//call for signup page
app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post

app.listen(2000, function(){
   console.log("The GC Server Has Started!");
});
