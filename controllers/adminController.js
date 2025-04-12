var connection=require("../connection");
//getting the model for inserting the data
var db=require("../db.config");
const e = require("express");

var adminController={};
//to use in operator
var {Op}=require("sequelize");
var jwt=require('jsonwebtoken');
//for email sending
var nodemailer = require('nodemailer');

var secret_key='abcd#$%@12345678';
//making function to call in admin.js route directly
//adding data too the table

module.exports = adminController;
