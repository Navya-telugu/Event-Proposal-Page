const express = require("express");
const app = express();
const vendorRoute=require('./routes/vendorRoutes');
const conn = require("./connection/connec");
const port = 8080
const userRegister=require("./routes/userRegister");
const userLogin=require("./routes/userLogin");
const jwt=require("jsonwebtoken");


conn();

app.listen(port , ()=>{
    console.log(`Server up at ${port}`);
})

