const express = require('express')
const adminRoute = express.Router()
const adminController = require('../controller/adminController')
const authMiddleware = require('../middleware/authMiddleware')

adminRoute.post('/admin',adminController.login)
adminRoute.get('/dashboard',authMiddleware.adminVerifyToken,adminController.dashboard)
adminRoute.post('/createUser',adminController.createUser)
adminRoute.post('/edit/:id',adminController.editUser)
adminRoute.post('/delete/:id',adminController.deleteUser)
module.exports = adminRoute