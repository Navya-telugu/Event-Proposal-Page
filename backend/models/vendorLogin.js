const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const Schema=mongoose.Schema;
const bcrypt = require('bcrypt');

const vendorSchema = new mongoose.Schema({
    vendorName:{type:String,required:true},
    email:{type:String,unique:true},
    contact:{type:Number,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,require:true}
})

vendorSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
  });

const Vendor = mongoose.model('vendor', vendorSchema);

module.exports = Vendor;