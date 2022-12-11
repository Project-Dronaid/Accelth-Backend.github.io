const patientroute = require('../controllers/patient')
const express = require('express')
const router = express.Router()


router.post('/signup',patientroute.registerPatient)
router.post('/login',patientroute.loginPatient)


module.exports = router