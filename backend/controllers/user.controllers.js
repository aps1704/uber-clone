const userModel=require("../models/user.model.js")
const userService=require("../services/user.service.js")
const {validationResult}=require("express-validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


module.exports.registerUser=async (req,res,next)=>{
    
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullname:{firstname,lastname},email,password}=req.body
    const hashedPassword=await userModel.hashPassword(password)
    try{
        const user=await userService.createUser({firstname,lastname,email,password:hashedPassword})
        const token=user.generateAuthToken()
        res.status(201).json({user,token})
    }
    catch(err){
        next(err)
    }
}