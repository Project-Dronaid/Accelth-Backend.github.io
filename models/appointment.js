const mongoose = require('mongoose')


const appointmentSchema = mongoose.Schema({
    AppointmentID:{
        type: String,
        unique:true,
        required:true,
    },
    DoctorID:{
        type: String,
        required:true,
    },
    PatientID:{
        type: String,
        required:true,
    },
    Date:{
        type: String,
        required:true,
    },
    Time:{
        type: String,
        required:true,
    },
    AppointmentType:{
        type: String,
        required:true,
    },
    Name:{
        type: String,
        required:true,
    },
    Age:{
        type: String,
    },
    Gender:{
        type: String,
    },
    Issue:{
        type: String,
    },
    Status:{
        type: String,
        required:true,
    },
})

var appointment = mongoose.model('appointment',appointmentSchema)
module.exports.appointment = appointment