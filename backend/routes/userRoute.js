const express = require('express')
const userRoute = express.Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

userRoute.post('/login',userController.handleLogin)
userRoute.post('/signup',userController.handleSignup)
userRoute.get('/home',authMiddleware.verifyToken,userController.homePage)
userRoute.post('/addImg',userController.upload.single('image'),userController.addProfileImg)



module.exports = userRoute