const express = require('express')
const router = express.Router()
const dbconfig = require('../config/dbconfig')
const crypto = require('crypto')
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage
const path = require('path')
const multer = require('multer')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')
const { response } = require('express')
const Patient = require('../models/patient')
const { resolve } = require('path')
let gfs
mongoose.connect(dbconfig.DATABASE_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
const con = mongoose.connection
con.on('open',()=> {
    gfs = new mongoose.mongo.GridFSBucket(con.db,{bucketName:'uploads'})
})

const storage = new GridFsStorage({
    url: dbconfig.DATABASE_URL,
    file: (req,file,cb)=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                // const filename = buf.toString('hex') + path.extname(file.originalname)
                const filename = file.originalname
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                }
                resolve(fileInfo)
            });
        });
    }
})
const upload = multer({storage:storage})

router.post('/upload/covid/:Email_id',upload.single('file'),async (req,res)=>{
    const fileName = req.file.filename
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  req.params.Email_id,
    },{
        "Lab_Reports.Diagnostic_Test.Covid.File_Name": fileName
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            file: req.file,
            patient:patient,
        })
    }).catch((err)=>res.status(400).json(err))
})

router.post('/commonuploads',upload.single('file'),async(req,res)=>{
    res.status(200).json({
        file:req.file,
        message:"success"
    })
})

router.post('/upload/imaging/:Email_id',upload.single('file'),async (req,res)=>{
    const fileName = req.file.filename
    await Patient.patient.updateOne({
        "Profile.Personal.Email_id":  req.params.Email_id,
    },{
        "Imaging.Filename": fileName
    },{upsert:true}).then(patient=>{
        res.status(200).json({
            file: req.file,
            patient:patient,
        })
    }).catch((err)=>res.status(400).json(err))
})

router.get('/files',(req,res)=>{
    gfs.find().toArray((err,files)=>{
        if(!files || files.length==0){
            return res.status(200).json({
                success:false,
                message:'No files available',
            })
        }
        res.status(200).json({
            success:true,
            files: files
        })
    })
})


router.get('/files/:filename',(req,res)=>{
    gfs.find({filename:req.params.filename}).toArray((err,files)=>{
        if(!files[0]||files.length==0){
            return res.status(200).json({
                success:false,
                message:'No such file available',
            })
        }
        res.status(200).json({
            success:true,
            file:files[0]
        })
    })
})

router.get('/fileshow/:filename',(req,res)=>{
    gfs.find({filename:req.params.filename}).toArray((err,files)=>{
        if(!files[0]||files.length==0){
            return res.status(200).json({
                success:false,
                message:'No such file available',
            })
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res)
    })
})
const Ongoing_TreatmentStorage = new GridFsStorage({
    url: dbconfig.DATABASE_URL,
    file: (req,file,cb)=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                const filename = 'OngoingTreatment(' + req.params.Email_id + '_' + file.originalname + ")"
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                }
                resolve(fileInfo)
            });
        });
    }
})
const uploadOngoing_Treatment = multer({storage:Ongoing_TreatmentStorage})

router.post('/upload/ongoingTreatment/:Email_id', uploadOngoing_Treatment.single('file'),async(req,res)=>{
    res.status(200).json({
        file: req.file,
        message: "Ongoing Treatment Prescription Uploaded Successfully"
    })
})

const VitalStorage = new GridFsStorage({
    url: dbconfig.DATABASE_URL,
    file: (req,file,cb)=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                const filename = 'Vitals(' + req.params.Email_id + '_' + file.originalname + ')'
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                }
                resolve(fileInfo)
            });
        });
    }
})
const vitalsss = multer({storage:VitalStorage})

router.post('/upload/vitals/:Email_id', vitalsss.single('file'),async(req,res)=>{
    res.status(200).json({
        file: req.file,
        message: "Vitals Prescription Uploaded Successfully"
    })
})

const PrescriptionStorage = new GridFsStorage({
    url: dbconfig.DATABASE_URL,
    file: (req, file, cb) => {
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                const filename = 'Prescription(' + req.params.Email_id + '_' + file.originalname + ')'
                const fileInfo = {
                    filename: filename,
                    bucketName : 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})

const prescriptionsss = multer({storage: PrescriptionStorage})

router.post('/upload/prescription/:Email_id', prescriptionsss.single('file'),async(req,res)=>{
    res.status(200).json({
        file: req.file,
        message: "Prescription Uploaded Successfully"
    })
})

const LabReportStorage = new GridFsStorage({
    url: dbconfig.DATABASE_URL,
    file: (req, file, cb) => {
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                const filename = 'LabReport(' + req.params.Email_id + '_' + file.originalname + ')'
                const fileInfo = {
                    filename: filename,
                    bucketName : 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})

const labreportsss = multer({storage: LabReportStorage})

router.post('/upload/labreports/:Email_id', labreportsss.single('file'),async(req,res)=>{
    res.status(200).json({
        file: req.file,
        message: "Lab Report Uploaded Successfully"
    })
})

const XRAYStorage = new GridFsStorage({
    url: dbconfig.DATABASE_URL,
    file: (req, file, cb) => {
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                const filename = 'X-RAY(' + req.params.Email_id + '_' + file.originalname + ')'
                const fileInfo = {
                    filename: filename,
                    bucketName : 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})

const xrayreportsss = multer({storage: XRAYStorage})

router.post('/upload/xray/:Email_id', xrayreportsss.single('file'),async(req,res)=>{
    res.status(200).json({
        file: req.file,
        message: "X-Ray Report Uploaded Successfully"
    })
})

const MedicationPrescriptionStorage = new GridFsStorage({
    url: dbconfig.DATABASE_URL,
    file: (req, file, cb) => {
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                const filename = 'MedicationPrescription(' + req.params.Email_id + '_' + file.originalname + ')'
                const fileInfo = {
                    filename: filename,
                    bucketName : 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})

const medicationprescriptionsss = multer({storage: MedicationPrescriptionStorage})

router.post('/upload/medicationprescription/:Email_id', medicationprescriptionsss.single('file'),async(req,res)=>{
    res.status(200).json({
        file: req.file,
        message: "Medication Uploaded Successfully"
    })
})


module.exports = router