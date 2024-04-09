const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const verifyToken = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    
   
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const userId = decoded.userId
        const user = await User.findById(userId)
        if(!user){
            return res.status(401).json({error:"Invalid token"})
        }

        req.user = user
        next()
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

const adminVerifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();

    } catch (error) {
      res.status(401).json({ message: 'Invalid Token' });
    }
  };
  

module.exports = {verifyToken,adminVerifyToken}