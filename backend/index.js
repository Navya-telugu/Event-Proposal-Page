const express = require("express");
const app = express();
const vendorRoute=require('./routes/vendorRoutes');
const conn = require("./connection/connec");
const port = 8080
const userRegister=require("./routes/userRegister");
const userLogin=require("./routes/userLogin");
const jwt=require("jsonwebtoken");


const registerRoute=require('./routes/VendorRegister');
const loginRoute=require('./routes/VendorLogin');







conn();
app.use('/',registerRoute)
app.use('/',loginRoute)


app.use('/vendor',(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,'secret',function(err,decoded){
            if(err){
                return res.status(403).json({message:"token is not valid"});
            }
            // req.Vendor=decoded.data
            next();
        });
    }
    else{
        return res.status(403).json({message: 'You are not authenticated'})
    }
})




app.listen(port , ()=>{
    console.log(`Server up at ${port}`);
})
