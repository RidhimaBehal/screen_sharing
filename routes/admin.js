var express = require('express');
var adminRouter = express.Router();

var jwt=require('jsonwebtoken');
var secret_key='abcd#$%@12345678';

//json get krne ke liye
adminRouter.use(express.urlencoded({extended:true}));
adminRouter.use(express.json());

var cookieParser=require('cookie-parser');
adminRouter.use(cookieParser());

var connection=require("../connection");
var adminController = require("../controllers/adminController");
const indexcontroller = require("../controllers/indexController");

function AuthorizeAdmin(req,res,next)
{

    //console.log(req.cookies);
    var token=req.cookies.AdminToken;
    if(!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        res.redirect('/login');
    }
    else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.admin=jwt.verify(token,secret_key); //data nikalo payload wala
            next();
        }
        catch(e)
        {
            res.redirect('/login');
        }
    }
}
//json value k liye middleware
function AuthorizeAdmin_HTTP(req,res,next)
{
        //console.log(req.cookies);
    var token=req.cookies.AdminToken;
    if(!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        res.json({error:true,message:'Unautherized Access'});
    }
    else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.admin=jwt.verify(token,secret_key); //data nikalo payload wala
            next();
        }
        catch(e)
        {
            res.json({error:true,message:'Unautherized Access'});
        }
    }
}

module.exports = adminRouter;