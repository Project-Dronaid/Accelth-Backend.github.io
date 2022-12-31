const itemroute = require('../controllers/items')
const express = require('express')
const router = express.Router()

router.post('/addMedicalItem',itemroute.addMedicalItem)
router.post('/addSubstitutes/:ItemID',itemroute.addSubstitutes)
router.get('/getMedicines',itemroute.getMedicines)
router.patch('/deleteMedicines/:ItemID',itemroute.deleteMedicines)
router.get('/getasingleMedicine/:ItemID',itemroute.getasingleMedicine)
module.exports = router