var express = require('express');
var router = express.Router();
router.use(express.json());
//post method wala object get krne ke liye
router.use(express.urlencoded({extended: true}));


var indexcontroller = require('../controllers/indexController');
const userController = require("../controllers/userController");


module.exports = router;