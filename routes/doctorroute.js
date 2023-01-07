const doctorroute = require('../controllers/doctor')
const express = require('express')
const router = express.Router()

router.post('/registerDoctor',doctorroute.RegisterDoctor)
router.get('/getasingledoctor/:DoctorId',doctorroute.getasingledoctor)
module.exports = router

