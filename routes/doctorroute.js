const doctorroute = require('../controllers/doctor')
const express = require('express')
const router = express.Router()

router.post('/registerDoctor',doctorroute.RegisterDoctor)
router.get('/getasingledoctor/:DoctorId',doctorroute.getasingledoctor)
router.post('/updateTime/:DoctorId',doctorroute.updateTime)
router.get('/getAlldoctors',doctorroute.getAlldoctors)
module.exports = router

