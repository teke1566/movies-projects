 const express =require("express")
 const userRouter=express.Router()
 const path=require("path")
 const bcrypt = require("bcrypt");
 const dbRouter=require("../db");
 const flash = require('express-flash');



 userRouter.use(flash());
 userRouter.get('/users/logout', (req, res) => {
   // res.clearCookie('loggedIn');
    res.clearCookie('email');
    res.clearCookie('password'); 
    res.redirect('/');
  });

  ////////////////////////////////////////////////////////////////////////
  //////////////////////user register///////////////////////////////////////
  userRouter.post("/users/register", async (req, res) => {
    const { firstname,lastname, email, password, confirmpassword } = req.body;
  
    const errors = [];
  
    console.log({ firstname,lastname, email, password, confirmpassword });

    if (!firstname.trim()) {
      errors.push({ message: "Please enter a First Name" });
    }
    if (!lastname.trim()) {
      errors.push({ message: "Please enter a  Last Name" });
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
    
    if (!confirmpassword.trim()) {
      errors.push({ message: "Please confirm your password" });
    } else if (password.trim() !== confirmpassword.trim()) {
      errors.push({ message: "Passwords do not match" });
    }
    
  
    if (errors.length > 0) {
      return res.render("register", { errors, firstname,lastname, email, password, confirmpassword });
    }
  
    try {
      // Check if email is already registered
      const user = await dbRouter.query("SELECT * FROM tbl_users WHERE email = $1", [email]);
      if (user.rows.length > 0) {
        errors.push({ message: "Email is already registered" });
        return res.render("register", { errors });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into database
      const result = await dbRouter.query("INSERT INTO tbl_users (firstname,lastname, email, password) VALUES ($1, $2, $3,$4) RETURNING role_id", [firstname,lastname, email, hashedPassword]);
  
      // Set cookies and redirect to login page
      res.cookie("firstname", firstname);
      res.cookie("lastname", lastname);
      res.cookie("email", email);
      res.cookie("role_id", result.rows[0].role_id);
      req.flash("success_msg", "You are now registered. Please log in");
      res.redirect("/users/login");
    } catch (error) {
      console.log(error);
      errors.push({ message: "An error occurred. Please try again later" });
      res.render("register", { errors, firstname,lastname, email, password, confirmpassword });
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
    dbRouter.query("SELECT * FROM tbl_users WHERE email = $1", [email], (err, result) => {
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
  
        // Query the role_id of the user from the tbl_users table
        dbRouter.query("SELECT role_id FROM tbl_users WHERE email = $1", [email], (err, result) => {
          if (err) {
            console.error(err);
            req.flash("error_msg", "Something went wrong, please try again");
            return res.redirect("/users/login");
          }
  
          const roleId = result.rows[0].role_id;
          console.log("roleId: ", roleId);
  
          // If the email and password are correct, create a session for the user
          req.session.user = result.rows[0];
          res.cookie("email", email);
          res.cookie("password",password)
  
          // Check if the user is an admin or a regular user, and redirect accordingly
          let redirectUrl = "/users/dashboard";
          if (roleId === 1) {
            // user is an admin, redirect to admin dashboard
            redirectUrl = "/admin/dashboard";
          }
          console.log("redirectUrl: ", redirectUrl);
          res.redirect(redirectUrl);
        });
      });
    });
  });
  
  

  userRouter.get("/users/dashboard",(req,res)=>{
  
  const userEmail = req.cookies.email;
  const userPassword = req.cookies.password;
  res.render('dashboard', { tbl_users : 'postgres', userEmail, userPassword });
  })

userRouter.get("/users/register",(req,res)=>{
  // if (!req.session.user) {
  //   req.flash("error_msg", "Please log in to view this page");
  //   return res.redirect("/users/login");
  // }
    res.render('login')
})
userRouter.get("/users/login",(req,res)=>{
  // if (!req.session.user) {
  //   req.flash("error_msg", "Please log in to view this page");
  //   return res.redirect("/users/login");
  // }
    res.render('login')
})



  module.exports=userRouter