const express = require("express");
const app = express();
//var ejs = require("ejs");
const path = require("path");
app.use(express.static('public'));




const cookieParser = require("cookie-parser");

//const homeRoute = require('./controller.js')
var testRoute = require("./controller/controller");
var homeRoute = require("./controller/homeController");

//Read the parameters from post request
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000,(req,res,next)=>{
    console.log("server is running")
})



app.use(testRoute);
app.use(homeRoute);

