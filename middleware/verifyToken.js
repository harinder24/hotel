const jwt = require('jsonwebtoken');

const validateToken = (req,res,next) => {
    if (req.headers?.authorization?.split(" ")[1]) {
        const token = req.headers?.authorization?.split(" ")[1];
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.decodedEmail = verified.email
        req.decodedName = verified.name
        req.decodedRole = verified.role    
        next();

    }catch(err){
        return res.status(200).json(false)
    }
    } else {
        return res.status(200).json(false)
    }
}

module.exports = validateToken