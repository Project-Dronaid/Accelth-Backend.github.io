const express = require('express')
const app = express()
const connectDB = require('./config/db')
require('dotenv').config()
const port = 8000
connectDB()
const patientrouter = require('./routes/patientroute')
const itemrouter = require('./routes/itemsroute')
app.use(express.json())
app.get('/',(req, res)=>{
    res.send("Server Running Successfully")
})
app.use('/patient',patientrouter)
app.use('/meditem',itemrouter)
app.listen(port,()=>{
    console.log('Server started on port '+port)
})