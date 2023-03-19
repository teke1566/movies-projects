const express =require("express")
const userRouter=express.Router()
const path=require("path")
const bcrypt = require("bcrypt");
const dbRouter=require("../DB")
const flash = require('express-flash');
const session = require('express-session');
userRouter.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
 }));
 
userRouter.use(flash());
userRouter.get('/users/logout', (req, res) => {
   res.clearCookie('email');
   res.clearCookie('password'); 
   res.redirect('/users/login');
 });

 ////////////////////////////////////////////////////////////////////////
 //////////////////////user register//////////////////////////////////////
 userRouter.post("/users/register", async (req, res) => {
   const { name, email, password, password2 } = req.body;
 
   const errors = [];
 
   console.log({ name, email, password, password2 });

   if (!name.trim()) {
     errors.push({ message: "Please enter a name" });
   }
   
   if (!email.trim()) {
     errors.push({ message: "Please enter an email address" });
   } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
     errors.push({ message: "Please enter a valid email address" });
   }
   
   if (!password.trim()) {
     errors.push({ message: "Please enter a password" });
   } else if (password.trim().length < 4) {
     errors.push({ message: "Password must be at least 4 characters long" });
   }
   
   if (!password2.trim()) {
     errors.push({ message: "Please confirm your password" });
   } else if (password.trim() !== password2.trim()) {
     errors.push({ message: "Passwords do not match" });
   }
   
 
   if (errors.length > 0) {
     return res.render("register", { errors, name, email, password, password2 });
   }
 
   try {
     // Check if email is already registered
     const user = await dbRouter.query("SELECT * FROM users WHERE email = $1", [email]);
     if (user.rows.length > 0) {
       errors.push({ message: "Email is already registered" });
       return res.render("register", { errors });
     }
 
     // Hash password
     const hashedPassword = await bcrypt.hash(password, 10);
 
     // Insert user into database
     const result = await dbRouter.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id", [name, email, hashedPassword]);
 
     // Set cookies and redirect to login page
     res.cookie("name", name);
     res.cookie("email", email);
     res.cookie("id", result.rows[0].id);
     req.flash("success_msg", "You are now registered. Please log in");
     res.redirect("/users/login");
   } catch (error) {
     console.log(error);
     errors.push({ message: "An error occurred. Please try again later" });
     res.render("register", { errors, name, email, password, password2 });
   }
 });
 


 ////////////////////////////////////////////////////////////////////////
 //////////////////////user login///////////////////////////////////////
 userRouter.post("/users/login", async (req, res) => {
   const { email, password } = req.body;
 
   // Check if both email and password fields are provided
   if (!email || !password) {
     req.flash("error_msg", "Please enter both email and password");
     return res.redirect("/users/login");
   }
 
   // Check if the user exists in the database
   dbRouter.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
     if (err) {
       console.error(err);
       req.flash("error_msg", "Something went wrong, please try again");
       return res.redirect("/users/login");
     }
 
     if (result.rows.length === 0) {
       req.flash("error_msg", "Invalid email or password");
       return res.redirect("/users/login");
     }
 
     // Check if the password entered by the user matches the hashed password stored in the database
     bcrypt.compare(password, result.rows[0].password, (err, match) => {
       if (err) {
         console.error(err);
         req.flash("error_msg", "Something went wrong, please try again");
         return res.redirect("/users/login");
       }
 
       if (!match) {
         req.flash("error_msg", "Invalid email or password");
         return res.redirect("/users/login");
       }
 
       // If the email and password are correct, create a session for the user
       req.session.user = result.rows[0];
       res.cookie("email", email);
       res.cookie("password",password)
       res.redirect("/users/dashboard");
     });
   });
 });
 userRouter.get("/users/dashboard",(req,res)=>{
   const userEmail = req.cookies.email;
   const userPassword = req.cookies.password;
     res.render('dashboard',{ users:"teke",userEmail, userPassword })
 })
userRouter.get('/',(req,res)=>{
   res.render('index')
})
userRouter.get("/users/register",(req,res)=>{
   res.render('register')
})
userRouter.get("/users/login",(req,res)=>{
   res.render('login')
})

 

 module.exports=userRouter