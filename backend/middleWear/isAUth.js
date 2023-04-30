var jwt = require('jsonwebtoken');


const isAuth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try{
            var decoded = jwt.verify(token.split(' ')[1], 'noteApp');
            if(decoded){
                console.log(decoded)
                req.body.userName = decoded.name
                req.body.userId = decoded.userId
                next()
            }else{
                res.status(400).send({"err":"Please Enter A valid Token"})
            }
        }catch (err){
            res.status(400).send({"err":err.message})
        }
    }else{
        res.status(400).send({"err":"Please Login Fast"})
    }
}

module.exports={
    isAuth
}