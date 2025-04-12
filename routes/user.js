var express = require('express');
var userrouter = express.Router();
var cookieParser = require('cookie-parser');
userrouter.use(cookieParser());
//json get krne ke liye
userrouter.use(express.urlencoded({extended: true}));
userrouter.use(express.json());
var jwt = require('jsonwebtoken');
var secret_key = 'abcd#$%@12345678';
var userController = require('../controllers/userController');
const indexcontroller = require("../controllers/indexController");
const adminController = require("../controllers/adminController");

function AuthorizeUser(req, res, next) {
    // console.log(req.cookies.UserToken);
    var token = req.cookies.UserToken;
    if (!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        //console.log("NO TOKEN");
        res.redirect('/user/login');
    } else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.user = jwt.verify(token, secret_key); //data nikalo payload wala
            next();
        } catch (e) {
            res.redirect('/user/login');
        }
    }
}

//json value k liye middleware
function AuthorizeUser_HTTP(req, res, next) {
    // console.log(req.cookies.UserToken);
    var token = req.cookies.UserToken;

    if (!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        res.json({error: true, message: 'Login Required'});
    } else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.user = jwt.verify(token, secret_key); //data nikalo payload wala
            next();
        } catch (e) {
            res.json({error: true, message: 'Unautherized Access'});
        }
    }
}

module.exports = userrouter;