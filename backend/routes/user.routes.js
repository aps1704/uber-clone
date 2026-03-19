const express=require("express")
const router=express.Router()
const {body}=require("express-validator")
const {registerUser}=require("../controllers/user.controllers.js")

router.post("/register",[
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long"),
    body("fullname.firstname").isLength({min:3}).withMessage("Firstname should be at least 3 characters long"),
    
],registerUser)

module.exports=router
