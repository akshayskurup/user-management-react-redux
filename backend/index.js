const express = require('express')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });
const port = process.env.PORT 
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const connectDB = require('./config/db') 
const cors = require('cors')

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(userRoute)
app.use(adminRoute)
app.use('/uploads', express.static('uploads'));
app.listen(port,()=>console.log(`Server started on port ${port}`))