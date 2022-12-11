const mongoose = require('mongoose')
const dbconfig = require('./dbconfig')

const connectDB = async () => {
    try{
        mongoose.connect(dbconfig.database,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })
        const con = mongoose.connection
        con.on('open',()=> {
            console.log(`Mongo DB Connected`)
        })
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB