const mongoose = require('mongoose')
const dbconfig = require('./dbconfig')
const Grid = require('gridfs-stream')

let gfs

const connectDB = async () => {
    try{
        mongoose.connect(dbconfig.DATABASE_URL,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })
        const con = mongoose.connection
        con.on('open',()=> {
            gfs = Grid(con.db,mongoose.mongo)
            gfs.collection('uploads')
            // console.log(gfs.collection('uploads').toString())
            console.log(`Mongo DB Connected`)
        })
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB