const mongoose = require('mongoose')

const doctorPayement = mongoose.Schema({
    GSTIN: {
        type: String,
    },
    AccountNumber: {
        type: String,
        required: true,
    },
    AccountHolderName: {
        type: String,
        required: true,
    },
    BankName: {
        type: String,
        required: true,
    },
    IFSC: {
        type: String,
        required: true,
    },
    Tokens:{
        type:Number,
    }
})
const doctorSchema = mongoose.Schema({
    DoctorId: {
        type: String,
        required:true,
    },
    Email_id: {
        type: String,
        required: true, 
    },
    Password:{
        type:String,
        required:true,
    },
    Name:{
        type: String,
        required: true,
    },
    Contact_Number:{
        type: Number,
        required:true,
    },
    Qualification: {
        type: String,
        required: true,
    },
    Specs:{
        type: String,
        required: true,
    },
    Hospital:{
        type: String,
    },
    PhotoUrl:{
        type:String,
        default: 'https://img.freepik.com/premium-vector/front-portraits-young-doctors-character-avatars-illustration-graphic-design-animation_635702-196.jpg?w=1380'
    },
    Address:{
        type: String,
    },
    PayementDetails: {
        type: doctorPayement,
    },
    VotingRights: {
        type: String,
    },
    Subscription:{
        type:String,
    },
    TimeSlots:[{
        Time:{
            type:String,
        },
        Status: {
            type:String,
            default: "Free",
        }
    }],
})

var doctor = mongoose.model('doctor',doctorSchema)
module.exports.doctor = doctor