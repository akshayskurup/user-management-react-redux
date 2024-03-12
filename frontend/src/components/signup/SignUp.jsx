import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {toast} from 'react-toastify'

import { register,reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'

function SignUp() {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user,isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)


    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/home')
        }

        dispatch(reset())
    },[user,isLoading,isError,isSuccess,message,navigate,dispatch])

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }
    const{name,email,password,password2} = formData
    
    const onSubmit = ()=>{
        if(password !== password2){
            toast.error("Password do not match")
        }else{
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    return (

        <div className="container">
            <p className='login-title'>SIGN UP</p>
        <div className="login">
        
            <div className="content">
                <input  name='name' className='email' type="text" onChange={onChange} placeholder='Name' />
                <input name='email' className='email' type="text" onChange={onChange} placeholder='Email' />
                <input name='password' className='password' type="text" onChange={onChange} placeholder='Password' />
                <input name='password2' className='password2' type="text" onChange={onChange} placeholder='Password' />
                <button className='login-btn' onClick={onSubmit}>Create</button>
                
            </div>
        </div>
            <p className='register'>Already have a account <span onClick={()=>navigate('/')}>LOG IN</span></p>
        </div>
    
      )
}

export default SignUp