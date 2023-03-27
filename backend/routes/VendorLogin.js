const express=require("express");
const Vendor=require("../models/vendorLogin");
const bodyParser=require("body-parser");
const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router=express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.use(bodyParser.json());



router.post('/login',async(req,res)=>{
    try{
        const {contact,password}=req.body;
        const vendor=await Vendor.findOne({contact:contact});
        if(!vendor){
            res.status(201).json({
                status:"failed",
                message:"Contact does not exits kindly register",
            });
        }else{
            const isPasswordMatching=await bcrypt.compare(password,vendor.password);
            //const token=jwt.sign({exp:Math.floor(Date.now()/1000)+(6000000*60),vendor:vendor._id},'secret');
            if(isPasswordMatching){
                res.status(200).json({
                    status: "success",
                    message:
                      "Welcome!! authentication successful, you are logged in successfully",
                    jwt_token: token,
                  });
            }else {
                res.status(500).json({
                  status: "failed",
                  message:
                    "Oops!! authentication failed, password is incorrect",
                });
              }
        }
    }catch(e){
        res.status(404).json({
            status: "failed",
            message: "Kindly fill all the fields",
          });
    }

})

module.exports=router