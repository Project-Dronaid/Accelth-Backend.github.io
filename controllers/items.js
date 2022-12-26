const MedItem = require('../models/items')
const addMedicalItem = async(req,res) => {
    const{ItemID,MedName,Manufacture,Contains,Description,SubMedName,SideEffects,Uses,Concerns,Warnings} = req.body
    await MedItem.medItems.create({
        ItemID:ItemID,
        MedName:MedName,
        Manufacture:Manufacture,
        Contains:Contains,
        Description:Description,
        Substitutes:[{
            SubMedName:SubMedName,
        }],
        SideEffects:SideEffects,
        Uses:Uses,
        Concerns:Concerns,
        Warnings:Warnings,
    }).then(MedItem=>
        res.status(200).json({
            Message:"Item added successfully",
            MedItem: MedItem,
        })
        ).catch((error)=>res.status(400).json({
            Message : error.message
        })
    )
}

const addSubstitutes = async(req,res)=> {
    const{SubMedName}=req.body
    const{ItemID}=req.params
    await MedItem.medItems.updateOne({
        ItemID:ItemID,
    },{
        $push : {
            Substitutes: {
                SubMedName:SubMedName,
            }
        }
    },{
        upsert:true,
    }).then(MedItem=>
        res.status(200).json({
            message: "Medications added",
            MedItem: MedItem,
        })).catch((error)=>res.status(400).json({
            message: error.message,
        })) 
}

const getMedicines = async(req,res)=>{
    try{
        const medicines = await MedItem.medItems.find();
        res.status(200).json(medicines)
    }catch(error){
        res.status(400).json(error.message)
    }
}

const deleteMedicines = async(req,res)=>{
    const{ItemID}=req.params
    await MedItem.medItems.deleteOne({ItemID:ItemID}).then(meditem=>res.status(200).json(meditem)).catch((error)=>res.status(400).json(error.message))
}

module.exports.addMedicalItem = addMedicalItem
module.exports.addSubstitutes = addSubstitutes
module.exports.getMedicines = getMedicines
module.exports.deleteMedicines = deleteMedicines