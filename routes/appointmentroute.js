const appointmentroute = require('../controllers/appointment')
const express = require('express')
const router = express.Router()


router.post('/addappointment',appointmentroute.addAppointment)
router.get('/getasingleappointment/:AppointmentID',appointmentroute.addAppointment)
router.get('/getAllAppointmentofaDoctor/:DoctorID',appointmentroute.getAllAppointmentofaDoctor)
router.get('/getAllAppointmentofaPatient/:PatientID',appointmentroute.getAllAppointmentofaPatient)
router.get('/distinctDoctorsofaPatient/:PatientID',appointmentroute.distinctDoctorsofaPatient)
router.post('/deleteAppointment/:AppointmentID',appointmentroute.deleteAppointment)
module.exports = router