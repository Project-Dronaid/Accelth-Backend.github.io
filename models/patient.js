const mongoose = require('mongoose')
const PersonalProfileSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Contact_Number: {
        type: String,
        required: true,
    },
    Email_id: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        default: "Password",
        minlength: 8,
    },
    Gender: {
        type: String,
    },
    DateofBirth: {
        type: String,
    },
    Bloodgroup: {
        type: String,
    },
    Maritial_Status: {
        type: String,
        default: "Not Defined"
    },
    Height: {
        type: String,
    },
    Weight: {
        type: String,
    },
    Emergency_contact: {
        type: String,
    },
    Address: {
        type: String,
        default: "Add your address"
    },
})

const MedicalProfileSchema = mongoose.Schema({
    Allergies: {
        type: String,
        default: "add allergies"
    },
    Blindcondition: {
        type: String,
        default: "add blind condition"
    },
    Vaccination: {
        type: String,
        default: "add vaccination history"
    },
    Currect_Medications: {
        type: String,
        default: "add current medications"
    },
    Chronic_Diseases: {
        type: String,
        default: "add chronic disease history"
    },
    Injuries: {
        type: String,
        default: "add injuries"
    },
    Surgeries: {
        type: String,
        default: "add surgical history"
    },
})

const LifeStyleProfileSchema = mongoose.Schema({
    Smoking: {
        type: String,
        default: "add smoking frequency"
    },
    Alcohol: {
        type: String,
        default: "add alcohol frequency"
    },
    Activity: {
        type: String,
        default: "add physical activity "
    },
    Food_Preference: {
        type: String,
        default: "add food choice"
    },
})
const ProfilePatientSchema = mongoose.Schema({
    Personal: PersonalProfileSchema,
    Medical: MedicalProfileSchema,
    Lifestyle: LifeStyleProfileSchema,
})
const MealPlanMedicationSchema = mongoose.Schema({
    Dose1: {
        type: String,
        default: ""
    },
    Dose2: {
        type: String,
        default: ""
    },
    Dose3: {
        type: String,
        default: ""
    }
})

const HeartRateSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const BloodPressureSchema = mongoose.Schema({
    Latest_result: {
        type: String,
        default: "0/0"
    },
    Avg_result: {
        type: String,
        default: "0/0"
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const OxygenSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const RespiratorySchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const TemperatureSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const HaemoglobinSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const GlucoseSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const ThyroidSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const UreaNitrogenSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const ThyroxineSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const CholestrolSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: "UNKNOWN"
    }
})

const CovidReportSchema = mongoose.Schema({
    Name: {
        type: String,
        default: "COVID-19 Report"
    },
    File_Name: {
        type: String,
        default: "https://gnh671x702.execute-api.us-west-2.amazonaws.com/file/fileshow/folder.png"
    },
})

const DengueSchema = mongoose.Schema({
    Name: {
        type: String,
        default: "Dengue Report"
    },
    File_Name: {
        type: String,
        default: "https://gnh671x702.execute-api.us-west-2.amazonaws.com/file/fileshow/folder.png"
    },
})

const CBCSchema = mongoose.Schema({
    Name: {
        type: String,
        default: ""
    },
    File_Name: {
        type: String,
        default: ""
    },
    WBC: {
        type: Number,
        default: 0,
    },
    RBC: {
        type: Number,
        default: 0,
    },
    Haemoglobin: HaemoglobinSchema,
    Haematocrit: {
        type: Number,
        default: 0
    },
    MCV: {
        type: Number,
        default: 0
    },
    MCHC: {
        type: Number,
        default: 0
    },
    RDW: {
        type: Number,
        default: 0
    },
    Platelets: {
        type: Number,
        default: 0
    },
    Neutrophils: {
        type: Number,
        default: 0
    },
    Lymphs: {
        type: Number,
        default: 0
    },
    Monocytes: {
        type: Number,
        default: 0
    },
    EOS: {
        type: Number,
        default: 0
    },
    Basos: {
        type: Number,
        default: 0
    },
})

const Basic_Metabolic_PanelSchema = mongoose.Schema({
    Name: {
        type: String,
        default: ""
    },
    File_Name: {
        type: String,
        default: ""
    },
    Glucose: GlucoseSchema,
    UreaNitrogen: {
        type: Number,
        default: 0
    },
    Creatine: {
        type: Number,
        default: 0
    },
    Sodium: {
        type: Number,
        default: 0
    },
    Potassium: {
        type: Number,
        default: 0
    },
    Chlorine: {
        type: Number,
        default: 0
    },
    Carbon_Dioxide: {
        type: Number,
        default: 0
    },
    Calcium: {
        type: Number,
        default: 0
    }
})

const Comprehensive_MPschema = mongoose.Schema({
    Name: {
        type: String,
        default: ""
    },
    File_Name: {
        type: String,
        default: ""
    },
    UreaNitrogen: UreaNitrogenSchema,
    Creatine: {
        type: Number,
        default: 0
    },
    Sodium: {
        type: Number,
        default: 0
    },
    Potassium: {
        type: Number,
        default: 0
    },

    Chlorine: {
        type: Number,
        default: 0
    },

    Carbon_Dioxide: {
        type: Number,
        default: 0
    },

    Calcium: {
        type: Number,
        default: 0
    },

    Protein: {
        type: Number,
        default: 0
    },

    Albumin: {
        type: Number,
        default: 0
    },
    Globulin: {
        type: Number,
        default: 0
    },
    AG_Ratio: {
        type: Number,
        default: 0
    },
    Bilirubin: {
        type: Number,
        default: 0
    },
    AlkalinePhosphate: {
        type: String,
        default: ""
    },
    AST: {
        type: String,
        default: ""
    },
    ALT: {
        type: String,
        default: ""
    },
})

const ThyroidPanelSchema = mongoose.Schema({
    Name: {
        type: String,
        default: ""
    },
    File_Name: {
        type: String,
        default: ""
    },
    Thyroxine: ThyroxineSchema,
    T3Uptake: {
        type: Number,
        default: 0
    },
    FreeThyroxineIndex: {
        type: Number,
        default: 0
    },
    ThyroxineT4FreeDirect: {
        type: Number,
        default: 0
    },
    TSH: {
        type: Number,
        default: 0
    },
    TriiodothyronineFreeSerum: {
        type: Number,
        default: 0
    },
})

const LipidPanelSchema = mongoose.Schema({
    Name: {
        type: String,
        default: ""
    },
    File_Name: {
        type: String,
        default: ""
    },
    TotalCholesterol: CholestrolSchema,
    Triglycerides: {
        type: Number,
        default: 0
    },
    HDLCholesterol: {
        type: Number,
        default: 0
    },
    LDLCholesterol: {
        type: Number,
        default: 0
    },
    LDLHDLRatio: {
        type: Number,
        default: 0
    },
    TotalCHOLHDL: {
        type: Number,
        default: 0
    },
})
const DiagnosticTestsSchema = mongoose.Schema({
    Covid: CovidReportSchema,
    Dengue: DengueSchema,
})
const BloodTestSchema = mongoose.Schema({
    CBC: CBCSchema,
    Basic_Metabolic_Panel: Basic_Metabolic_PanelSchema,
    Comprehensive_Metabolic_Panel: Comprehensive_MPschema,
    ThyroidPanel: ThyroidPanelSchema,
    LipidPanel: LipidPanelSchema,
})

const FitBitSchema = mongoose.Schema({
    NumberofSteps: {
        type: Number,
        default: 0,
    },
    Distance: {
        type: String,
        default: "0 km"
    },
    Calories: {
        type: Number,
        default: 0,
    },
    FatBurn: {
        type: String,
        default: "115-132 BPM"
    },
    Cardio: {
        type: String,
        default: "0 BPM"
    },
    Peak: {
        type: String,
        default: "0 BPM"
    },
})

const GlucometerSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result: {
        type: Number,
        default: 0
    }
})

const RecoverySchema = mongoose.Schema({
    Expected: {
        type: String,
        default: "0 days"
    },
    Actual: {
        type: String,
        default: "0 days"
    }
})

const appointmentSchema = mongoose.Schema({
    AppointmentID: {
        type: String,
    },
    DoctorID: {
        type: String,
    },
    PatientID: {
        type: String,
    },
    Date: {
        type: String,
    },
    Time: {
        type: String,
    },
    AppointmentType: {
        type: String,
    },
    Name: {
        type: String,
    },
    Age: {
        type: String,
    },
    Gender: {
        type: String,
    },
    Issue: {
        type: String,
    },
    Status: {
        type: String,
    },
})

const patientmongoschema = mongoose.Schema({
    Profile: ProfilePatientSchema,
    Ongoing_Treatment: {
        type: String,
        default: "N.A"
    },
    Treatment_Plan: {
        type: String,
        default: "N.A",
    },
    Medications: [{
        Name: {
            type: String,
            default: ""
        },
        Start_Date: {
            type: String,
            default: ""
        },
        End_Date: {
            type: String,
            default: ""
        },
        Meal_Plan: MealPlanMedicationSchema
    }],
    Vitals: {
        HeartRate: HeartRateSchema,
        BloodPressure: BloodPressureSchema,
        Oxygen: OxygenSchema,
        Respiratory: RespiratorySchema,
        Temperature: TemperatureSchema,
        Haemoglobin: HaemoglobinSchema,
        Glucose: GlucoseSchema,
        Thyroid: ThyroidSchema,
    },
    Lab_Reports: {
        Diagnostic_Test: DiagnosticTestsSchema,
        Blood_Tests: BloodTestSchema,
    },
    Medical_Device: {
        Fitbit: FitBitSchema,
        Glucometer: GlucometerSchema,
    },
    Wallet_Balance: {
        type: Number,
        default: "0",
    },
    Issues: [
        {
            Status: {
                type: String,
                default: ""
            },
            Info: {
                type: String,
                default: ""
            },
            Date: {
                type: String,
                default: ""
            },
            Time: {
                type: String,
                default: ""
            },
            Doc_Name: {
                type: String,
                default: ""
            },
            Hospital: {
                type: String,
                default: ""
            },
            Problem: {
                type: String,
                default: ""
            },
            Treatment_Plan: {
                type: String,
                default: ""
            },
            Diagnosis: {
                type: String,
                default: ""
            },
            Followup: {
                type: String,
                default: ""
            },
            Recovery: RecoverySchema,
        }],
    Visits: [{
        Year: {
            type: String,
        },
        Date: {
            type: String,
        },
        Issue: {
            type: String,
        },
        Doctor: {
            type: String,
        },
        Post: {
            type: String,
        },
    }],
    Hospitalization: [{
        Year: {
            type: String,
            default: ""
        },
        Date: {
            type: String,
            default: ""
        },
        Reason: {
            type: String,
            default: ""
        },
        Doctor: {
            type: String,
            default: ""
        },
        Post: {
            type: String,
            default: ""
        },
        Hospital: {
            type: String,
            default: ""
        },
    }],
    Orders: [{
        OrderID: {
            type: String,
            default: ""
        },
        Date: {
            type: String,
            default: ""
        },
        Time: {
            type: String,
            default: ""
        },
        CartItems: [{
            ItemID: {
                type: String,
                required: true
            },
            MedName: {
                type: String,
            },
            Quantity: {
                type: Number,
                required: true
            }
        }],
        InvoiceFilename: {
            type: String,
            default: "",
        },
        TotalAmount: {
            type: Number,
            default: 0
        },
        Address: {
            type: String,
            default: ""
        },
        DroneID: {
            type: String,
            default: ""
        },
        DeliveredDate: {
            type: String,
            default: ""
        },
        DeliveredTime: {
            type: String,
            default: ""
        },
        Status: {
            type: String,
            default: ""
        },
    }],
    Imaging: {
        Name: {
            type: String,
            default: ""
        },
        Date: {
            type: String,
            default: ""
        },
        Time: {
            type: String,
            default: ""
        },
        Doctor: {
            type: String,
            default: ""
        },
        Hospital: {
            type: String,
            default: ""
        },
        Filename: {
            type: String,
            default: ""
        },
    },
    Cart: {
        type: [
            {
                ItemID: {
                    type: String,
                    required: true,
                },
                MedName: {
                    type: String
                },
                Quantity: {
                    type: Number
                },
                Price: {
                    type: Number
                },
                Rating: {
                    type: Number,
                }
            }
        ],
        default: []
    },
    Chat: {
        type: [
            {
                Date: {
                    type: String
                },
                Time: {
                    type: String,
                },
                TextMessage: {
                    type: String,
                    required: true,
                },
                Sender: {
                    type: String,
                }
            }
        ],
        default: []
    }
})


var patient = mongoose.model('patient', patientmongoschema)
module.exports.patient = patient
