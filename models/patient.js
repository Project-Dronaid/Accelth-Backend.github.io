const mongoose = require('mongoose')
const PersonalProfileSchema = mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    Contact_Number:{
        type: String,
        required : true,
    },
    Email_id: {
        type: String,
        required : true,
        unique: true,
    },
    Password:{
        type: String,
        required : true,
        default: "Password",
        minlength: 8,
    },
    Gender:{
        type: String,
    },  
    DateofBirth: {
        type: String,
    },    
    Bloodgroup:{
        type: String,
    },
    Maritial_Status:{
        type: String,
        default: "Not Defined"
    },
    Height: {
        type: String,
    },
    Weight:{
        type: String,
    },
    Emergency_contact:{
        type: String,
    },
    Address: {
        type: String,
    },
})

const MedicalProfileSchema = mongoose.Schema({
    Allergies:{
        type: String,
        default: "add allergies"
    },
    Blindcondition: {
        type: String,
        default:""
    },
    Vaccination:{
        type: String,
        default:"add vaccination history"
    },
    Currect_Medications:{
        type: String,
        default:"add current medications"
    },
    Chronic_Diseases: {
        type: String,
        default:"add chronic disease history"
    }, 
    Injuries: {
        type: String,
        default:"add injuries"
    },
    Surgeries: {
        type: String,
        default:"add surgical history"
    },
})

const LifeStyleProfileSchema = mongoose.Schema({
    Smoking:{
        type: String,
        default:"add smoking frequency"
    },    
    Alcohol:{
        type: String,
        default:"add alcohol frequency"
    },
    Activity: {
        type: String,
        default:"add physical activity "
    },
    Food_Preference: {
        type: String,
        default:"add food choice "
    },
})
const ProfilePatientSchema = mongoose.Schema({
    Personal: PersonalProfileSchema,
    Medical: MedicalProfileSchema,
    Lifestyle: LifeStyleProfileSchema,
})
const MealPlanMedicationSchema = mongoose.Schema({
    Dose1:{
        type: String,
    },
    Dose2:{
        type: String,
    },
    Dose3:{
        type: String,
    }
})

const HeartRateSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default: 0
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const BloodPressureSchema = mongoose.Schema({
    Latest_result: {
        type: String,
        default: "0/0"
    },
    Avg_result:{
        type: String,
        default: "0/0"
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const OxygenSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default:0
    },
    Status:{
        type: String,
        default:"UNKNOWN"
    }
})

const RespiratorySchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default:0
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const TemperatureSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default:0
    },
    Avg_result:{
        type: Number,
        default:0
    },
    Status:{
        type: String,
        default:"UNKNOWN"
    }
})

const HaemoglobinSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default: 0
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const GlucoseSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default: 0
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const ThyroidSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default: 0
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const UreaNitrogenSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default: 0
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const ThyroxineSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default: 0
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const CholestrolSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
        default: 0
    },
    Avg_result:{
        type: Number,
        default: 0
    },
    Status:{
        type: String,
        default: "UNKNOWN"
    }
})

const CovidReportSchema = mongoose.Schema({
    Name:{
        type: String,
        default: "COVID-19 Report"
    },
    File_Name: {
        type: String,
        default: "https://gnh671x702.execute-api.us-west-2.amazonaws.com/file/fileshow/folder.png"
    },
})

const DengueSchema = mongoose.Schema({
    Name:{
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
    },       
    File_Name:{         
        type: String,
    },          
    WBC:{   
        type: Number,                
    },          
    RBC: {  
        type: Number,         
    },
    Haemoglobin: HaemoglobinSchema,          
    Haematocrit: {               
        type: Number,
    },          
    MCV: {
        type: Number,
    },         
    MCHC: {
        type: Number,
    },          
    RDW: {
        type: Number,
    },                
    Platelets: {
        type: Number,  
    },
    Neutrophils : {
        type: Number,
    },
    Lymphs: {
        type: Number,
    },
    Monocytes:{
        type: Number,
    },
    EOS: {
        type: Number,
    },    
    Basos :{
        type: Number,
    },
})

const Basic_Metabolic_PanelSchema = mongoose.Schema({
    Name:{
        type: String,
    },              
    File_Name:{
        type: String,
    },
    Glucose:GlucoseSchema,
    UreaNitrogen:{
        type: Number,
    },
    Creatine:{
        type: Number,
    },
    Sodium:{
        type: Number,
    },
    Potassium: {
        type: Number,
    },
    Chlorine: {
        type: Number,
    },
    Carbon_Dioxide: {
        type: Number,
    },
    Calcium:{
        type: Number,
    }
})

const Comprehensive_MPschema = mongoose.Schema({
    Name: {
        type: String,
    },                    
    File_Name: {
        type: String,
    },
    UreaNitrogen: UreaNitrogenSchema,                                                            
    Creatine:{
        type: Number,
    },
    Sodium: {
        type: Number,
    },
    Potassium:{
        type: Number,
    },
    
    Chlorine: {
        type: Number,
    },
    
    Carbon_Dioxide: {
        type: Number,
    },
    
    Calcium: {
        type: Number,
    },
    
    Protein: {
        type: Number,
    },
    Albumin: {
        type: Number,
    },
    Globulin: {
        type: Number,
    },
    AG_Ratio: {
        type: Number,
    },
    Bilirubin: {
        type: Number,
    },
    AlkalinePhosphate: {
        type: String,
    },
    AST: {
        type: String,
    },
    ALT: {
        type: String,
    },
})

const ThyroidPanelSchema = mongoose.Schema({
    Name:  {
        type: String,
    },
    File_Name:  {
        type: String,
    },
    Thyroxine: ThyroxineSchema,
    T3Uptake: {
        type: Number,
    },
    FreeThyroxineIndex: {
        type: Number,
    },
    ThyroxineT4FreeDirect: {
        type: Number,
    },
    TSH: {
        type: Number,
    },
    TriiodothyronineFreeSerum: {
        type: Number,
    },
})

const LipidPanelSchema = mongoose.Schema({
    Name:{
        type: String,
    },
    File_Name: {
        type: String,
    },
    TotalCholesterol: CholestrolSchema,
    Triglycerides: {
        type: Number,
    },
    HDLCholesterol:{
        type: Number,
    },
    LDLCholesterol:{
        type: Number,
    },
    LDLHDLRatio: {
        type: Number,
    },
    TotalCHOLHDL: {
        type: Number,
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
    ThyroidPanel:ThyroidPanelSchema,
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

const GlucometerSchema= mongoose.Schema({
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
    AppointmentID:{
        type: String,
    },
    DoctorID:{
        type: String,
    },
    PatientID:{
        type: String,
    },
    Date:{
        type: String,
    },
    Time:{
        type: String,
    },
    AppointmentType:{
        type: String,
    },
    Name:{
        type: String,
    },
    Age:{
        type: String,
    },
    Gender:{
        type: String,
    },
    Issue:{
        type: String,
    },
    Status:{
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
        },
        Start_Date:{
            type: String,
        },
        End_Date:{
            type: String,
        },
        Meal_Plan: MealPlanMedicationSchema
    }],
    Vitals: {
        HeartRate: HeartRateSchema,
        BloodPressure: BloodPressureSchema,
        Oxygen:OxygenSchema,
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
        Status:{
            type: String,
        },
        Info:{
            type: String, 
        }, 
        Date: {
            type: String,
        }, 
        Time: {
            type: String,
        },
        Doc_Name: {
            type: String,
        },
        Hospital: {
            type: String,
        },
        Problem: {
            type: String,
        },
        Treatment_Plan: {
            type: String,
        },
        Diagnosis: {
            type: String,
        },
        Followup: {
            type: String,
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
        }, 
        Date: {
            type: String,
        },
        Reason: {
            type: String,
        },
        Doctor: {
            type: String,
        },
        Hospital: {
            type: String,
        },
    }],
    Orders:[{
            OrderID: {
                type: String,
            },
            Date: {
                    type: String,
            },
            Time: {
                type: String,
            },
            CartItems: [{
                ItemID: {
                    type: String,
                    required:true
                },
                MedName: {
                    type: String,
                },
                Quantity:{
                    type: Number,
                    default:1
                }
            }],
            InvoiceFilename:{
                type:String,
                default: "",
            },
            TotalAmount: Number,
            Address: String,
            DroneID: String,
            DeliveredDate: String,
            DeliveredTime: String,
            Status: String,
        }],
    Imaging: {
        Name: String,
        Date: String,
        Time: String,
        Doctor: String,
        Hospital: String,
        Filename: String,
    },
    Cart:[{
        ItemID: {
            type: String,
        },
        MedName:{
            type: String
        },
        Quantity:{
            type: Number
        },
        Price:{
            type: Number
        }
    }],
})


var patient = mongoose.model('patient',patientmongoschema)
module.exports.patient = patient
