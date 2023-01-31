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
    Price: {
        type: Number,
        required: true,
    },
    Manufacture:{
        type: String,
        required: true,
    },
    Contains: {
        type: String,
    },
    Rating: {
        type: Number,
        default: 0,
    },
    Description: {
      type: String,
      required: true, 
    },
    Substitutes: [{
        SubMedName: String,
    }],
    Description: {
        type: String,
    },
    Benefits: {
        type: String
    },
    HowToUse: {
        type: String,
    },
    StorageInfo: {
        type: String,
    },
    SafetyInfo: {
        type: String,
    },
    ProductDetails: {
        Expires: {
            type: String
        },
        Brand: {
            type: String,
        },
        Country: {
            type: String
        },
    },
    Disclaimer: {
        type: String
    },
})

var medItems = mongoose.model('medItems',MedicalItemSchema)
module.exports.medItems = medItems