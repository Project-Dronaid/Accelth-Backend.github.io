const Appointment = require('../models/appointment')
var moment = require('moment')

const addAppointment = async(req,res)=>{
    var DATE = moment().format('l')
    var TIME = moment().format('LTS')
    var month = DATE.split('/')[0]
    var date = DATE.split('/')[1]
    var hour = TIME.split(':')[0]
    var minute = TIME.split(':')[1]
    var seconds = TIME.split(':')[2].split(' ')[0]
    const{DoctorID,PatientID,Date,Time,AppointmentType,Name,Age,Gender,Issue}=req.body
    await Appointment.appointment.create({
        AppointmentID:"APP"+month+date+hour+minute+seconds,
        DoctorID:DoctorID,
        PatientID:PatientID,
        Date:Date,
        Time:Time,
        AppointmentType:AppointmentType,
        Name:Name,
        Age:Age,
        Gender:Gender,
        Issue:Issue,
        Status:"BOOKED"
    }).then(Appointment=>
        res.status(200).json({
            Message:"Appointment Booked Successfully",
            Appointment: Appointment,
        })
        ).catch((error)=>res.status(400).json({
            Message : error.message
        })
    )
}

const getasingleappointment = async (req, res) => {
    const{AppointmentID}= req.params
    const appointment = await Appointment.appointment.findOne({
        "AppointmentID":  AppointmentID,
    })
    if(!appointment){
        res.status(400).json({
            Message:"Searching not successful",
            Error:"Patient not found"
        })
    }else{
        res.status(200).json(appointment)
    }
}

const getAllAppointmentofaPatient = async(req,res)=>{
    const{PatientID} = req.params
    try{
        const appointments = await Appointment.appointment.find({
            PatientID:PatientID,
        })
        res.status(200).json(appointments)
    }
    catch(error){
        res.status(400).json(error)
    }
}

const getAllAppointmentofaDoctor = async(req,res)=>{
    const{DoctorID} = req.params
    try{
        const appointments = await Appointment.appointment.find({
            DoctorID:DoctorID,
        })
        res.status(200).json(appointments)
    }
    catch(error){
        res.status(400).json(error)
    }
}

const distinctDoctorsofaPatient = async(req,res)=>{
    const{PatientID}=req.params
    try{
        const doctors = await Appointment.appointment.distinct("DoctorID",{
            PatientID:PatientID
        })
        res.status(200).json(doctors)
    }catch(error){
        res.status(400).json(error)
    }
    
}



module.exports.addAppointment = addAppointment
module.exports.getasingleappointment = getasingleappointment
module.exports.getAllAppointmentofaPatient = getAllAppointmentofaPatient
module.exports.getAllAppointmentofaDoctor = getAllAppointmentofaDoctor
module.exports.distinctDoctorsofaPatient = distinctDoctorsofaPatient