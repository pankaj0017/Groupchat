var passwordHash = require('password-hash');


exports.update = function(req, res){

   if(req.session.userId == null){
      res.redirect("/login");
      return;
   }

   var cuser =  req.session.user;

   message = 'updating data';
   console.log(message);

   if(req.method == "POST"){
      var post  = req.body;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      var email = post.email_id;
      var name = cuser.user_name;

      console.log(name);

      var sql = "UPDATE users SET first_name = '" + fname + "',last_name = '" + lname + "',email_id = '" + email + "',mob_no = '" + mob + "' WHERE user_name = '" + name + "';" ;

      var query = db.query(sql, function(err, result) {

         console.log(result.affectedRows + " record(s) updated");
         message = "Succesfully! data changed.";
         res.redirect("/home");
      });

   } else {
      res.render('update',{currentUser:req.session.user});
   }
};

exports.signup = function(req, res){

   if(req.session.userId != null){
      res.redirect("/home");
      return;
   }

   message = 'Jaiswal';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      var email = post.email_id;
      var hashedPassword = passwordHash.generate(pass);

      console.log(passwordHash.isHashed(pass)); // false
      console.log(passwordHash.isHashed(hashedPassword)); // true


      var sql = "INSERT INTO users(first_name,last_name,email_id,mob_no,user_name, password) VALUES ('" + fname + "','" + lname + "','" + email + "','" + mob + "','" + name + "','" + hashedPassword + "')";

      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.redirect("/login");
      });

   } else {
      res.render('signup');
   }
};
exports.login = function(req, res){

   if(req.session.userId != null){
      res.redirect("/home");
      return;
   }

   var message = 'Pankaj';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      //var hashedPassword = passwordHash.generate(pass);
      //passwordHash.verify('password123', hashedPassword);
     
      var sql="SELECT id, first_name, last_name,mob_no,email_id, user_name, password FROM users WHERE user_name='"+name+"' ";
      // and password = '"+hashedPassword+"'

      db.query(sql, function(err, results){      
         if(results.length){
            console.log(results[0]);
            if(passwordHash.verify(pass, results[0].password))
            {
               req.session.userId = results[0].id;
               req.session.user = results[0];
               console.log(req.session.user);
               res.redirect('/home');
            } else {
               message = 'Wrong password';
               res.render('login.ejs',{message: message});
            }
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('login',{message: message});
   }         
};

exports.dashboard = function(req, res, next){
	
	var cuser =  req.session.user,
	userId = req.session.userId;
	
	if(userId == null){
		res.redirect("/");
		return;
	}
	 
	 var sql="SELECT * FROM users WHERE id='"+userId+"'";
	 
	   db.query(sql, function(err, results){
		   
		   console.log(results);
		   
		   res.render('index.ejs', {currentUser:cuser});  
		  
		});	 
};
exports.logout = function(req, res){
   userId = req.session.userId;
   
   if(userId == null){
      res.redirect("/login");
   } else {
      req.session.destroy(function(err) {
      //cal back method
         res.redirect("/");
      });
   }  
};