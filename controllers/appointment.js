const Appointment = require('../models/appointment')
var moment = require('moment')

const addAppointment = async(req,res)=>{
    const{DoctorID,PatientID,Date,Time,AppointmentType,Name,Age,Gender,Issue,Status}=req.body
}