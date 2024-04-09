import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import {toast} from 'react-toastify'
import { createUser } from '../../features/admin'

function CreateUser() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
      navigate('/admin')
    }
    },[navigate])

    const handleSubmit = async()=>{
        if(name===""||email===""||password===""){
            return toast.error("Fill the form")
        }
        else if(password.length <=4){
            return toast.error("Password is weak")
        }else if(!/^[a-zA-Z ]{3,40}$/.test(name)){
            return toast.error("Name should be valid")
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return toast.error("Email should be valid")
        }

        try {
            const response = await axios.post("http://localhost:3000/createUser",{
            name,
            email,
            password
        })
        toast.success(response.data.message)
        dispatch(createUser(response.data.user))
        
        navigate('/dashboard')
        } catch (error) {
            console.log("Error while creating user",error)
            toast.error(error.response.data.message)
        }
        
    }
    return (
        <div className='edit'>
            <p id='edit-title'>Add User</p>
            <div className='edit-card'>
                <input className='edit-field' onChange={(e)=>setName(e.target.value)} placeholder='Enter name'/>
                <input type='email' onChange={(e)=>setEmail(e.target.value)} className='edit-field' placeholder='Enter email'/>
                <input type='password'onChange={(e)=>setPassword(e.target.value)} className='edit-field' placeholder='Enter password'/>
            </div>
            <button id='update-btn' onClick={handleSubmit}>Create</button>
        </div>
      )
  
}

export default CreateUser