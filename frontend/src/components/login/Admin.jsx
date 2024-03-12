import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import { toast } from 'react-toastify'
import { setUsers } from '../../features/admin'
import { useDispatch, useSelector } from 'react-redux'

function Admin() {
  const dispatch = useDispatch()
  const {users} = useSelector((state)=>state.admin)

  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const onChange = (e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value,
    }))
  }
  const {email,password} = formData


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); 
    }
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      const result = await axios.post('http://localhost:3000/admin', formData);
      if (result.data) {
        localStorage.setItem('token', result.data.token)
        navigate('/dashboard');
        
        await fetchUserData(); 
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  const fetchUserData = async () => {
    const getTokenFromStorage = () => {
    
      return localStorage.getItem('token'); 
    };
    const token = getTokenFromStorage()
    try {
      const response = await axios.get('http://localhost:3000/dashboard',{
        headers:{
          'Authorization': `Bearer ${token}` 
        }
      }); 
      console.log("user ahno",response.data.user);
      dispatch(setUsers(response.data.user))
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  return (
    <div className="admin">
        <div className="admin-card">
        <p className='admin-login-title'>Admin Login</p>
            <input name='email' type="text" placeholder='Email' onChange={onChange} className='admin-login-email'/>
            <input name='password' type="text" placeholder='Password' onChange={onChange} className='admin-login-password' />
            <button onClick={handleSubmit} className='admin-login-btn'>Login</button>
        </div>
    </div>
  )
}

export default Admin