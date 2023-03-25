const Patient = require('../models/patient')
const bcrypt = require('bcryptjs')
const { GridFsStorage } = require('multer-gridfs-storage')
const { addSubstitutes } = require('./items')
const otpGenerator = require('otp-generator')
const crypto = require('crypto')
const { param } = require('../routes/patientroute')
const exp = require('constants')
var moment = require('moment')
const MedItem = require('../models/items')
const QRCode = require('qrcode')
const axios = require('axios')

// const multer = require("multer");
// const {GridFsStorage} = require("multer-gridfs-storage");

const changePassword = async (req, res) => {
    const { Contact_Number, Password } = req.body
    if (Password.length <= 8) {
        return res.status(400).json({
            message: "Password must be atleast 8 characters long"
        })
    }
    bcrypt.hash(Password, 10).then(async (hash) => {
        try {
            const patient = await Patient.patient.findOne({
                "Profile.Personal.Contact_Number": Contact_Number
            })
            bcrypt.compare(Password, patient.Profile.Personal.Password).then(function (result) {
                if (result)
                    return res.status(200).json({
                        data: "Same as old password"
                    });
            });
        } catch (error) {
            res.status(400).json({
                Message: "An error occured",
                Error: error.message
            })
        }
        await Patient.patient.updateOne({
            "Profile.Personal.Contact_Number": Contact_Number
        }, {
            "Profile.Personal.Password": hash,
        }).then(Patient =>
            res.status(200).json({
                Message: "Password changed successfully",
                Patient: Patient,
            })
        ).catch((error) => res.status(400).json({
            Message: error.message
        })
        )
    });


}


const deleteApatient = async (req, res) => {
    const { Email_id } = req.params
    await Patient.patient.findOneAndDelete({
        Email_id: Email_id,
    }).then(Patient =>
        res.status(200).json({
            Message: "Patient Deleted successfully",
            Patient: Patient,
        })
    ).catch((error) => res.status(400).json({
        Message: error.message
    })
    )
}

const registerPatient = async (req, res) => {
    const { Name, Contact_Number, Email_id, Password, DateofBirth, Gender, Bloodgroup, Height, Weight, Allergies, Blindcondition, Activity} = req.body
    if (Password.length <= 8) {
        return res.status(400).json({
            message: "Password must be atleast 8 characters long"
        })
    }
    bcrypt.hash(Password, 10).then(async (hash) => {
        await Patient.patient.create({
            Profile: {
                Personal: {
                    Name: Name,
                    Contact_Number: Contact_Number,
                    Email_id: Email_id,
                    Password: hash,
                    Gender: Gender,
                    Bloodgroup: Bloodgroup,
                    Height: Height,
                    Weight: Weight,
                    DateofBirth: DateofBirth,
                },
                Medical: {
                    Allergies: Allergies,
                    Blindcondition: Blindcondition,
                },
                Lifestyle: {
                    Activity: Activity
                }
            },
        }).then(Patient =>
            res.status(200).json({
                Message: "Patient Registered successfully",
                Patient: Patient,
            })
        ).catch((error) => res.status(400).json({
            Message: error.message
        })
        )
    });
    // const data = 'https://tqbm2dzy21.execute-api.us-west-2.amazonaws.com/patient/getasinglepatient/' + Email_id; // Replace this with the URL of your API
    // const filePath = './' + Email_id + '_qr-code.png'; // Replace this with the path where you want to save the QR code
    // QRCode.toFile(filePath, data, function (err) {
    //     if (err) throw err;
    //     console.log('QR code saved to', filePath);
    // });
}

const loginPatient = async (req, res) => {
    const { Email_id, Password } = req.body
    // try{
    //     console.log(await QRCode.toDataURL("hhttp://8be6-45-112-144-67.ngrok.io/patient/getasinglepatient/"+Email_id))
    // }catch(err){
    //     console.log(err)
    // }
    if (!Email_id || !Password) {
        return res.status(400).json({ Message: "Email_id or Password not present" });
    }
    try {
        const patient = await Patient.patient.findOne({
            "Profile.Personal.Email_id": Email_id
        });
        if (!patient) {
            res.status(400).json({
                Message: "Login not successful",
                Error: "Patient not found"
            })
        } else {
            bcrypt.compare(Password, patient.Profile.Personal.Password).then(function (result) {
                result ?
                    res.status(200).json({
                        Patient: patient,
                        Message: "Login Successful"
                    }) :
                    res.status(400).json({
                        Message: "Login not successful",
                    });
            });
        }
    } catch (error) {
        res.status(400).json({
            Message: "An error occured",
            Error: error.message
        })
    }
}

const updatePatientProfilePersonal = async (req, res) => {
    const { Maritial_Status, Emergency_contact, Address } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne(
        {
            "Profile.Personal.Email_id": Email_id,
        }, {
        "Profile.Personal.Maritial_Status": Maritial_Status,
        "Profile.Personal.Emergency_contact": Emergency_contact,
        "Profile.Personal.Address": Address,
    }, {
        upsert: true
    }
    ).then(patient => res.status(200).json({
        message: "Pateint data's updated",
        patient: patient
    })).catch((error) => res.status(400).json(error.message))
}

const updatePatientProfileMedical = async (req, res) => {
    const { Vaccination, Currect_Medications, Chronic_Diseases, Injuries, Surgeries } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Profile.Medical.Vaccination": Vaccination,
        "Profile.Medical.Currect_Medications": Currect_Medications,
        "Profile.Medical.Chronic_Diseases": Chronic_Diseases,
        "Profile.Medical.Injuries": Injuries,
        "Profile.Medical.Surgeries": Surgeries,
    }, { upsert: true }).then(patient => res.status(200).json({
        message: "Patient's Medical Data Updated",
        patient: patient,
    })).catch((error) => res.status(400).json(error.message))
}

const updatePatientProfileLifestyle = async (req, res) => {
    const { Activity } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Profile.Lifestyle.Activity": Activity
    }, { upsert: true }).then(patient => res.status(200).json({
        message: "Patient's Medical Data Updated",
        patient: patient,
    })).catch((error) => res.status(400).json(error.message))
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
    const { Name, Start_Date, End_Date, Dose1, Dose2, Dose3 } = req.body
    const { Email_id } = req.params;
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            $push: {
                Medications: {
                    Name: Name,
                    Start_Date: Start_Date,
                    End_Date: End_Date,
                    Meal_Plan: {
                        Dose1: Dose1,
                        Dose2: Dose2,
                        Dose3: Dose3,
                    },
                }
            }
        }, { upsert: true }).then(patient =>
            res.status(200).json({
                message: "Medications added",
                medication: patient,
            })).catch((error) => res.status(400).json({
                message: error.message,
            }))

}

const adddoctors = async (req, res) => {
    const { Name, Degree, Specs, Hospital, PhotoUrl } = req.body
    const { Email_id } = req.params;
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            $pull: {
                Doctors: {
                    Name: Name,
                    Degree: Degree,
                    Specs: Specs,
                    Hospital: Hospital,
                }
            }
        }, { upsert: true }).then(patient =>
            res.status(200).json({
                message: "Doctor added",
                medication: patient,
            })).catch((error) => res.status(400).json({
                message: error.message,
            }))

}

const addIssues = async (req, res) => {
    const { Status, Info, Date, Time, Doc_Name, Hospital, Problem, Treatment_Plan, Diagnosis, Followup, Expected, Actual } = req.body
    const { Email_id } = req.params;
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            $push: {
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
                    Recovery: {
                        Expected: Expected,
                        Actual: Actual,
                    },
                }
            }
        }, { upsert: true }).then(patient =>
            res.status(200).json({
                message: "Issue added",
                medication: patient,
            })).catch((error) => res.status(400).json({
                message: error.message,
            }))
}

const addVisits = async (req, res) => {
    const { Year, Date, Issue, Doctor, Post } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        $push: {
            Visits: {
                Year: Year,
                Date: Date,
                Issue: Issue,
                Doctor: Doctor,
                Post: Post,
            }
        }
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "Visit added",
            Patient: patient
        })
    }).catch((error) => res.status(400).json(error.message))
}

const addHospitalization = async (req, res) => {
    const { Year, Date, Reason, Doctor, Post } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        $push: {
            Hospitalization: {
                Year: Year,
                Date: Date,
                Reason: Reason,
                Doctor: Doctor,
                Post: Post,
            }
        }
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "Hospitalization added",
            Patient: patient
        })
    }).catch((error) => res.status(400).json(error.message))
}

const OrderPlace = async (req, res) => {
    var DATE = moment().format('L')
    var TIME = moment().format('LTS')
    var ODRTIME = moment().format('LT')
    var year = DATE.split('/')[2]
    var month = DATE.split('/')[0]
    var date = DATE.split('/')[1]
    var hour = TIME.split(':')[0]
    var minute = TIME.split(':')[1]
    var seconds = TIME.split(':')[2].split(' ')[0]
    const { CartItems, TotalAmount, Address, DroneID,
        DeliveredDate, DeliveredTime, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient
        .updateOne(
            {
                'Profile.Personal.Email_id': Email_id,
            },
            {
                $push: {
                    Orders: {
                        OrderID:
                            'ODR' +
                            year +
                            month +
                            date +
                            hour +
                            minute +
                            seconds,
                        Date: DATE,
                        Time: ODRTIME,
                        CartItems: CartItems,
                        InvoiceFilename:
                            'INV' +
                            year +
                            month +
                            date +
                            hour +
                            minute +
                            seconds,
                        TotalAmount: TotalAmount,
                        Address: Address,
                        DroneID: DroneID,
                        DeliveredDate: DeliveredDate,
                        DeliveredTime: DeliveredTime,
                        Status: Status,
                    },
                },
            },
            { upsert: true }
        )
        .then((patient) => {
            res.status(200).json({
                Message: 'Congratulations! Order Placed',
                Patient: patient,
            });
        })
        .catch((error) => res.status(400).json(error.message));
    await clearCart(req, res);
}

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.patient.find();
        res.status(200).json(patients)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const addHeartRateInfo = async (req, res) => {
    const { Latest_result, Avg_result, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Vitals.HeartRate.Latest_result": Latest_result,
            "Vitals.HeartRate.Avg_result": Avg_result,
            "Vitals.HeartRate.Status": Status,
        },
        {
            upsert: true
        }).then(patient =>
            res.status(200).json({
                Message: "Hear Rate Report Updated",
                Vitals: patient,
            })).catch((error) =>
                res.status(400).json({
                    message: error.message
                }))
}

const addBloodPressureInfo = async (req, res) => {
    const { Latest_result, Avg_result, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Vitals.BloodPressure.Latest_result": Latest_result,
            "Vitals.BloodPressure.Avg_result": Avg_result,
            "Vitals.BloodPressure.Status": Status,
        },
        {
            upsert: true
        }).then(patient =>
            res.status(200).json({
                Message: "Blood Pressure Report Updated",
                Vitals: patient,
            })).catch((error) =>
                res.status(400).json({
                    message: error.message
                }))
}

const adddOxygenInfo = async (req, res) => {
    const { Latest_result, Avg_result, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Vitals.Oxygen.Latest_result": Latest_result,
            "Vitals.Oxygen.Avg_result": Avg_result,
            "Vitals.Oxygen.Status": Status,
        },
        {
            upsert: true
        }).then(patient =>
            res.status(200).json({
                Message: "Oxygen Report Updated",
                Vitals: patient,
            })).catch((error) =>
                res.status(400).json({
                    message: error.message
                }))
}

const addrespiratoryInfo = async (req, res) => {
    const { Latest_result, Avg_result, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Vitals.Respiratory.Latest_result": Latest_result,
            "Vitals.Respiratory.Avg_result": Avg_result,
            "Vitals.Respiratory.Status": Status,
        },
        {
            upsert: true
        }).then(patient =>
            res.status(200).json({
                Message: "Respiratory Report Updated",
                Vitals: patient,
            })).catch((error) =>
                res.status(400).json({
                    message: error.message
                }))
}

const addTemperatureInfo = async (req, res) => {
    const { Latest_result, Avg_result, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Vitals.Temperature.Latest_result": Latest_result,
            "Vitals.Temperature.Avg_result": Avg_result,
            "Vitals.Temperature.Status": Status,
        },
        {
            upsert: true
        }).then(patient =>
            res.status(200).json({
                Message: "Temperature Report Updated",
                Vitals: patient,
            })).catch((error) =>
                res.status(400).json({
                    message: error.message
                }))
}

const addHaemoglobinInfo = async (req, res) => {
    const { Latest_result, Avg_result, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Vitals.Haemoglobin.Latest_result": Latest_result,
            "Vitals.Haemoglobin.Avg_result": Avg_result,
            "Vitals.Haemoglobin.Status": Status,
        },
        {
            upsert: true
        }).then(patient =>
            res.status(200).json({
                Message: "Haemoglobin Report Updated",
                Vitals: patient,
            })).catch((error) =>
                res.status(400).json({
                    message: error.message
                }))
}
const addGlucoseInfo = async (req, res) => {
    const { Latest_result, Avg_result, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Vitals.Glucose.Latest_result": Latest_result,
            "Vitals.Glucose.Avg_result": Avg_result,
            "Vitals.Glucose.Status": Status,
        },
        {
            upsert: true
        }).then(patient =>
            res.status(200).json({
                Message: "Glucose Report Updated",
                Vitals: patient,
            })).catch((error) =>
                res.status(400).json({
                    message: error.message
                }))
}

const addThyroidInfo = async (req, res) => {
    const { Latest_result, Avg_result, Status } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Vitals.Thyroid.Latest_result": Latest_result,
            "Vitals.Thyroid.Avg_result": Avg_result,
            "Vitals.Thyroid.Status": Status,
        },
        {
            upsert: true
        }).then(patient =>
            res.status(200).json({
                Message: "Thyroid Report Updated",
                Vitals: patient,
            })).catch((error) =>
                res.status(400).json({
                    message: error.message
                }))
}

const addFitbitinfo = async (req, res) => {
    const { NumberofSteps, Distance, Calories, FatBurn, Cardio, Peak } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Medical_Device.Fitbit.NumberofSteps": NumberofSteps,
            "Medical_Device.Fitbit.Distance": Distance,
            "Medical_Device.Fitbit.Calories": Calories,
            "Medical_Device.Fitbit.FatBurn": FatBurn,
            "Medical_Device.Fitbit.Cardio": Cardio,
            "Medical_Device.Fitbit.Peak": Peak,
        }, {
        upsert: true
    }).then(patient =>
        res.status(200).json({
            Message: "Fitbit Status Updated",
            Fitbit: patient,
        })).catch((error) =>
            res.status(400).json({
                message: error.message
            }))
}

const addGlucometerinfo = async (req, res) => {
    const { Latest_result, Avg_result } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    },
        {
            "Medical_Device.Glucometer.Latest_result": Latest_result,
            "Medical_Device.Glucometer.Avg_result": Avg_result,
        }, {
        upsert: true
    }).then(patient =>
        res.status(200).json({
            Message: "Fitbit Status Updated",
            Fitbit: patient,
        })).catch((error) =>
            res.status(400).json({
                message: error.message
            }))
}

const addOngoing = async (req, res) => {
    const { Ongoing_Treatment, Treatment_Plan } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        Ongoing_Treatment: Ongoing_Treatment,
        Treatment_Plan: Treatment_Plan,
    }, { value: true }).then(patient =>
        res.status(200).json({
            Message: "Ongoing_Treatment Updated",
            patient: patient,
        })).catch((error) => res.status(400).json(error.message))
}

const updateWalletBalance = async (req, res) => {
    const { Wallet_Balance } = req.body
    const { Email_id } = req.params

    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        Wallet_Balance: Wallet_Balance,
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "Wallet Balance Updated",
            Patient: patient,
        })
    }).catch((error) => res.status(200).json(error.message))
}

const addCovidReport = async (req, res) => {
    const { Name, File_Name } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Lab_Reports.Diagnostic_Test.Covid.Name": Name,
        "Lab_Reports.Diagnostic_Test.Covid.File_Name": File_Name,
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "Covid Report Uploaded",
            Patient: patient,
        })
    }).catch((error) => res.status(400).json(error.message))
}

const addDengueReport = async (req, res) => {
    const { Name, File_Name } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Lab_Reports.Diagnostic_Test.Dengue.Name": Name,
        "Lab_Reports.Diagnostic_Test.Dengue.File_Name": File_Name,
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "Dengue Report Uploaded",
            Patient: patient,
        })
    }).catch((error) => res.status(400).json(error.message))
}

const addCBCReport = async (req, res) => {
    const { Name, File_Name, WBC, RBC, Latest_result, Avg_result, Status, Haematocrit,
        MCV, MCHC, RDW, Platelets, Neutrophils, Lymphs, Monocytes, EOS, Basos, } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Lab_Reports.Blood_Tests.CBC.Name": Name,
        "Lab_Reports.Blood_Tests.CBC.File_Name": File_Name,
        "Lab_Reports.Blood_Tests.CBC.WBC": WBC,
        "Lab_Reports.Blood_Tests.CBC.RBC": RBC,
        "Lab_Reports.Blood_Tests.CBC.Haemoglobin.Latest_result": Latest_result,
        "Lab_Reports.Blood_Tests.CBC.Haemoglobin.Avg_result": Avg_result,
        "Lab_Reports.Blood_Tests.CBC.Haemoglobin.Status": Status,
        "Lab_Reports.Blood_Tests.CBC.Haematocrit": Haematocrit,
        "Lab_Reports.Blood_Tests.CBC.MCV": MCV,
        "Lab_Reports.Blood_Tests.CBC.MCHC": MCHC,
        "Lab_Reports.Blood_Tests.CBC.RDW": RDW,
        "Lab_Reports.Blood_Tests.CBC.Platelets": Platelets,
        "Lab_Reports.Blood_Tests.CBC.Neutrophils": Neutrophils,
        "Lab_Reports.Blood_Tests.CBC.Lymphs": Lymphs,
        "Lab_Reports.Blood_Tests.CBC.Monocytes": Monocytes,
        "Lab_Reports.Blood_Tests.CBC.EOS": EOS,
        "Lab_Reports.Blood_Tests.CBC.Basos": Basos,
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "CBC Uploaded",
            Patient: patient,
        })
    }).catch((error) => res.status(400).json(error.message))
}

const addBMPReport = async (req, res) => {
    const { Name, File_Name, Latest_result, Avg_result, Status, UreaNitrogen, Creatine, Sodium, Potassium,
        Chlorine, Carbon_Dioxide, Calcium } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Name": Name,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.File_Name": File_Name,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Glucose.Latest_result": Latest_result,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Glucose.Avg_result": Avg_result,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Glucose.Status": Status,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.UreaNitrogen": UreaNitrogen,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Creatine": Creatine,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Sodium": Sodium,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Potassium": Potassium,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Chlorine": Chlorine,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Carbon_Dioxide": Carbon_Dioxide,
        "Lab_Reports.Blood_Tests.Basic_Metabolic_Panel.Calcium": Calcium,
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "Basic_Metabolic_Panel Report Uploaded",
            Patient: patient,
        })
    }).catch((error) => res.status(400).json(error.message))
}

const addCMPReport = async (req, res) => {
    const { Name, File_Name, Latest_result, Avg_result, Status, Creatine, Sodium, Potassium, Chlorine, Carbon_Dioxide,
        Calcium, Protein, Albumin, Globulin, AG_Ratio, Bilirubin, AlkalinePhosphate, AST, ALT, } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Name": Name,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.File_Name": File_Name,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.UreaNitrogen.Latest_result": Latest_result,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.UreaNitrogen.Avg_result": Avg_result,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.UreaNitrogen.Status": Status,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Creatine": Creatine,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Sodium": Sodium,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Potassium": Potassium,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Chlorine": Chlorine,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Carbon_Dioxide": Carbon_Dioxide,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Calcium": Calcium,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Protein": Protein,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Albumin": Albumin,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Globulin": Globulin,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.AG_Ratio": AG_Ratio,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.Bilirubin": Bilirubin,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.AlkalinePhosphate": AlkalinePhosphate,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.AST": AST,
        "Lab_Reports.Blood_Tests.Comprehensive_Metabolic_Panel.ALT": ALT,
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "Comprehensive_Metabolic_Panel Report Uploaded",
            Patient: patient,
        })
    }).catch((error) => res.status(400).json(error.message))
}

const addTPReport = async (req, res) => {
    const { Name, File_Name, Latest_result, Avg_result, Status, T3Uptake, FreeThyroxineIndex, ThyroxineT4FreeDirect,
        TSH, TriiodothyronineFreeSerum } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Lab_Reports.Blood_Tests.ThyroidPanel.Name": Name,
        "Lab_Reports.Blood_Tests.ThyroidPanel.File_Name": File_Name,
        "Lab_Reports.Blood_Tests.ThyroidPanel.Thyroxine.Latest_result": Latest_result,
        "Lab_Reports.Blood_Tests.ThyroidPanel.Thyroxine.Avg_result": Avg_result,
        "Lab_Reports.Blood_Tests.ThyroidPanel.Thyroxine.Status": Status,
        "Lab_Reports.Blood_Tests.ThyroidPanel.T3Uptake": T3Uptake,
        "Lab_Reports.Blood_Tests.ThyroidPanel.FreeThyroxineIndex": FreeThyroxineIndex,
        "Lab_Reports.Blood_Tests.ThyroidPanel.ThyroxineT4FreeDirect": ThyroxineT4FreeDirect,
        "Lab_Reports.Blood_Tests.ThyroidPanel.TSH": TSH,
        "Lab_Reports.Blood_Tests.ThyroidPanel.TriiodothyronineFreeSerum": TriiodothyronineFreeSerum,
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "ThyroidPanel Report Uploaded",
            Patient: patient,
        })
    }).catch((error) => res.status(400).json(error.message))
}

const addLPReport = async (req, res) => {
    const { Name, File_Name, Latest_result, Avg_result, Status, Triglycerides, HDLCholesterol, LDLCholesterol, LDLHDLRatio, TotalCHOLHDL } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        "Lab_Reports.Blood_Tests.LipidPanel.Name": Name,
        "Lab_Reports.Blood_Tests.LipidPanel.File_Name": File_Name,
        "Lab_Reports.Blood_Tests.LipidPanel.TotalCholesterol.Latest_result": Latest_result,
        "Lab_Reports.Blood_Tests.LipidPanel.TotalCholesterol.Avg_result": Avg_result,
        "Lab_Reports.Blood_Tests.LipidPanel.TotalCholesterol.Status": Status,
        "Lab_Reports.Blood_Tests.LipidPanel.Triglycerides": Triglycerides,
        "Lab_Reports.Blood_Tests.LipidPanel.HDLCholesterol": HDLCholesterol,
        "Lab_Reports.Blood_Tests.LipidPanel.LDLCholesterol": LDLCholesterol,
        "Lab_Reports.Blood_Tests.LipidPanel.LDLHDLRatio": LDLHDLRatio,
        "Lab_Reports.Blood_Tests.LipidPanel.TotalCHOLHDL": TotalCHOLHDL,
    }, { upsert: true }).then(patient => {
        res.status(200).json({
            Message: "LipidPanel Report Uploaded",
            Patient: patient,
        })
    }).catch((error) => res.status(400).json(error.message))
}

const getasinglepatient = async (req, res) => {
    const { Email_id } = req.params
    const patient = await Patient.patient.findOne({
        "Profile.Personal.Email_id": Email_id
    })
    if (!patient) {
        res.status(400).json({
            Message: "Searching not successful",
            Error: "Patient not found"
        })
    } else {
        res.status(200).json(patient)
    }
}

const addLifestyle = async (req, res) => {
    const { Smoking, Alcohol, Activity, Food_Preference } = req.body
    const { Email_id } = req.params
    await Patient.patient.updateOne(
        {
            "Profile.Personal.Email_id": Email_id
        },
        {
            "Profile.Lifestyle.Smoking": Smoking,
            "Profile.Lifestyle.Alcohol": Alcohol,
            "Profile.Lifestyle.Activity": Activity,
            "Profile.Lifestyle.Food_Preference": Food_Preference,
        },
        {
            upsert: true
        },
    ).then(patient =>
        res.status(200).json({
            message: "Patient's data updated",
            patient: patient,
        })
    ).catch((error) => res.status(400).json({
        message: error.message
    })
    )
}

const key = 'otp-secret-key'

async function createOTP(params, callback) {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    })
    const ttl = 5 * 60 * 1000
    const expires = Date.now() + ttl
    const data1 = `${params.Contact_Number}.${otp}.${expires}`
    const hash = crypto.createHmac("sha256", key).update(data1).digest("hex")
    const fullhash = `${hash}.${expires}`
    console.log(`Your OTP is ${otp}`)
    //SEND SMS

    return callback(null, fullhash)
}

async function verifyOTP(params, callback) {
    let [hashValue, expires] = params.hash.split('.')
    let now = Date.now()
    if (now > parseInt(expires)) return callback("OTP Expired")
    let data2 = `${params.Contact_Number}.${params.otp}.${expires}`
    let newCalculateHash = crypto.createHmac("sha256", key).update(data2).digest("hex")
    if (newCalculateHash === hashValue)
        return callback(null, "Success")
    return callback("Invalid OTP")
}

const sendOTP = async (req, res, next) => {
    const { Email_id } = req.params
    try {
        const patient = await Patient.patient.findOne({
            "Profile.Personal.Email_id": Email_id
        })
        otpData = {
            "Contact_Number": patient.Profile.Personal.Contact_Number,
        }
        createOTP(otpData, (error, results) => {
            if (error) return next(error)
            return res.status(200).send({
                message: "Success",
                data: results
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

const verifyOtp = async (req, res, next) => {
    const { Email_id } = req.params
    const { OTP, Hash } = req.body
    try {
        const patient = await Patient.patient.findOne({
            "Profile.Personal.Email_id": Email_id
        })
        otpData = {
            "Contact_Number": patient.Profile.Personal.Contact_Number,
            "otp": OTP,
            "hash": Hash,
        }
        verifyOTP(otpData, (error, results) => {
            if (error) return next(error)
            return res.status(200).send({
                message: "Success",
                data: results
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

const addImaging = async (req, res) => {
    const { Email_id } = req.params
    const { Name, Date, Time, Doctor, Hospital } = req.body
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": Email_id,
    }, {
        Imaging: {
            Name: Name,
            Date: Date,
            Time: Time,
            Doctor: Doctor,
            Hospital: Hospital
        }
    }, { upsert: true }).then(patient => res.status(200).json({
        patient: patient,
        message: "Imaging data added"
    })).catch((error) => res.status(400).json({
        error: error
    }))
}

async function addItem(params, callback) {
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id": params.Email_id,
    }, {
        $push: {
            Cart: {
                ItemID: params.ItemID,
                MedName: params.MedName,
                Quantity: params.Quantity,
                Price: params.Price,
                Rating: params.Rating,
            }
        }
    }, { upsert: true }).then(patient => callback(null, patient))
}

const addItemtoCart = async (req, res, next) => {
    const { ItemID } = req.body
    const { Email_id } = req.params
    try {
        const item = await MedItem.medItems.findOne({
            ItemID: ItemID
        })
        console.log(Email_id)
        paramData = {
            "Email_id": Email_id,
            "ItemID": ItemID,
            "MedName": item.MedName,
            "Quantity": 1,
            "Price": item.Price,
            "Rating": item.Rating,
        }
        addItem(paramData, (error, results) => {
            if (error) return next(error)
            return res.status(200).send({
                message: "Success",
                data: results
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

const ChangeQuantity = async (req, res) => {
    const { ItemID, Quantity } = req.body
    const { Email_id } = req.params
    if (Quantity == 0) {
        await Patient.patient.updateOne({
            "Profile.Personal.Email_id": Email_id,
        }, {
            $pull: {
                Cart: {
                    ItemID: ItemID,
                }
            }
        }).then(patient => {
            res.status(200).json({
                Cart: patient
            })
        }).catch((err) => res.status(400).json(err))
    }
    else {
        await Patient.patient.updateOne(
            {
                "Profile.Personal.Email_id": Email_id,
                Cart: { $elemMatch: { ItemID: ItemID } }
            },
            { $set: { "Cart.$.Quantity": Quantity } }
        ).then(patient => {
            res.status(200).json({
                Cart: patient
            })
        })
    }
}

const clearCart = async (req, res) => {
    const { Email_id } = req.params;
    await Patient.patient
        .updateOne(
            {
                'Profile.Personal.Email_id': Email_id,
            },
            { Cart: [] }
        );
};

async function getBotResponse(param, callback) {
    // console.log(param.QueryMess)
    let data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": param.QueryMess,
            }
        ]
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        data: data
    };
    axios.request(config)
        .then(async (response) => {
            const ans = {
                "Reply": response.data.choices[0].message.content,
                "Time": param.Time
            }
            // console.log(JSON.stringify(response.data.choices[0].message.content));
            await Patient.patient.updateOne({
                "Profile.Personal.Email_id": param.Email_id,
            }, {
                $push: {
                    Chat: {
                        Date: param.Date,
                        Time: param.Time,
                        TextMessage: response.data.choices[0].message.content,
                        Sender: param.Sender,
                    }
                }
            }, { upsert: true }).then(patient => callback(null, ans, patient))
        })
        .catch((error) => {
            console.log(error)
        });
}

const UserMessageSent = async (req, res) => {
    var DATE = moment().format('L')
    var TIME = moment().format('LTS')
    var year = DATE.split('/')[2]
    var month = DATE.split('/')[0]
    var date = DATE.split('/')[1]
    var hour = TIME.split(':')[0]
    var minute = TIME.split(':')[1]
    var seconds = TIME.split(':')[2].split(' ')[0]
    const { Email_id } = req.params;
    const { TextMessage } = req.body;
    // console.log(TextMessage);
    try {
        await Patient.patient.updateOne({
            "Profile.Personal.Email_id": Email_id
        }, {
            $push: {
                Chat: {
                    Date: date + "/" + month + "/" + year,
                    Time: hour + ":" + minute + ":" + seconds,
                    TextMessage: TextMessage,
                    Sender: "User"
                }
            }
        }, { upsert: true }
        )
        var DATE = moment().format('L')
        var TIME = moment().format('LTS')
        var year = DATE.split('/')[2]
        var month = DATE.split('/')[0]
        var date = DATE.split('/')[1]
        var hour = TIME.split(':')[0]
        var minute = TIME.split(':')[1]
        var seconds = TIME.split(':')[2].split(' ')[0]
        paramData = {
            "Email_id": Email_id,
            "Date": date + "/" + month + "/" + year,
            "Time": hour + ":" + minute + ":" + seconds,
            "Sender": "Bot",
            "QueryMess": TextMessage,
        }
        // console.log(TextMessage)
        getBotResponse(paramData, (error, ans, results) => {
            if (error)
                return res.status(400).json({
                    message: "Fail",
                    data: results,
                    ans: ans
                })
            return res.status(200).send({
                message: "Success",
                data: results,
                ans: ans
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}



module.exports.UserMessageSent = UserMessageSent
module.exports.ChangeQuantity = ChangeQuantity
module.exports.addItemtoCart = addItemtoCart
module.exports.addImaging = addImaging
module.exports.changePassword = changePassword
module.exports.verifyOtp = verifyOtp
module.exports.sendOTP = sendOTP
module.exports.registerPatient = registerPatient
module.exports.loginPatient = loginPatient
// module.exports.onBoard1Patientupdate = onBoard1Patientupdate
// module.exports.onBoard2Patientadd = onBoard2Patientadd
module.exports.addmedications = addmedications
module.exports.getAllPatients = getAllPatients
module.exports.addHeartRateInfo = addHeartRateInfo
module.exports.addBloodPressureInfo = addBloodPressureInfo
module.exports.adddOxygenInfo = adddOxygenInfo
module.exports.addrespiratoryInfo = addrespiratoryInfo
module.exports.addTemperatureInfo = addTemperatureInfo
module.exports.addHaemoglobinInfo = addHaemoglobinInfo
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
module.exports.addBMPReport = addBMPReport
module.exports.addCMPReport = addCMPReport
module.exports.addTPReport = addTPReport
module.exports.addLPReport = addLPReport
module.exports.getasinglepatient = getasinglepatient
module.exports.addLifestyle = addLifestyle
module.exports.updatePatientProfilePersonal = updatePatientProfilePersonal
module.exports.updatePatientProfileMedical = updatePatientProfileMedical
module.exports.updatePatientProfileLifestyle = updatePatientProfileLifestyle
module.exports.adddoctors = adddoctors
module.exports.deleteApatient = deleteApatient
