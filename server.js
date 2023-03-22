const express = require("express");
const app = express();
//var ejs = require("ejs");
const path = require("path");
app.use(express.static("public"));

const cookieParser = require("cookie-parser");

//const homeRoute = require('./controller.js')
var homeRoute = require("./controller/homeController");
var adminRoute = require("./controller/adminController");
var movieDetailRoute = require("./controller/moviedetailController");
const userRoute=require("./controller/userController")
var usersRoute=require("./controller/usersController")
var ticketRoute=require("./controller/movieticketController")


//Read the parameters from post request
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(4000, (req, res, next) => {
	console.log("server is running on port 3000");
});

app.use(adminRoute);
app.use(homeRoute);
app.use(movieDetailRoute);
app.use(userRoute);
app.use(usersRoute);
app.use(ticketRoute);


//from teketsel login part

//app.set("view engine","html")
//app.engine("html",ejs.renderFile)
//app.set('views','./views')
//app.use(express.static('public'))
//app.use('/css',express.static(__dirname+'public/css'))
//app.use('/js',express.static(__dirname+'public/js'))
//app.use('/img',express.static(__dirname+'public/img'))
// app.use("/users/register",userRoute)
// app.use("/users/login",userRoute)
// app.use("/users/dashboard",userRoute)
// app.use("/users/logout",userRoute)