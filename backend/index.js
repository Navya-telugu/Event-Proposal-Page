const express = require("express");
const app = express();
const conn = require("./connection/connec");
const port = 8080
const userRegister=require("./routes/userRegister");
const userLogin=require("./routes/userLogin");
const jwt=require("jsonwebtoken");


conn();
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

app.use('/',userRegister)
app.use('/',userLogin)

app.listen(port , ()=>{
    console.log(`Server up at ${port}`);
})

