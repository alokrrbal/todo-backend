const express = require("express")
const bcrypt = require('bcrypt');
const {UserModel} = require("../models/user.model")
var jwt = require('jsonwebtoken');
const userRouter = express.Router()


userRouter.post("/signup",async(req,res)=>{
    const {name,email , password ,age} = req.body

    try{
        bcrypt.hash(password, 5,async(err, hash)=>{
            const newUser = new UserModel({name,email,password:hash,age})
            await newUser.save()
            res.status(200).json({"msg":"New User Registerd Successfully"})
        });

    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user = await UserModel.findOne({email})
    try{
        if(user){
            bcrypt.compare(password, user.password,(err, result) => {
                if(result){
                    var token = jwt.sign({ name: user.name , userId:user._id }, 'noteApp');
                    res.status(200).json({"msg":"Login Successfully" , "token":token})
                }else{
                    res.status(400).send({err:"Wrong Password"})
                }
            })
        }else{
            res.status(400).json({"err":"Unable To Find The User"})
        }

    }catch(err){

    }
})

module.exports={
    userRouter
}