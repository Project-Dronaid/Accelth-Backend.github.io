const Doctor = require('../models/doctor')
const bcrypt = require('bcryptjs')
var moment = require('moment')
var DATE = moment().format('l')
var TIME = moment().format('LTS')
const month = DATE.split('/')[0]
const date = DATE.split('/')[1]
const year = DATE.split('/')[2]
const hour = TIME.split(':')[0]
const minute = TIME.split(':')[1]
const seconds = TIME.split(':')[2].split(' ')[0]

const RegisterDoctor = async(req,res)=>{
    const{Name,Contact_Number,Email_id,Password,Qualification,MedicalLicence,Specs,Hospital,PhotoUrl,Address,GSTIN,AccountNumber,AccountHolderName,BankName,IFSC} = req.body
    if(Password.length <= 8){
        return res.status(400).json({
            message: "Password must be atleast 8 characters long"
        })
    }
    bcrypt.hash(Password,10).then(async(hash)=>{
        await Doctor.doctor.create({
            DoctorId: "DOC"+year+month+date+hour+minute+seconds,
            Email_id: Email_id,
            Password:hash,
            Name:Name,
            Contact_Number:Contact_Number,
            MedicalLicence:MedicalLicence,
            Qualification:Qualification,
            Hospital:Hospital,
            Specs:Specs,
            PhotoUrl:PhotoUrl,
            Address:Address,
            PayementDetails:{
            GSTIN:GSTIN,
            AccountNumber:AccountNumber,
            AccountHolderName:AccountHolderName,
            BankName:BankName,
            IFSC:IFSC,
            Token:0,
           },
           VotingRights: "BASIC",
           Subscription: "BASIC",
           TimeSlots:[
            {
                Time:"8:30 AM",
                Status:"Free"
            },
            {
                Time:"8:45 AM",
                Status:"Free"
            },
            {
                Time:"9:00 AM",
                Status:"Free"
            },
            {
                Time:"9:15 AM",
                Status:"Free"
            },
            {
                Time:"9:30 AM",
                Status:"Free"
            },
            {
                Time:"9:45 AM",
                Status:"Free"
            },
            {
                Time:"10:00 AM",
                Status:"Free"
            },
            {
                Time:"10:15 AM",
                Status:"Free"
            },
            {
                Time:"10:30 AM",
                Status:"Free"
            },
            {
                Time:"10:45 AM",
                Status:"Free"
            },
            {
                Time:"11:00 AM",
                Status:"Free"
            },
            {
                Time:"11:15 AM",
                Status:"Free"
            },
            {
                Time:"11:30 AM",
                Status:"Free"
            },
            {
                Time:"11:45 AM",
                Status:"Free"
            },
            {
                Time:"12:00 PM",
                Status:"Free"
            },
            {
                Time:"12:15 PM",
                Status:"Free"
            },
            {
                Time:"12:30 PM",
                Status:"Free"
            },
            {
                Time:"12:45 PM",
                Status:"Free"
            },
            {
                Time:"1:00 PM",
                Status:"Free"
            },
            {
                Time:"1:15 PM",
                Status:"Free"
            },
            {
                Time:"1:30 PM",
                Status:"Free"
            },
            {
                Time:"1:45 PM",
                Status:"Free"
            },
            {
                Time:"2:00 PM",
                Status:"Free"
            },
            {
                Time:"2:15 PM",
                Status:"Free"
            },
            {
                Time:"2:30 PM",
                Status:"Free"
            },
            {
                Time:"2:45 PM",
                Status:"Free"
            },
            {
                Time:"3:00 PM",
                Status:"Free"
            },
            {
                Time:"3:15 PM",
                Status:"Free"
            },
            {
                Time:"3:30 PM",
                Status:"Free"
            },
            {
                Time:"3:45 PM",
                Status:"Free"
            },
            {
                Time:"4:00 PM",
                Status:"Free"
            },
            {
                Time:"4:15 PM",
                Status:"Free"
            },
            {
                Time:"4:30 PM",
                Status:"Free"
            },
            {
                Time:"4:45 PM",
                Status:"Free"
            },
            {
                Time:"5:00 PM",
                Status:"Free"
            },
            {
                Time:"5:15 PM",
                Status:"Free"
            },
            {
                Time:"5:30 PM",
                Status:"Free"
            },
            {
                Time:"5:45 PM",
                Status:"Free"
            },
            {
                Time:"6:00 PM",
                Status:"Free"
            },
            {
                Time:"6:15 PM",
                Status:"Free"
            },
            {
                Time:"6:30 PM",
                Status:"Free"
            },
            {
                Time:"6:45 PM",
                Status:"Free"
            },
            {
                Time:"7:00 PM",
                Status:"Free"
            },
            {
                Time:"7:15 PM",
                Status:"Free"
            },
            {
                Time:"7:30 PM",
                Status:"Free"
            },
            {
                Time:"7:45 PM",
                Status:"Free"
            },
            {
                Time:"8:00 PM",
                Status:"Free"
            },
            {
                Time:"8:15 PM",
                Status:"Free"
            },
            {
                Time:"8:30 PM",
                Status:"Free"
            },
            {
                Time:"8:45 PM",
                Status:"Free"
            },
            {
                Time:"9:00 PM",
                Status:"Free"
            },
            {
                Time:"9:15 PM",
                Status:"Free"
            },
            {
                Time:"9:30 PM",
                Status:"Free"
            },
        ],
        }).then(Doctor=>
            res.status(200).json({
                Message:"Doctor Registered successfully",
                Doctor: Doctor,
            })
            ).catch((error)=>res.status(400).json({
                Message : error.message
            })
        )
    });
}

const getasingledoctor = async (req, res) => {
    const{DoctorId}= req.params
    const doctor = await Doctor.doctor.findOne({
        "DoctorId":  DoctorId,
    })
    if(!doctor){
        res.status(400).json({
            Message:"Searching not successful",
            Error:"Patient not found"
        })
    }else{
        res.status(200).json(doctor)
    }
}


module.exports.RegisterDoctor = RegisterDoctor
module.exports.getasingledoctor = getasingledoctor
