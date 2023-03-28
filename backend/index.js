const express = require("express");
const app = express();
var cors = require('cors');
app.use(express.urlencoded({ extended: false }));
const vendorRoute=require('./routes/vendorRoutes');
const conn = require("./connection/connec");
const port = 8080
const userRegister=require("./routes/userRegister");
const userLogin=require("./routes/userLogin");
const venderRegister = require("./routes/VendorRegister")
const venderLogin = require("./routes/VendorLogin")
const jwt = require("jsonwebtoken");

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

conn();
app.use('/',venderRegister)
app.use('/',venderLogin)
app.use('/',vendorRoute)
app.use('/',userRegister)
app.use('/',userLogin)


app.use('/vendor',(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,'secret',function(err,decoded){
            if(err){
                return res.status(403).json({message:"token is not valid"});
            }
            req.Vendor=decoded.data////
            next();
        });
    }
    else{
        return res.status(403).json({message: 'You are not authenticated'})
    }
})
app.use('/user',(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,'secret',function(err,decoded){
            if(err){
                return res.status(403).json({message:"token is not valid"});
            }
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
