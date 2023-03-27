const express=require("express");
const Vendor=require("../models/vendorLogin");
const bodyParser=require("body-parser");
const router=express.Router();
const bcrypt = require("bcrypt");
router.use(bodyParser.urlencoded({extended:false}));

router.use(bodyParser.json());

router.post('/register',async(req,res)=>{
    try{
        const {vendorName,email,contact,password,confirmPassword}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const confirmHashPassword=await bcrypt.hash(confirmPassword,salt);

        if(vendorName && email && contact && password && confirmPassword){
            if(password===confirmPassword){
                const data=await Vendor.findOne({vendorName:vendorName,email:email,contact:contact,password:hashPassword,confirmPassword:confirmHashPassword});
                if(data!==null){
                    res.status(500).json({
                        status: "failed",
                        message: "This Contact already exists, kindly login",
                    })
                }else{
                        await Vendor.create({vendorName,email,contact,password,confirmPassword});
                        res.status(201).json({
                        status:"success",
                        message:"Registration done successfully",
                        })
                    }
            } else{
                res.status(400).json({
                    status:"failed",
                    message:"Password and confirm passwords are not matching"
                })
            }
           
        }
        else{
            return res.status(400).json({
                status:"Failed To Register",
                message:"All fields are mandatory"
            });
        }
    }catch(e){
        if(e.code==11000){
            return res.status(400).json({
                status:"fail",
                message:"Contact already exists"
            })
        }
        return res.status(500).send(e);
    }
})


module.exports=router;