const patientroute = require('../controllers/patient')
const express = require('express')
const router = express.Router()


router.post('/signup',patientroute.registerPatient)
router.post('/signin',patientroute.loginPatient)
router.put('/onboard1update',patientroute.onBoard1Patientupdate)
router.post('/onboard2add',patientroute.onBoard2Patientadd)
router.put('/addmedications',patientroute.addmedications)
router.get('/getAllPatients',patientroute.getAllPatients)

module.exports = router