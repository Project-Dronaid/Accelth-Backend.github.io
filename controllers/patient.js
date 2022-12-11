const Patient = require('../models/patient')
const bcrypt = require('bcryptjs')


const registerPatient = async(req, res)=>{
    const{email,name,phone,password} = req.body
    if(password.length < 8){
        return res.status(400).json({
            message: "Password must be atleast 8 characters long"
        })
    }
    bcrypt.hash(password,10).then(async(hash)=>{
        await Patient.create({
            email: email,
            name: name,
            phone: phone,
            password: hash,
        }).then(patient=>
            res.status(200).json({
                message:"Patient Registered successfully",
                patient: patient,
            })
            ).catch((error)=>res.status(400).json({
                message : error.message
            })
        )
    });
}

const loginPatient = async (req,res) => {
    const{email,password}= req.body
    if(!email||!password){
        return res.status(400).json({message:"Emailid or Password not present"});
    }
    try{
        const patient = await Patient.findOne({email:email});
        if(!patient){
            res.status(400).json({
                message:"Login not successful",
                error:"Patient not found"
            })
        }else{
            bcrypt.compare(password,patient.password).then(function (result) {
                result?
                res.status(200).json({
                    patient:patient,
                    message: "Login Successful"
                }):
                res.status(400).json({
                    message:"Login not successful",
                });
            });
        }
    }catch(error){
        res.status(400).json({
            message:"An error occured",
            error:error.message
        })
    }
}

const onBoardPatient1 = async (req, res) => {
    const{email,name,dateofbirth,gender,bloodgroup,height,weight}=req.body
    await Patient.updateOne(
            { 
                email: email,
                name: name
            },
            { $set: {
               dateofbirth : dateofbirth,
               gender : gender,
               bloodgroup : bloodgroup,
               height : height,
               weight : weight
            } }
          ).then(patient=>
            res.status(200).json({
                message:"Patient's data updated",
                patient: patient,
            })
            ).catch((error)=>res.status(400).json({
                message : error.message
            })
        )
}

const onBoardPatient2 = async (req, res) => {
    const{email,allergies,blindcondition} = req.body
    await Patient.updateOne(
        { 
            email: email,
        },
        { $set: {
           allergies : allergies,
           blindcondition : blindcondition,
        } }
      ).then(patient=>
        res.status(200).json({
            message:"Patient's data updated",
            patient: patient,
        })
        ).catch((error)=>res.status(400).json({
            message : error.message
        })
    )
}






module.exports.registerPatient = registerPatient
module.exports.loginPatient = loginPatient
module.exports.onBoardPatient1 = onBoardPatient1
module.exports.onBoardPatient2 = onBoardPatient2

