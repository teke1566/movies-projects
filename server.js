const express = require("express");
const app = express();
//var ejs = require("ejs");
const path = require("path");





const cookieParser = require("cookie-parser");

//const homeRoute = require('./controller.js')
var homeRoute = require("./controller");

//Read the parameters from post request
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000,(req,res,next)=>{
    console.log("server is running")
})



app.use(homeRoute);

