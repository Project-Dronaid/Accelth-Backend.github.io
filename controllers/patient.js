const Patient = require('../models/patient')
const bcrypt = require('bcryptjs')
const { GridFsStorage } = require('multer-gridfs-storage')

// const multer = require("multer");
// const {GridFsStorage} = require("multer-gridfs-storage");

const registerPatient = async (req, res)=> {
    const{Name,Contact_Number,Email_id,Password,DateofBirth,Gender,Bloodgroup,Height,Weight,Allergies,Blindcondition} = req.body
    if(Password.length <= 8){
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
                    Gender:  Gender,
                    Bloodgroup:Bloodgroup,
                    Height:  Height,
                    Weight:  Weight,
                    DateofBirth:  DateofBirth,
                },
                Medical:{
                    Allergies: Allergies,
                    Blindcondition:Blindcondition,
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

const updatePatientProfilePersonal = async (req, res) => {
    const{Maritial_Status,Emergency_contact,Address}= req.body
    const{Email_id} = req.params
    await Patient.patient.updateOne(
        {
            "Profile.Personal.Email_id":  Email_id,
        },{
            "Profile.Personal.Maritial_Status":  Maritial_Status,
            "Profile.Personal.Emergency_contact":  Emergency_contact,
            "Profile.Personal.Address":  Address,
        },{
            upsert:true
        }
    ).then(patient=>res.status(200).json({
        message: "Pateint data's updated",
        patient:patient
    })).catch((error)=>res.status(400).json(error.message))
}

const updatePatientProfileMedical = async (req, res) => {
    const{Vaccination,Currect_Medications,Chronic_Diseases,Injuries,Surgeries} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Profile.Medical.Vaccination": Vaccination,
        "Profile.Medical.Currect_Medications":  Currect_Medications,
        "Profile.Medical.Chronic_Diseases":  Chronic_Diseases,
        "Profile.Medical.Injuries":  Injuries,
        "Profile.Medical.Surgeries":  Surgeries,
    },{upsert:true}).then(patient=>res.status(200).json({
        message: "Patient's Medical Data Updated",
        patient:patient,
    })).catch((error)=>res.status(400).json(error.message))
}

const updatePatientProfileLifestyle = async (req, res) => {
    const{Activity} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Profile.Lifestyle.Activity": Activity
    },{upsert:true}).then(patient=>res.status(200).json({
        message: "Patient's Medical Data Updated",
        patient:patient,
    })).catch((error)=>res.status(400).json(error.message))
}

// const onBoard1Patientupdate = async (req, res) => {
//     const{DateofBirth,Gender,Bloodgroup,Height,Weight}=req.body
//     const{Email_id}= req.params
//     await Patient.patient.updateOne(
//             { 
//                 "Profile.Personal.Email_id":  Email_id
//             },
//         { 
//             "Profile.Personal.Gender":  Gender,
//             "Profile.Personal.Bloodgroup":Bloodgroup,
//             "Profile.Personal.Height":  Height,
//             "Profile.Personal.Weight":  Weight,
//             "Profile.Personal.DateofBirth":  DateofBirth,
//         },
//         {upsert:true}
//           ).then(patient=>
//             res.status(200).json({
//                 message:"Patient's data updated",
//                 patient: patient,
//             })
//             ).catch((error)=>res.status(400).json({
//                 message : error.message
//             })
//         )
// }

// const onBoard2Patientadd = async (req, res) => {
//     const{Allergies,Blindcondition} = req.body
//     const{Email_id}= req.params
//     await Patient.patient.updateOne(
//         {
//             "Profile.Personal.Email_id":  Email_id
//         },
//         { 
//             "Profile.Medical.Allergies": Allergies,
//             "Profile.Medical.Blindcondition" : Blindcondition,
//         },
//         {
//             upsert:true
//         },
//       ).then(patient=>
//         res.status(200).json({
//             message:"Patient's data updated",
//             patient: patient,
//         })
//         ).catch((error)=>res.status(400).json({
//             message : error.message
//         })
//     )
// }

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

const adddoctors = async (req, res) => {
    const {Name,Degree,Specs,Hospital,PhotoUrl} = req.body
    const {Email_id} = req.params;
     await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
     },
        {
            $push : {
                Doctors: {
                    Name: Name,
                    Degree:Degree,
                    Specs:Specs,
                    Hospital:Hospital,
                    PhotoUrl:PhotoUrl
                }
            }
     },{upsert:true}).then(patient=>
        res.status(200).json({
            message: "Doctor added",
            medication: patient,
        })).catch((error)=>res.status(400).json({
            message: error.message,
        })) 

}

const addIssues = async (req, res) => {
    const {Status,Info,Date,Time,Doc_Name,Hospital,Problem,Treatment_Plan,Diagnosis,Followup,Expected,Actual} = req.body
    const {Email_id} = req.params;
     await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
     },
        {
            $push : {
                Issues: {
                    Status: Status,
                    Info: Info,
                    Date: Date,
                    Time: Time,
                    Doc_Name: Doc_Name,
                    Hospital: Hospital,
                    Problem: Problem,
                    Treatment_Plan: Treatment_Plan,
                    Diagnosis: Diagnosis,
                    Followup: Followup,
                    Recovery : {
                             Expected: Expected,
                             Actual: Actual,
                         },
                }
            }
     },{upsert:true}).then(patient=>
        res.status(200).json({
            message: "Issue added",
            medication: patient,
        })).catch((error)=>res.status(400).json({
            message: error.message,
        })) 
}

const addVisits = async (req, res) => {
    const{Year,Date,Issue,Doctor,Post}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        $push : {
            Visits: {
                Year: Year,     
                Date: Date,
                Issue: Issue,
                Doctor: Doctor,
                Post: Post,
            }
        }
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "Visit added",
            Patient: patient
        })
    }).catch((error)=>res.status(400).json(error.message))
}

const addHospitalization = async (req, res) => {
    const{Year,Date,Reason,Doctor,Post}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        $push : {
            Hospitalization: {
                Year: Year,
                Date: Date,
                Reason: Reason,
                Doctor: Doctor,
                Post: Post,
            }
        }
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "Hospitalization added",
            Patient: patient
        })
    }).catch((error)=>res.status(400).json(error.message))
}

const OrderPlace = async (req, res) => {
    const{OrderID,Date,Time}= req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        $push : {
            Orders: {
                OrderID: OrderID,
                Date: Date,
                Time: Time,
            }
        }
    },{upsert:true}
    ).then(patient=>{
        res.status(200).json({
            Message: "Congratulations! Order Placed",
            Patient: patient
        })
    }).catch((error)=>res.status(400).json(error.message))
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

const addOngoing = async (req, res) => {
    const{Ongoing_Treatment,Treatment_Plan}=req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        Ongoing_Treatment:Ongoing_Treatment,
        Treatment_Plan: Treatment_Plan,
    },{value: true}).then(patient=>
        res.status(200).json({
            Message:"Ongoing_Treatment Updated",
            patient: patient,
        })).catch((error)=>res.status(400).json(error.message))
}

const updateWalletBalance = async (req, res) => {
    const{Wallet_Balance}=req.body
    const{Email_id}=req.params

    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        Wallet_Balance:Wallet_Balance,
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message:"Wallet Balance Updated",
            Patient: patient,
        })
    }).catch((error)=>res.status(200).json(error.message))
}

const addCovidReport = async (req, res) => {
    const{Name,File_Name} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Lab_Reports.Diagnostic_Test.Covid.Name":Name,
        "Lab_Reports.Diagnostic_Test.Covid.File_Name":File_Name,
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "Covid Report Uploaded",
            Patient: patient,
        })
    }).catch((error)=> res.status(400).json(error.message))
}

const addDengueReport = async (req, res) => {
    const{Name,File_Name} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Lab_Reports.Diagnostic_Test.Dengue.Name":Name,
        "Lab_Reports.Diagnostic_Test.Dengue.File_Name":File_Name,
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "Dengue Report Uploaded",
            Patient: patient,
        })
    }).catch((error)=> res.status(400).json(error.message))
}

const addCBCReport = async (req, res) => {
    const{Name,File_Name,WBC,RBC,Latest_result,Avg_result,Status,Haematocrit,
        MCV,MCHC,RDW,Platelets,Neutrophils,Lymphs,Monocytes,EOS,Basos,} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Lab_Reports.Blood_Tests.CBC.Name":Name,
        "Lab_Reports.Blood_Tests.CBC.File_Name":File_Name,
        "Lab_Reports.Blood_Tests.CBC.WBC":WBC,
        "Lab_Reports.Blood_Tests.CBC.RBC":RBC,
        "Lab_Reports.Blood_Tests.CBC.Haemoglobin.Latest_result":  Latest_result,
        "Lab_Reports.Blood_Tests.CBC.Haemoglobin.Avg_result":  Avg_result,
        "Lab_Reports.Blood_Tests.CBC.Haemoglobin.Status":  Status,
        "Lab_Reports.Blood_Tests.CBC.Haematocrit":Haematocrit,
        "Lab_Reports.Blood_Tests.CBC.MCV":MCV,
        "Lab_Reports.Blood_Tests.CBC.MCHC":MCHC,
        "Lab_Reports.Blood_Tests.CBC.RDW":RDW,
        "Lab_Reports.Blood_Tests.CBC.Platelets":Platelets,
        "Lab_Reports.Blood_Tests.CBC.Neutrophils":Neutrophils,
        "Lab_Reports.Blood_Tests.CBC.Lymphs":Lymphs,
        "Lab_Reports.Blood_Tests.CBC.Monocytes":Monocytes,
        "Lab_Reports.Blood_Tests.CBC.EOS":EOS,
        "Lab_Reports.Blood_Tests.CBC.Basos":Basos,
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "CBC Uploaded",
            Patient: patient,
        })
    }).catch((error)=> res.status(400).json(error.message))
}

const addBMPReport = async (req, res) => {
    const{Name,File_Name,Latest_result,Avg_result,Status,UreaNitrogen,Creatine,Sodium,Potassium,
        Chlorine,Carbon_Dioxide,Calcium} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Name":Name,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.File_Name":File_Name,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Glucose.Latest_result":  Latest_result,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Glucose.Avg_result":  Avg_result,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Glucose.Status":  Status,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.UreaNitrogen":UreaNitrogen,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Creatine":Creatine,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Sodium":Sodium,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Potassium":Potassium,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Chlorine":Chlorine,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Carbon_Dioxide":Carbon_Dioxide,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Calcium":Calcium,
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "Basic_Metabolic_Panel Report Uploaded",
            Patient: patient,
        })
    }).catch((error)=> res.status(400).json(error.message))
}

const addCMPReport = async (req, res) => {
    const{Name,File_Name,Latest_result,Avg_result,Status,Creatine,Sodium,Potassium,Chlorine,Carbon_Dioxide,
    Calcium,Protein,Albumin,Globulin,AG_Ratio,Bilirubin,AlkalinePhosphate,AST,ALT,} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Name":Name,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.File_Name":File_Name,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.UreaNitrogen.Latest_result":  Latest_result,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.UreaNitrogen.Avg_result":  Avg_result,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.UreaNitrogen.Status":  Status,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Creatine":Creatine,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Sodium":Sodium,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Potassium":Potassium,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Chlorine":Chlorine,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Carbon_Dioxide":Carbon_Dioxide,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Calcium":Calcium,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Protein":Protein,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Albumin":Albumin,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Globulin":Globulin,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.AG_Ratio":AG_Ratio,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Bilirubin":Bilirubin,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.AlkalinePhosphate":AlkalinePhosphate,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.AST":AST,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.ALT":ALT,
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "Comprehensive_Metabolic_Panel Report Uploaded",
            Patient: patient,
        })
    }).catch((error)=> res.status(400).json(error.message))
}

const addTPReport = async (req, res) => {
    const{Name,File_Name,Latest_result,Avg_result,Status,T3Uptake,FreeThyroxineIndex,ThyroxineT4FreeDirect,
    TSH,TriiodothyronineFreeSerum} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Lab_Reports.Blood_Tests.ThyroidPanel.Name":Name,
        "Lab_Reports.Blood_Tests.ThyroidPanel.File_Name":File_Name,
        "Lab_Reports.Blood_Tests.ThyroidPanel.Thyroxine.Latest_result":  Latest_result,
        "Lab_Reports.Blood_Tests.ThyroidPanel.Thyroxine.Avg_result":  Avg_result,
        "Lab_Reports.Blood_Tests.ThyroidPanel.Thyroxine.Status":  Status,
        "Lab_Reports.Blood_Tests.ThyroidPanel.T3Uptake":T3Uptake,
        "Lab_Reports.Blood_Tests.ThyroidPanel.FreeThyroxineIndex":FreeThyroxineIndex,
        "Lab_Reports.Blood_Tests.ThyroidPanel.ThyroxineT4FreeDirect":ThyroxineT4FreeDirect,
        "Lab_Reports.Blood_Tests.ThyroidPanel.TSH":TSH,
        "Lab_Reports.Blood_Tests.ThyroidPanel.TriiodothyronineFreeSerum":TriiodothyronineFreeSerum,
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "ThyroidPanel Report Uploaded",
            Patient: patient,
        })
    }).catch((error)=> res.status(400).json(error.message))
}

const addLPReport = async (req, res) => {
    const{Name,File_Name,Latest_result,Avg_result,Status,Triglycerides,HDLCholesterol,LDLCholesterol,LDLHDLRatio,TotalCHOLHDL} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  Email_id,
    },{
        "Lab_Reports.Blood_Tests.LipidPanel.Name":Name,
        "Lab_Reports.Blood_Tests.LipidPanel.File_Name":File_Name,
        "Lab_Reports.Blood_Tests.LipidPanel.TotalCholesterol.Latest_result":  Latest_result,
        "Lab_Reports.Blood_Tests.LipidPanel.TotalCholesterol.Avg_result":  Avg_result,
        "Lab_Reports.Blood_Tests.LipidPanel.TotalCholesterol.Status":  Status,
        "Lab_Reports.Blood_Tests.LipidPanel.Triglycerides":Triglycerides,
        "Lab_Reports.Blood_Tests.LipidPanel.HDLCholesterol":HDLCholesterol,
        "Lab_Reports.Blood_Tests.LipidPanel.LDLCholesterol":LDLCholesterol,
        "Lab_Reports.Blood_Tests.LipidPanel.LDLHDLRatio":LDLHDLRatio,
        "Lab_Reports.Blood_Tests.LipidPanel.TotalCHOLHDL":TotalCHOLHDL,
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            Message: "LipidPanel Report Uploaded",
            Patient: patient,
        })
    }).catch((error)=> res.status(400).json(error.message))
}

const getasinglepatient = async (req, res) => {
    const{Email_id}= req.params
    const patient = await Patient.patient.findOne({
        "Profile.Personal.Email_id":  Email_id
    })
    if(!patient){
        res.status(400).json({
            Message:"Searching not successful",
            Error:"Patient not found"
        })
    }else{
        res.status(200).json(patient)
    }
}

const addLifestyle = async (req, res) => {
    const{Smoking,Alcohol,Activity,Food_Preference} = req.body
    const{Email_id}= req.params
    await Patient.patient.updateOne(
        {
            "Profile.Personal.Email_id":  Email_id
        },
        { 
            "Profile.Lifestyle.Smoking": Smoking,
            "Profile.Lifestyle.Alcohol" : Alcohol,
            "Profile.Lifestyle.Activity":  Activity,
            "Profile.Lifestyle.Food_Preference":  Food_Preference,
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






module.exports.registerPatient = registerPatient
module.exports.loginPatient = loginPatient
// module.exports.onBoard1Patientupdate = onBoard1Patientupdate
// module.exports.onBoard2Patientadd = onBoard2Patientadd
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
module.exports.addOngoing = addOngoing
module.exports.addIssues = addIssues
module.exports.updateWalletBalance = updateWalletBalance
module.exports.addVisits = addVisits
module.exports.addHospitalization = addHospitalization
module.exports.OrderPlace = OrderPlace
module.exports.addCovidReport = addCovidReport
module.exports.addDengueReport = addDengueReport
module.exports.addCBCReport = addCBCReport
module.exports.addBMPReport= addBMPReport
module.exports.addCMPReport = addCMPReport
module.exports.addTPReport = addTPReport
module.exports.addLPReport = addLPReport
module.exports.getasinglepatient = getasinglepatient
module.exports.addLifestyle = addLifestyle
module.exports.updatePatientProfilePersonal = updatePatientProfilePersonal
module.exports.updatePatientProfileMedical= updatePatientProfileMedical
module.exports.updatePatientProfileLifestyle =updatePatientProfileLifestyle
module.exports.adddoctors=adddoctors
