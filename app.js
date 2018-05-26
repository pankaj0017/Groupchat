var express       = require('express'),
    app           = express(),
    bodyParser    = require("body-parser"),
    mysql         = require('mysql'),
    routes        = require('./routes'),
    user          = require('./routes/user'),
    http          = require('http'),
    passwordHash  = require('password-hash'),
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



// CREATE TABLE IF NOT EXISTS `users` (
//   `id` int(5) NOT NULL AUTO_INCREMENT,
//   `first_name` text NOT NULL,
//   `last_name` text NOT NULL,
//   `mob_no` varchar(10) NOT NULL,
//   `email_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
//   `user_name` varchar(20) NOT NULL,
//   `password` varchar(500) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;


// app.use(function(req, res, next){
//   if(req.session.user != null){
//       res.locals.currentUser = req.session.user;
//    } else {
//       res.locals.currentUser = 0;
//    }
//    next();
// });


var session = require('express-session');
var SessionStore = require('express-sql-session')(session);
 
var options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'GROUPCHAT'
    },
    table: 'session',
    expires: 365 * 24 * 60 * 60 * 1000 // 1 year in ms
};

var sessionStore = new SessionStore(options)
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));


app.get('/', routes.index);//call for main index page
app.get('/login', user.login);//call for login page
app.get('/signup', user.signup);//call for signup page
app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post
app.get('/home', user.dashboard);
app.get('/logout', user.logout);
app.get('/update', user.update);//call for update page
app.post('/update', user.update);//call for update post

app.listen(2000, function(){
   console.log("The GC Server Has Started!");
});
