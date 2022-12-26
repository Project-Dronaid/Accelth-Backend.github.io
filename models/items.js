const mongoose = require('mongoose')
const MedicalItemSchema = mongoose.Schema({
    ItemID: {
        type: String,
        required: true,
    },
    MedName: {
      type:String,
      required: true,
    },
    Manufacture:{
        type: String,
        required: true,
    },
    Contains: {
        type: String,
    },
    Description: {
      type: String,
      required: true, 
    },
    Substitutes: [{
        SubMedName: String,
    }],
    SideEffects:{
        type: String,
    },
    Uses: {
        type:String,
    },
    Concerns: {
        type:String,
    },
    Warnings:{
        type:String,
    },
})

var medItems = mongoose.model('medItems',MedicalItemSchema)
module.exports.medItems = medItems