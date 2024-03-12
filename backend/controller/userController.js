const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer  = require('multer')
const userSchema = require('../model/userSchema')


let userController = {}
//multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+".png")
    }
  })
  
  userController.upload = multer({ storage: storage })


userController.handleLogin = async(req,res)=>{
    const {email,password} = req.body
    
    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).json({ message: "User with this email doesn't exists" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    //JWT Token
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'5d'})

     res.json({
        token,
        user
    })

}

userController.handleSignup = async(req,res)=>{
    const {name,email,password} = req.body
    if(name.trim()==="" || email.trim()==="" || password ===""){
       return res.status(400).json({message:"Please fill all the field"})
    }
    let userExists = await User.findOne({email})
    if(userExists){    
        return res.status(400).json({message:"User already exists"})
    }

    //bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    res.json({data:req.body,user})
}

userController.homePage = async(req,res)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        user
    })
}

userController.addProfileImg = async(req,res)=>{
    const userData = JSON.parse(req.body.user);
    const imageName = req.file.filename;
    try {       
        if(userData){
            let user = await userSchema.findByIdAndUpdate(userData._id,{image:imageName})
        }else{
            res.status(400).json({message:"No user found"})
        }
    } catch (error) {
        res.status(400).json({message:"Error during updating"})
    }
    
    res.status(200).json({message:"got it",imageName})
}

module.exports = userController