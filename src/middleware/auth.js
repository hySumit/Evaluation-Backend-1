const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            console.log(decoded)
            req.body.username = decoded.username
            req.body.userID = decoded.userID
            next()
          });
    }else{
        res.status(401).json({
            message:"Token not found please login"
        })
    }
}

module.exports = auth