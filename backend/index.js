const express = require("express");
const app = express();
const conn = require("./connection/connec");
const port = 8080

conn();

app.listen(port , ()=>{
    console.log(`Server up at ${port}`);
})

