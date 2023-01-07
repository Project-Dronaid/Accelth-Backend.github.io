const mongoose = require('mongoose')


const appointmentSchema = mongoose.Schema({
    AppointmentID:{
        type: String,
    },
    DoctorID:{
        type: String,
    },
    PatientID:{
        type: String,
    },
    Date:{
        type: String,
    },
    Time:{
        type: String,
    },
    AppointmentType:{
        type: String,
    },
    Name:{
        type: String,
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
    },
})

var appointment = mongoose.model('appointment',appointmentSchema)
module.exports.appointment = appointment