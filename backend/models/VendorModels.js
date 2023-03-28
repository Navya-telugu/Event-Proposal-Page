const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema.Types;
const Schema = mongoose.Schema;
const VenderSchema = new Schema({
    eventName:{
        type: String, 
        required: true
    },
    placeOfEvent:{
        type: String, 
        required: true
    },
    proposalType:{
        type: String, 
        required: true
    },
    eventType:{
        type: String, 
        required: true
    },
    budget:{
        type: Number, 
        required: true
    },
    fromDate:{
        type: String, 
        required: true
    },
    toDate:{
        type: String, 
        required: true
    },
    description:{
        type: String, 
        required: true
    },
    // images: {
    //     type: [String],
    //     required:true
    // },
    foodPreferences:{
        type: String,
        required: true
    }, 
    events:{
        type: String,
        required: true
    },
    postedBy:{type:ObjectId, ref:"VENDORS"}
},{
    timestamps:true
})
module.exports = mongoose.model("VenderProposals",VenderSchema );