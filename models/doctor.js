const mongoose = require('mongoose')


const doctorSchema = mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    Degree: {
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
    }
})

var doctor = mongoose.model('doctor',doctorSchema)
module.exports.doctor = doctor