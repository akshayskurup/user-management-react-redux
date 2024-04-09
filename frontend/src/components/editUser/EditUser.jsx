import React, { useEffect, useState } from 'react'
import './EditUser.css'
import { useLocation, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { editUser } from '../../features/admin';


function EditUser() {
  const location = useLocation()
  const { userId } = location.state || {};
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {users} = useSelector((state)=>state.admin)
  
  const [user,setUser] = useState({
    name:"",
    email:""
  })
    useEffect(()=>{
      console.log("checking",users)
      if(users&&users.length>0){
        const filteredUser = users.find((user)=>user._id===userId)
        setUser(filteredUser)
      }
    },[users,userId])


    const handleChange = (e)=>{
      setUser(prevUser=>({
        ...prevUser,
        [e.target.name]:e.target.value
      }))
    }

    const handleUpdate = async()=>{
      if(!/^[a-zA-Z ]{3,40}$/.test(user.name)){
        return toast.error("Name should be valid")
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)){
      return toast.error("Email should be valid")
  }
      try {
        dispatch(editUser({userId,user}))
        const response = await axios.post(`http://localhost:3000/edit/${userId}`,{user})
        toast.success(response.data.message)
        navigate('/dashboard')
        
      } catch (error) {
        toast.error(error.response.data.message)
        console.log("Error while editing the user",error)
      }
    }
  return (
    <div className='edit'>
        <p id='edit-title'>Edit User</p>
        <div className='edit-card'>
            <input type='text' name='name' className='edit-field' onChange={handleChange} value={user.name} placeholder='Enter name'/>
            <input type='email' name='email' className='edit-field'onChange={handleChange} value={user.email} placeholder='Enter email'/>
        </div>
        <button id='update-btn' onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default EditUser