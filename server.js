const express = require("express");


const app=express()
const flash = require('express-flash');
const session = require('express-session');
const router=require("./routes/users")
const cookieParser=require("cookie-parser")
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  
  app.use(flash());
 

const ejs=require("ejs")
//var ejs = require("ejs");
const path = require("path");
app.use(express.static('public'));







//const homeRoute = require('./controller.js')
//var testRoute = require("./controller/controller");
var homeRoute = require("./controller/homeController");
var movieDetailRoute = require("./controller/moviedetailController");
var adminRoute = require("./controller/adminController");

//Read the parameters from post request
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine","html")
app.engine("html",ejs.renderFile)
app.set('views','./views')
app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/img',express.static(__dirname+'public/img'))
app.use("/",router)
app.use("/users/register",router)
app.use("/users/login",router)
app.use("/users/dashboard",router)
app.use("/users/logout",router)


//app.use(testRoute);
app.use(homeRoute);
app.use(adminRoute);


app.listen(2000,(req,res,next)=>{
    console.log("server is running")
})



app.use(testRoute);
app.use(homeRoute);
app.use(movieDetailRoute);

