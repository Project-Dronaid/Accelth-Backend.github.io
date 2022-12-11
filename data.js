Patient: {
    Profile: {
        Personal: {
            Name: "Mr. Rahul Ranjan";
            Contact_Number: "+91-9988263889";
            Email_id:"rahulranjan@gmail.com";
            Gender: "Male";
            DOB: "08/05/1995";
            Bloodgroup: "B+";
            Maritial_Status: "Unmarried";
            Height: "182 cm";
            Weight: "83 Kgs";
            Emergency_contact:"+91-8993648428";
            Address: "4/1, Tumkur Rd, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022";

        }
        Medical: {
            Allergies: null;
            Vaccination: null;
            Currect_Medications: null;
            Chronic_Diseases: null;
            Injuries: null;
            Surgeries: null;
        }
        Lifestyle:{
            Smoking: null;
            Alcohol: null;
            Activity: null;
            Food_Preference: null;
        }
    }
    Ongoing_Treatment: "COVID";
    Treatment_Plan : "COVID 19 (CT-22)";
    Medications: {
        [
            {
                Name: "Tab Azee 500mg",
                Start_Date: "01/10/22",
                End_Date:"08/10/22",
                Meal_Plan:{
                    Dose1: "Before_Meal",
                    Dose2: "Breakfast",
                }
            },
            {
                Name: "Tab HCQS 200mg",
                Start_Date: "01/10/22",
                End_Date:"08/10/22",
                Meal_Plan:{
                    Dose1: "After_Meal",
                    Dose2: "Breakfast",
                    Dose3: "Dinner",
                }
            },
            {
                Name: "Tab Cheston Cold Total",
                Start_Date: "01/10/22",
                End_Date:"08/10/22",
                Meal_Plan:{
                    Dose1: "Before_Meal",
                    Dose2: "Breakfast",
                }
            },
            {
                Name: "CAP A TO Z",
                Start_Date: "01/10/22",
                End_Date:"08/10/22",
                Meal_Plan:{
                    Dose1: "After_Meal",
                    Dose2: "Dinner",
                }
            },

        ]; 
    }
    Vitals:{
        HearRate: {
            Latest_result: "80 BPM";
            Avg_result: "78 BPM";
            Status: "NORMAL";
        }
        BloodPressure:{
            Latest_result: "125/85 mmHg";
            Avg_result: "118/85 mmHg";
            Status: "CONCERN";
        }
        Oxygen :{
            Latest_result: "95%";
            Avg_result: "96%";
            Status: "NORMAL";
        }
        Respiratory: {
            Latest_result: "20 BPM";
            Avg_result: "18 BPM"
            Status: "CONCERN";
        }
        Temperature:{
            Latest_result: "103 F";
            Avg_result: "110 F";
            Status: "CONCERN";
        }
        Haemoglobin:{
            Latest_result: "14 gm/dL";
            Avg_result: "13.37 gm/dL";
            Status: "NORMAL";
        }
        Glucose: {
            Latest_result: "145 gm/dL";
            Avg_result: "125 gm/dL";
            Status: "CONCERN";
        }
        Thyroid :{
            Latest_result: null;
            Avg_result: null;
            Status: "NORMAL";
        }
        Blood_Pressure:{
            Latest_result: null;
            Avg_result: null;
            Status: "CONCERN";
        }

    }
    Lab_Reports: {
        [
                {
                    Name: "COVID-19 Report",
                    File_Name: null,
                    Type: Diagnostic,
                },
                {
                    Name: "Dengue Report",
                    File_Name: null,
                    Type: Diagnostic,
                },
                {
                    Name: "CBC",
                    File_Name: null,
                    WBC: "5.7",
                    RBC: "5.27",
                    Haemoglobin: {
                        Latest_result: "14",
                        Avg_result: "13.37",
                        Status: "NORMAL"
                    },
                    Haematocrit: "44.1",
                    MCV: "84",
                    MCHC: "34.9",
                    RDW: "13.7",
                    Platelets: "268",
                    Neutrophils : "47",
                    Lymphs: "46",
                    Monocytes: "6",
                    EOS: "1",
                    Basos : "0"
                },
                {
                    Name: "Basic Metabolic Panel",
                    File_Name: null,
                    Glucose: {
                        Latest_result: "115",
                        AbortSignal: "110",
                        Status: "CONCERN",
                    },
                    UreaNitrogen: "16",
                    Creatine: "0.99",
                    Sodium: "132",
                    Potassium: "4.8",
                    Chlorine: "93",
                    Carbon_Dioxide: "21",
                    Calcium:"8.9",
                },
                {
                    Name: "Comprehensive MP",
                    File_Name: null,
                    UreaNitrogen:{
                        Latest_result: "16",
                        Avg_result: "18",
                        Status: "NORMAL",
                    },
                    Creatine: "0.99",
                    Sodium: "132",
                    Potassium: "4.8",
                    Chlorine: "93",
                    Carbon_Dioxide: "21",
                    Calcium: "8.9",
                    Protein: "7.6",
                    Albumin: "4.7",
                    Globulin: "2.9",
                    AG_Ratio: "1.6",
                    Bilirubin: "0.7",
                    AlkalinePhosphate: "39L",
                    AST: "43H",
                    ALT: "88H",
                },
                {
                    Name: "Thyroid Panel",
                    File_Name: null,
                    Thyroxine: {
                        Latest_result: "7.2",
                        Avg_result: "7.6",
                        Status: "NORMAL"
                    },
                    T3Uptake: "28",
                    FreeThyroxineIndex: "2.1",
                    ThyroxineT4FreeDirect: "1.31",
                    TSH: "2.680",
                    TriiodothyronineFreeSerum: "2.9"
                },
                {
                    Name: "Lipid Panel",
                    File_Name: null,
                    TotalCholesterol: {
                        Latest_result: "244",
                        Avg_result: "220",
                        Status: "CONCERN"
                    },
                    Triglycerides: "242",
                    HDLCholesterol: "48",
                    LDLCholesterol: "148",
                    LDLHDLRatio: "3",
                    TotalCHOLHDL: "5",
                }
        ];
    }
    Medical_Device:{
        Fitbit:{
            NumberofSteps: "7248";
            Distance: "4.2 km";
            Calories: "368";
            FatBurn: "115-132 BPM";
            Cardio: "133-156 BPM";
            Peak: "157+ BPM";
        }
        Glucometer: {
            Latest_result: "145 gm/dL";
            Avg_result: "125 gm/dL";
        }
    }
    Wallet_Balance: "250";
    Issues: {
        [ 
            {
                Status: "ONGOING",
                Info: "COVID",
                Date: "10/10/2022",
                Time: "12:56 PM",
                Doc_Name: "Dr. Nitin Dongri",
                Hospital: "City Hospital, Medical Hospital",
                Problem: "Had fever and body ache 2 days ago, now it has turned into sore troat and cold.",
                Treatment_Plan: "COVID-19 (CT-22)",
                Diagnosis: "COVID-19, Virus identified (09 Oct, 2022)",
                Followup: "2 Weeks",
                Recovery: {
                    Expected: "21 days",
                    Actual: "25 days"
                }
            },
            {
                Status: "CURED",
                Info: "Shoulder Dislocated",
                Date: "10/10/2022",
                Time: "12:56 PM",
                Doc_Name: "Dr. Nitin Dongri",
                Hospital: "City Hospital, Medical Hospital",
                Problem: "Recent trauma to the arm- Fell onto an outstretched arm from a standing position Pain, swelling, bruising at or around the elbow Limited motion at the elbow",
                Treatment_Plan: "Surgical treatment: Open Reduction and Internal Fixation Surgery",
                Diagnosis: "Olecranon fracture- Displaced Elbow",
                Followup: "6 months",
                Recovery: {
                   Expected: "6 months",
                   Actual : "5 months 20 days",
                }
            }
        ];
    } 
    Visits: {
        [
            {
                Year: "2022",
                Date: "10/10/2022",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            {
                Year: "2022",
                Date: "05/09/2022",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            {
                Year: "2022",
                Date: "17/01/2022",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            {
                Year: "2021",
                Date: "26/07/2021",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            {
                Year: "2020",
                Date: "15/12/2020",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            {
                Year: "2020",
                Date: "25/09/2020",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            {
                Year: "2019",
                Date: "09/10/2019",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            {
                Year: "2019",
                Date: "25/05/2019",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            {
                Year: "2018",
                Date: "10/06/2018",
                Issue: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Post: "M.B.B.S, M.D"
            },
            
        ];
    }
    Hospitalization: {
        [
            {
                Year: "2022",
                Date: "10/10/2022",
                Reason: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Hospital: "City Hospital"
            },
            {
                Year: "2022",
                Date: "17/01/2022",
                Reason: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Hospital: "City Hospital"
            },
            {
                Year: "2020",
                Date: "25/09/2020",
                Reason: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Hospital: "City Hospital"
            },
            {
                Year: "2019",
                Date: "25/05/2019",
                Reason: "COVID 19 detected",
                Doctor: "Dr. Nitin Dongri",
                Hospital: "City Hospital"
            },
        ];
    }
    Orders:{
        [
            {
                OrderID:"758619387409",
                Date: "12/11/2022",
                Time: "5:30 AM",
            },
            {
                OrderID:"758619387409",
                Date: "12/11/2022",
                Time: "5:30 AM",
            },
            {
                OrderID:"758619387409",
                Date: "12/11/2022",
                Time: "5:30 AM",
            },
            {
                OrderID:"758619387409",
                Date: "12/11/2022",
                Time: "5:30 AM",
            },
            {
                OrderID:"758619387409",
                Date: "12/11/2022",
                Time: "5:30 AM",
            },
            {
                OrderID:"758619387409",
                Date: "12/11/2022",
                Time: "5:30 AM",
            },
        ];
    }
}

Doctors: {
    Name: "Dr. Nitin Dongri";
    Degree: "M.B.B.S, MD";
    Specs: "OPD Consultation";
    Hospital: "City Hospital, Medical Hospital"
}

MedicinesToBeSold: {
    [
        {
            Name: "Ibuprofen 200mg",
            Manufacture: "Jagsonpal Pharmaceuticals Ltd.",
            Contains: "Ibuprofen",
            Description: "Ibuprofen (Jagsonpal) 200 MG Tablet is a non-steroidal anti-inflammatory medicine, which is used to relieve pain associated with osteoarthritis, rheumatoid arthritis, menstrual cramps (dysmenorrhea), muscle aches, headache, back pain, dental pain, etc. It is also used to treat mild-to-moderate fever. Do not take this medicine if you have any bleeding disorder or asthma or a known allergy to this medicine. This medicine is not recommended for use children below 12 years of age.",
            Substitutes: ["Ibugesic 200 MG Tablet", "Cipla Ltd.", "Ibuprofen (Cadilla) 200 MG Tablet", "Cadilla Pharmaceuticals Ltd.", "Ibutas 200 MG Tablet", "Intas Pharmaceuticals Ltd.", "Sugafen 200 MG Tablet"],
            SideEffects: "",
            Uses: "",
            Concerns: "",
            Warnings: "",
        },
        {
            Name: "Ibuprofen 200mg",
            Manufacture: "Jagsonpal Pharmaceuticals Ltd.",
            Contains: "Ibuprofen",
            Description: "Ibuprofen (Jagsonpal) 200 MG Tablet is a non-steroidal anti-inflammatory medicine, which is used to relieve pain associated with osteoarthritis, rheumatoid arthritis, menstrual cramps (dysmenorrhea), muscle aches, headache, back pain, dental pain, etc. It is also used to treat mild-to-moderate fever. Do not take this medicine if you have any bleeding disorder or asthma or a known allergy to this medicine. This medicine is not recommended for use children below 12 years of age.",
            Substitutes: ["Ibugesic 200 MG Tablet", "Cipla Ltd.", "Ibuprofen (Cadilla) 200 MG Tablet", "Cadilla Pharmaceuticals Ltd.", "Ibutas 200 MG Tablet", "Intas Pharmaceuticals Ltd.", "Sugafen 200 MG Tablet"],
            SideEffects: "",
            Uses: "",
            Concerns: "",
            Warnings: "",
        },
        {
            Name: "Ibuprofen 200mg",
            Manufacture: "Jagsonpal Pharmaceuticals Ltd.",
            Contains: "Ibuprofen",
            Description: "Ibuprofen (Jagsonpal) 200 MG Tablet is a non-steroidal anti-inflammatory medicine, which is used to relieve pain associated with osteoarthritis, rheumatoid arthritis, menstrual cramps (dysmenorrhea), muscle aches, headache, back pain, dental pain, etc. It is also used to treat mild-to-moderate fever. Do not take this medicine if you have any bleeding disorder or asthma or a known allergy to this medicine. This medicine is not recommended for use children below 12 years of age.",
            Substitutes: ["Ibugesic 200 MG Tablet", "Cipla Ltd.", "Ibuprofen (Cadilla) 200 MG Tablet", "Cadilla Pharmaceuticals Ltd.", "Ibutas 200 MG Tablet", "Intas Pharmaceuticals Ltd.", "Sugafen 200 MG Tablet"],
            SideEffects: "",
            Uses: "",
            Concerns: "",
            Warnings: "",
        },
        {
            Name: "Ibuprofen 200mg",
            Manufacture: "Jagsonpal Pharmaceuticals Ltd.",
            Contains: "Ibuprofen",
            Description: "Ibuprofen (Jagsonpal) 200 MG Tablet is a non-steroidal anti-inflammatory medicine, which is used to relieve pain associated with osteoarthritis, rheumatoid arthritis, menstrual cramps (dysmenorrhea), muscle aches, headache, back pain, dental pain, etc. It is also used to treat mild-to-moderate fever. Do not take this medicine if you have any bleeding disorder or asthma or a known allergy to this medicine. This medicine is not recommended for use children below 12 years of age.",
            Substitutes: ["Ibugesic 200 MG Tablet", "Cipla Ltd.", "Ibuprofen (Cadilla) 200 MG Tablet", "Cadilla Pharmaceuticals Ltd.", "Ibutas 200 MG Tablet", "Intas Pharmaceuticals Ltd.", "Sugafen 200 MG Tablet"],
            SideEffects: "",
            Uses: "",
            Concerns: "",
            Warnings: "",
        },
        {
            Name: "Ibuprofen 200mg",
            Manufacture: "Jagsonpal Pharmaceuticals Ltd.",
            Contains: "Ibuprofen",
            Description: "Ibuprofen (Jagsonpal) 200 MG Tablet is a non-steroidal anti-inflammatory medicine, which is used to relieve pain associated with osteoarthritis, rheumatoid arthritis, menstrual cramps (dysmenorrhea), muscle aches, headache, back pain, dental pain, etc. It is also used to treat mild-to-moderate fever. Do not take this medicine if you have any bleeding disorder or asthma or a known allergy to this medicine. This medicine is not recommended for use children below 12 years of age.",
            Substitutes: ["Ibugesic 200 MG Tablet", "Cipla Ltd.", "Ibuprofen (Cadilla) 200 MG Tablet", "Cadilla Pharmaceuticals Ltd.", "Ibutas 200 MG Tablet", "Intas Pharmaceuticals Ltd.", "Sugafen 200 MG Tablet"],
            SideEffects: "",
            Uses: "",
            Concerns: "",
            Warnings: "",
        },
    ];
}

Hospitals: {
    [
        {
            Lat: "",
            Lon: "",
            Name: "City Hospitals",
            Type: "OPD Consultation",
            Address: "4/1, Tumkur Rd, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022"
        },
        {
            Lat: "",
            Lon: "",
            Name: "City Hospitals",
            Type: "OPD Consultation",
            Address: "4/1, Tumkur Rd, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022"
        },
        {
            Lat: "",
            Lon: "",
            Name: "City Hospitals",
            Type: "OPD Consultation",
            Address: "4/1, Tumkur Rd, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022"
        },
        {
            Lat: "",
            Lon: "",
            Name: "City Hospitals",
            Type: "OPD Consultation",
            Address: "4/1, Tumkur Rd, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022"
        },
    ];
}

PayementDetails: {
    Category: "Online-in-app Payement";
    SmartCard: "SFSKNL FEKN";
    PayementMethod: "****1234";
    Amount: "INR 4778";
    Pay_date: "11/11/2022";
    Pay_time: "12:47";
}

Order_details:{
    OrderID:"758619387409";
    Cart:["Ibuprofen 200 MG Tablet"];
    OrderDate: "10/09/2022"
    OrderNumber: "87459370";
    Total: "INR 332";
    Patient_Details: {
        Name:"Rahul Ranjan";
        Age: 24;
        Gender: "Male";
        Contact_Number: "+91-9988263889";
    }
    Consultation_Fee: 369;
    Coupon_Discount: 36.9;
}

Delivery_details: {
    DroneID: "2435EDD6787";
    DeliveryDate: "10/09/2022";
    DeliveryTime: "5:34 PM";
    Destination: "///toddler.geologist.animated";
}

TrackOrder:{
    OrderID: "758619387409";
    Start:{
        lat: null;
        lon: null;
    }
    Finish:{
        lat: null;
        lon: null;
    }
    DroneID: "2435EDD6787";
    ETA: "10";
    ETAT: "5:34 PM";
    Destination: "///toddler.geologist.animated";
}

FirstAid: {
    [
        {
            Name: "AbdominalPain",
            Solution: [
                "Sit or lie down in a comfortable position.",
                "Do not eat or drink anything",
                "Do not take any painkillers.",
                "Take an antacid, if earlier diagnosed with hyperacidity or stomach ulcers.",
                "In case of associated breathlessness, chest pain, high fever , vomiting or continuous pain, rush to the hospital."
            ]
        },
        {
            Name: "Anigma(Chest Pain)",
            Solution:[

            ]
        },
        {
            Name: "Animal Bite",
            Solution:[

            ],
        },
        {
            Name: "Asthma/Attack",
            Solution:[

            ],
        },
        {
            Name: "Bleeding",
            Solution:[

            ],
        },
        {
            Name: "Burns",
            Solution:[

            ],
        },
        {
            Name: "Choking",
            Solution:[

            ],
        },
        {
            Name: "Convulsions",
            Solution:[

            ],
        },
        {
            Name: "Diarrhea",
            Solution:[

            ],
        },
        {
            Name: "Electric Shock",
            Solution:[

            ],
        },
        {
            Name: "Eye Injury",
            Solution:[

            ],
        },
        {
            Name: "Fainting",
            Solution:[

            ],
        },
        {
            Name: "Fever",
            Solution:[

            ],
        },
        {
            Name: "Head Injury",
            Solution:[

            ],
        },
        {
            Name: "Nose Bleed",
            Solution:[

            ],
        },
        {
            Name: "Poisoning",
            Solution:[

            ],
        },
        {
            Name: "Snake Bite",
            Solution:[

            ],
        },
        {
            Name: "Sprain/Strain",
            Solution:[

            ],
        },
        {
            Name: "Stroke",
            Solution:[

            ],
        },
        {
            Name: "Vomiting",
            Solution:[

            ],
        },

    ];
}