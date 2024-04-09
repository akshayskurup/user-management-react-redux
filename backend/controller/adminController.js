const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

let adminController = {}
const credentials = {
    email:"admin@gmail.com",
    password:"akshay"
}
adminController.login = (req,res)=>{
    const {email,password} = req.body
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ email: adminEmail }, process.env.JWT_SECRET, { expiresIn: '5d' });
  
      res.status(200).json({token});
}

adminController.dashboard = async(req,res)=>{
    try {
        console.log("hello",req.body)
        const user = await User.find({})
        res.json({user})
    } catch (error) {
        console.log("server",error)
    }
}

adminController.createUser = async(req,res)=>{
    const {name,email,password} = req.body
    let userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({message:"User with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    res.status(200).json({message:"Successfully created new user",user})
}

adminController.editUser = async(req,res)=>{
    const userId = req.params.id
    const {user} = req.body
    const editUserMail =user.email
    console.log(editUserMail)
    const userExists = await User.findById(userId)
    if(!userExists){
        res.status(400).json({message:"User not available"})
    }
    const userWithSameEmail = await User.findOne({email:editUserMail});
    console.log("userWithSameEmail",userWithSameEmail)
    if (userWithSameEmail && userWithSameEmail._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already exists" });
    }
   
    await User.findByIdAndUpdate(userId,user)
    res.status(200).json({message:"Successfully updated user"})
}

adminController.deleteUser = async(req,res)=>{
    const userId = req.params.id
    const deletedUser = await User.findByIdAndDelete(userId)
    if(deletedUser){
        res.status(200).json({message:"Successfully deleted"})
    }else{
        res.status(400).json({message:"Error during deleting"})
    }

}
module.exports = adminController