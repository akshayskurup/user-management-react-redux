import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import {useDispatch,useSelector} from 'react-redux'
import { login,reset } from '../../features/auth/authSlice'
import {toast} from 'react-toastify'


function Login() {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const dispatch = useDispatch()
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
  const {email,password} = formData
  const onLogin = ()=>{
    if(email.trim()===''&& password.trim()===''){
      toast.error("Please fill the form")
    }else{
      const userData = {
        email,
        password
      }
      dispatch(login(userData))
    }
  }
  return (
    <div className="container">
        <p className='login-title'>LOG IN</p>
    <div className="login">
    
        <div className="content">
                <input name='email' className='email' type="text" onChange={onChange} placeholder='Email' />
                <input name='password' className='password' type="text" onChange={onChange} placeholder='Password' />
            <button className='login-btn' onClick={onLogin}>LOG IN</button>
            
        </div>
    </div>
        <p className='register'>Register here <span onClick={()=>navigate('/signup')}>SignUp</span></p>
    </div>

  )
}

export default Login