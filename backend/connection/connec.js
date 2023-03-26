const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.set("strictQuery", false);
dotenv.config();
async function getConnection(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connected successfully");
    }).catch(e=>console.log(e));  
    
}
module.exports = getConnection;