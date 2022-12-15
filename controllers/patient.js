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
            },
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
    await Patient.patient.updateOne(
            { 
                "Profile.Personal.Email_id":  Email_id
            },
        { 
            "Profile.Personal.Gender":  Gender,
            "Profile.Personal.Bloodgroup":Bloodgroup,
            "Profile.Personal.Height":  Height,
            "Profile.Personal.Weight":  Weight,
            "Profile.Personal.DateofBirth":  DateofBirth,
        },
        {upsert:true}
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
    const{Email_id,Allergies,Blindcondition} = req.body
    await Patient.patient.updateOne(
        {
            "Profile.Personal.Email_id":  Email_id
        },
        { 
            "Profile.Medical.Allergies": Allergies,
            "Profile.Medical.Blindcondition" : Blindcondition,
        },
        {
            upsert:true
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
    const {Email_id} = req.params;
     await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
     },
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
     },{upsert:true}).then(patient=>
        res.status(200).json({
            message: "Medications added",
            medication: patient,
        })).catch((error)=>res.status(400).json({
            message: error.message,
        })) 

}

const getAllPatients = async (req, res) => {
    try{
        const patients = await Patient.patient.find();
        res.status(200).json(patients)
    }catch(error){
        res.status(400).json(error.message)
    }
}


const addHeartRateInfo = async (req, res) => {
    const{Latest_result,Avg_result,Status}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
       "Vitals.HeartRate.Latest_result":  Latest_result,
       "Vitals.HeartRate.Avg_result":  Avg_result,
       "Vitals.HeartRate.Status":  Status,
    },
    {
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Hear Rate Report Updated",
            Vitals: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}

const addBloodPressureInfo = async (req, res) => {
    const{Latest_result,Avg_result,Status}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
       "Vitals.BloodPressure.Latest_result":  Latest_result,
       "Vitals.BloodPressure.Avg_result":  Avg_result,
       "Vitals.BloodPressure.Status":  Status,
    },
    {
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Blood Pressure Report Updated",
            Vitals: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}

const adddOxygenInfo = async (req, res) => {
    const{Latest_result,Avg_result,Status}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
       "Vitals.Oxygen.Latest_result":  Latest_result,
       "Vitals.Oxygen.Avg_result":  Avg_result,
       "Vitals.Oxygen.Status":  Status,
    },
    {
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Oxygen Report Updated",
            Vitals: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}

const addrespiratoryInfo = async (req, res) => {
    const{Latest_result,Avg_result,Status}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
       "Vitals.Respiratory.Latest_result":  Latest_result,
       "Vitals.Respiratory.Avg_result":  Avg_result,
       "Vitals.Respiratory.Status":  Status,
    },
    {
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Respiratory Report Updated",
            Vitals: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}

const addTemperatureInfo = async (req, res) => {
    const{Latest_result,Avg_result,Status}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
       "Vitals.Temperature.Latest_result":  Latest_result,
       "Vitals.Temperature.Avg_result":  Avg_result,
       "Vitals.Temperature.Status":  Status,
    },
    {
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Temperature Report Updated",
            Vitals: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}

const addHaemoglobinInfo = async (req, res) => {
    const{Latest_result,Avg_result,Status}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
       "Vitals.Haemoglobin.Latest_result":  Latest_result,
       "Vitals.Haemoglobin.Avg_result":  Avg_result,
       "Vitals.Haemoglobin.Status":  Status,
    },
    {
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Haemoglobin Report Updated",
            Vitals: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}
const addGlucoseInfo = async (req, res) => {
    const{Latest_result,Avg_result,Status}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
       "Vitals.Glucose.Latest_result":  Latest_result,
       "Vitals.Glucose.Avg_result":  Avg_result,
       "Vitals.Glucose.Status":  Status,
    },
    {
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Glucose Report Updated",
            Vitals: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}

const addThyroidInfo = async (req, res) => {
    const{Latest_result,Avg_result,Status}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
       "Vitals.Thyroid.Latest_result":  Latest_result,
       "Vitals.Thyroid.Avg_result":  Avg_result,
       "Vitals.Thyroid.Status":  Status,
    },
    {
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Thyroid Report Updated",
            Vitals: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}

const addFitbitinfo = async (req, res) => {
    const{NumberofSteps,Distance,Calories,FatBurn,Cardio,Peak}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
        "Medical_Device.Fitbit.NumberofSteps": NumberofSteps,
        "Medical_Device.Fitbit.Distance": Distance,  
        "Medical_Device.Fitbit.Calories": Calories,
        "Medical_Device.Fitbit.FatBurn":  FatBurn,
        "Medical_Device.Fitbit.Cardio":  Cardio,
        "Medical_Device.Fitbit.Peak":  Peak,
    },{
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Fitbit Status Updated",
            Fitbit: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}

const addGlucometerinfo = async (req, res) => {
    const{Latest_result,Avg_result}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },
    {
        "Medical_Device.Glucometer.Latest_result":  Latest_result,
        "Medical_Device.Glucometer.Avg_result":  Avg_result,
    },{
        upsert:true
    }).then(patient=>
        res.status(200).json({
            Message:"Fitbit Status Updated",
            Fitbit: patient,
        })).catch((error)=>
        res.status(400).json({
            message:error.message
        }))
}




module.exports.registerPatient = registerPatient
module.exports.loginPatient = loginPatient
module.exports.onBoard1Patientupdate = onBoard1Patientupdate
module.exports.onBoard2Patientadd = onBoard2Patientadd
module.exports.addmedications = addmedications
module.exports.getAllPatients = getAllPatients
module.exports.addHeartRateInfo = addHeartRateInfo
module.exports.addBloodPressureInfo = addBloodPressureInfo
module.exports.adddOxygenInfo = adddOxygenInfo
module.exports.addrespiratoryInfo= addrespiratoryInfo
module.exports.addTemperatureInfo = addTemperatureInfo
module.exports.addHaemoglobinInfo= addHaemoglobinInfo
module.exports.addGlucoseInfo = addGlucoseInfo
module.exports.addThyroidInfo = addThyroidInfo
module.exports.addFitbitinfo = addFitbitinfo
module.exports.addGlucometerinfo = addGlucometerinfo

