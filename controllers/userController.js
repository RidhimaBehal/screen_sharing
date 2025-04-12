var jwt = require('jsonwebtoken');
var secret_key = 'abcd#$%@12345678';
var db = require('../db.config');

var {Op}=require("sequelize");


var userController = {};

//for rendering the page
// userController.renderUserPage=(req,res)=>{
//     res.render('user/manage_user');
// }
//
// //for adding the data to database
// userController.AddUser=async (req,res)=>
// {
//     try
//     {
//         var r=await user.findOne({email:req.body.email}); //where bhi lga skte hai saathme
//         //console.log(r.dataValues.email); //it will give email of already present data
//         if(r.dataValues.email==req.body.email)
//         {
//             res.json({error:true,message:"Email Already Present"});
//         }
//         var result=await user.create(req.body);
//         res.json({error:false,message:"New User Added",data:result});
//     }
//     catch(e)
//     {
//         res.json({error:true,message:e.message});
//     }
// };
//
// //view All User data
// userController.readAllUser=async (req,res)=>
// {
//     try
//     {
//         var records=await user.findAll();
//         res.json({message:"Data Fetched",records:records});
//     }
//     catch (e)
//     {
//         res.json({message:e.message});
//     }
// }
//
// //delete admin
// userController.deleteUser=async (req,res)=>
// {
//     try
//     {
//         var {id}=req.params; //dynamic parameter hai usko get krne ke liye req.params
//         var record=await user.destroy({where:{id:id}});
//         res.json({error:false,message:"Data Deleted SuccessFully"});
//         // res.redirect('/admin/manage_admin');
//     }
//     catch (e)
//     {
//         res.json({error:true,message:e.message});
//     }
// }
//
// //update user data
// userController.updateUser=async (req,res)=>
// {
//     try
//     {
//         var {id}=req.params;
//         //var {name,email,age}=req.body;
//         var result=await user.update(req.body,{where:{id:id}});
//         //result ka array ke 0 index pe yaato 0 value ayegi yaa 1
//         //agar update hogya to 1 otherwise 0
//         if(result[0]==1)
//         {
//             res.json({error: false, message: "data updated SuccessFully"});
//         }
//         else
//         {
//             res.json({error:true,message:"Invalid Id"});
//         }
//     }
//     catch (e)
//     {
//         res.json({error:true,message:e.message});
//     }
// }
// //login user
// userController.loginUser=async (req,res)=>
// {
//     try
//     {
//         var {email,password}=req.body;
//         var result=await user.findAll({
//             where:
//                 {
//                     email:email,
//                     password:password
//                 }
//         })
//         //console.log(result.length);
//         if(result.length==1)
//         {
//             // console.log(result[0].email);
//             var payload={
//                     id:result[0].id,
//                     email:result[0].email,
//                     name:result[0].first_name
//                 }
//             var token=jwt.sign(payload,secret_key,{expiresIn:'1D'});
//             res.cookie('UserToken',token);
//             res.json({error:false,message:"Login Successfull"});
//         }
//         else
//         {
//             res.json({error:true,message:"Invalid Cridentails"});
//         }
//         // res.json({error:true,message:""});
//     }
//     catch (e)
//     {
//         res.json({error:true,message:e.message});
//     }
// }
// //render login page
// userController.renderLoginPage=(req,res)=>
// {
//     res.render('user/login')
// }
// //render dashboard
// userController.renderDashboard=async (req,res)=>
// {
//     //console.log(req.user);
//     try
//     {
//         //jis user ne login kia uske hi contact show honge so req.user mese id lelo fr find kro
//         var {id}=req.user;
//         var records=await user_contact.findAll({
//             where:{userId:id}
//         });
//         res.render('user/userDashboard',{name:req.user.name,records:records});
//     }
//     catch (e)
//     {
//         res.render('user/userDashboard',{name:req.user.name,records:[]});
//     }
//
// }
// //add contact
// userController.addContact=async (req,res)=>
// {
//     try
//     {
//         req.body.userId=req.user.id; //id email name req.user me dali thi verify krte time
//         //middleware http me
//         await user_contact.create(req.body);
//         res.json({error:false,message:"Data Added Sucessfully"});
//     }
//     catch (e)
//     {
//        res.json({error:true,message:e.message});
//     }
// }
// //delete user contact
// userController.deleteUserContact=async (req,res)=>
// {
//     try
//     {
//             var {id}=req.params;
//             await user_contact.destroy({
//                 where:{
//                     id:id
//                 }
//             });
//         res.redirect('/user/dashboard');
//     }
//     catch (e)
//     {
//         res.redirect('/user/dashboard');
//     }
// }
//
// //project
// userController.updateUserContact=async (req,res)=>
// {
//     try
//     {
//         var {id}=req.params;
//         //var {name,email,age}=req.body;
//         var result=await user_contact.update(req.body,{where:{id:id}});
//         //result ka array ke 0 index pe yaato 0 value ayegi yaa 1
//         //agar update hogya to 1 otherwise 0
//         if(result[0]==1)
//         {
//             res.json({error: false, message: "data updated SuccessFully"});
//         }
//         else
//         {
//             res.json({error:true,message:"Invalid Id"});
//         }
//     }
//     catch (e)
//     {
//         res.json({error:true,message:e.message});
//     }
// }
// userController.viewAllProduct=async (req,res)=>
// {
//     try
//     {
//         var results=await productModel.findAll();
//         res.json({error:false,records:results});
//     }
//     catch(e)
//     {
//         res.json({error:true,records:[]})
//     }
// }
// userController.renderProductPage=async (req,res)=>
// {
//     res.render('user/viewproducts');
// }
// userController.AddToCart=async (req,res)=>
// {
//     var userId=req.user.id;
//     var productId=req.body.productId;
//     try
//     {
//         var result=await cartModel.findAll({where:{userId:userId,
//             productId:productId}});
//         req.body.userId=userId;
//         if(result.length==0)
//         {
//
//             req.body.quantity=1;
//             await cartModel.create(req.body);
//             res.json({error:false,message:"Item added Successfully"})
//         }
//         else
//         {
//             var quantity=result[0].quantity+1;
//             req.body.quantity=quantity;
//             var id=result[0].id;
//             await cartModel.update(req.body,{where:{id:id}});
//             res.json({error:false,message:"Item added Successfully"})
//         }
//     }
//     catch (e)
//     {
//         res.json({error:true,message:e.message});
//     }
// }

module.exports = userController;