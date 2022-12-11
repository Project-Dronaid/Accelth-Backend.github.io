const mongoose = require('mongoose')

const patientschema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required : true,
    },
    name: {
        type : String,
        required : true,
    },
    phone: {
        type: Number,
        require : true,
    },
    password:{
        type: String,
        require : true,
        default: "Password",
        minlength: 8,
    },
    dateofbirth:{
        type: Date,
    },
    gender: {
        type: String,
        require : true,
    },
    bloodgroup:{
        type: String,
        require : true,
    },
    height:{
        type: String,
    },
    weight: {
        type: String,
    },
    allergies: {
        type: String,
    },
    blindcondition: {
      type: String,
    }
})

var patientdata = mongoose.model('patientdata',patientschema)
module.exports = patientdata