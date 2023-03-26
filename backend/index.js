const express = require("express");
const app = express();
const vendorRoute=require('./routes/vendorRoutes');
const conn = require("./connection/connec");
const port = 8080

conn();
app.use('/',vendorRoute)

app.listen(port , ()=>{
    console.log(`Server up at ${port}`);
})

