const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcrypt');
const {ObjectId}=mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true},
    email:{
        type:String,
        unique:true},
    contact:{
        type:Number,
        unique:true},
    password:{
        type:String,
        required:true},
    confirmPassword:{
        type:String,
        require:true}
})

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
  });

const User = mongoose.model('user', userSchema);

module.exports = User;