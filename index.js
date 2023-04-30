const express = require("express")
const connection = require("./db")
require('dotenv').config();
const {userRouter} = require('./Routes/user.router')
const {isAuth} = require("./middleWear/isAUth")
const {todoRouter} = require("./Routes/todo.router")

const app = express()
app.use(express.json())
//HomePage
app.get('/',(req,res)=>{
    res.status(200).json("Welcome To HomePage")  
});

app.use("/users",userRouter)


app.use(isAuth)
app.use("/todo",todoRouter)

const port = process.env.port

app.listen(port , async (req,res)=>{
    try{
        await connection
        console.log("Mongo Server Is Running");
    }catch(err){
        console.log("Some Errors Occureds In Mongo");
        console.log(err);
    }
    console.log(`Server Is Running On Port ${port}`)
})