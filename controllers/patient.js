const Patient = require('../models/patient')
const bcrypt = require('bcryptjs')


const registerPatient = async (req, res)=> {
    const{Name,Contact_Number,Email_id,Password} = req.body
    if(Password.length < 8){
        return res.status(400).json({
            message: "Password must be atleast 8 characters long"
        })
    }
    bcrypt.hash(Password,10).then(async(hash)=>{
        await Patient.patient.create({
            Profile: {
                Personal: {
                    Name: Name,
                    Contact_Number: Contact_Number,
                    Email_id : Email_id,
                    Password: hash,
                }
            }
        }).then(Patient=>
            res.status(200).json({
                Message:"Patient Registered successfully",
                Patient: Patient,
            })
            ).catch((error)=>res.status(400).json({
                Message : error.message
            })
        )
    });
}

const loginPatient = async (req,res) => {
    const{Email_id,Password}= req.body
    if(!Email_id||!Password){
        return res.status(400).json({Message:"Email_id or Password not present"});
    }
    try{
        const patient = await Patient.patient.findOne({
            "Profile.Personal.Email_id":  Email_id
        });
        if(!patient){
            res.status(400).json({
                Message:"Login not successful",
                Error:"Patient not found"
            })
        }else{
            bcrypt.compare(Password,patient.Profile.Personal.Password).then(function (result) {
                result?
                res.status(200).json({
                    Patient: patient,
                    Message: "Login Successful"
                }):
                res.status(400).json({
                    Message:"Login not successful",
                });
            });
        }
    }catch(error){
        res.status(400).json({
            Message:"An error occured",
            Error:error.message
        })
    }
}

const onBoard1Patientupdate = async (req, res) => {
    const{Email_id,DateofBirth,Gender,Bloodgroup,Height,Weight}=req.body
    await Patient.personalprofile.updateOne(
            { 
                Email_id: Email_id,
            },
        { $set: {
               Gender : Gender,
               Bloodgroup : Bloodgroup,
               Height : Height,
               Weight : Weight,
               DateofBirth: DateofBirth,
            } 
        }
          ).then(patient=>
            res.status(200).json({
                message:"Patient's data updated",
                patient: patient,
            })
            ).catch((error)=>res.status(400).json({
                message : error.message
            })
        )
}

const onBoard2Patientadd = async (req, res) => {
    const{Allergies,Blindcondition} = req.body
    await Patient.medicalprofile.create(
        { 
            Allergies: Allergies,
            Blindcondition : Blindcondition,
        },
      ).then(patient=>
        res.status(200).json({
            message:"Patient's data updated",
            patient: patient,
        })
        ).catch((error)=>res.status(400).json({
            message : error.message
        })
    )
}

const addmedications = async (req, res) => {
    const {Name,Start_Date,End_Date,Dose1,Dose2,Dose3} = req.body
    const {id} = req.params;
     await Patient.patient.findByIdAndUpdate(id,
        {
            $push : {
                Medications: {
                    Name: Name,
                    Start_Date : Start_Date,
                    End_Date: End_Date,
                    Meal_Plan : {
                             Dose1: Dose1,
                             Dose2: Dose2,
                             Dose3: Dose3,
                         },
                }
            }
     }).then(patient=>
        res.status(200).json({
            message: "Medications added",
            medication: patient,
        })).catch((error)=>res.status(400).json({
            message: error.message,
        })) 

}

const getAllPatients = async (req, res) => {
    try{
        const patients = Patient.patient.find()
        res.status(200).json(patients)
    }catch(error){
        res.status(400).json(error)
    }
}


module.exports.registerPatient = registerPatient
module.exports.loginPatient = loginPatient
module.exports.onBoard1Patientupdate = onBoard1Patientupdate
module.exports.onBoard2Patientadd = onBoard2Patientadd
module.exports.addmedications = addmedications
module.exports.getAllPatients = getAllPatients
// module.exports.onBoardPatient1 = onBoardPatient1
// module.exports.onBoardPatient2 = onBoardPatient2

