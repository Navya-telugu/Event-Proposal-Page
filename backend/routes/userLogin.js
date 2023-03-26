const express=require("express");
const User=require("../models/userLogin");
const bodyParser=require("body-parser");
const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router=express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.use(bodyParser.json());


router.post('/userLogin',async(req,res)=>{
    try{
        const {contact,password}=req.body;
        const user=await User.findOne({contact:contact});
        if(!user){
            res.status(201).json({
                status:"failed",
                message:"Contact does not exits kindly register",
            });
        }else{
            const isPasswordMatching=await bcrypt.compare(password,user.password);
            const token=jwt.sign({exp:Math.floor(Date.now()/1000)+(6000000*60),user:user._id},'secret');
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



module.exports=router;