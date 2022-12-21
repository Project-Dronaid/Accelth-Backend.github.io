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
        type: Number,
    },
    Weight:{
        type: Number,
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
    },
    Blindcondition: {
        type: String,
    },
    Vaccination:{
        type: String,
    },
    Currect_Medications:{
        type: String,
    },
    Chronic_Diseases: {
        type: String,
    }, 
    Injuries: {
        type: String,
    },
    Surgeries: {
        type: String,
    },
})

const LifeStyleProfileSchema = mongoose.Schema({
    Smoking:{
        type: String,
    },    
    Alcohol:{
        type: String,
    },
    Activity: {
        type: String,
    },
    Food_Preference: {
        type: String,
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
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const BloodPressureSchema = mongoose.Schema({
    Latest_result: {
        type: String,
    },
    Avg_result:{
        type: String,
    },
    Status:{
        type: String,
    }
})

const OxygenSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const RespiratorySchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const TemperatureSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const HaemoglobinSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const GlucoseSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const ThyroidSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const UreaNitrogenSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const ThyroxineSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const CholestrolSchema = mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result:{
        type: Number,
    },
    Status:{
        type: String,
    }
})

const CovidReportSchema = mongoose.Schema({
    Name:{
        type: String,
    },
    File_Name: {
        type: String,
    },
})

const DengueSchema = mongoose.Schema({
    Name:{
        type: String,
    },
    File_Name: {
        type: String,
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
    },
    Distance: {
        type: String,
    },
    Calories: {
        type: Number,
    },
    FatBurn: {
        type: String,
    },
    Cardio: {
        type: String,
    },
    Peak: {
        type: String,
    },
})

const GlucometerSchema= mongoose.Schema({
    Latest_result: {
        type: Number,
    },
    Avg_result: {
        type: Number,
    }
})

const RecoverySchema = mongoose.Schema({
    Expected: {
        type: String,
    },
    Actual: {
        type: String,
    }
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
                unique: true,
            },
            Date: {
                    type: String,
            },
            Time: {
                type: String,
            },
        }]
})


var patient = mongoose.model('patient',patientmongoschema)
module.exports.patient = patient