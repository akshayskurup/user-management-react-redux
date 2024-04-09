import React, { useDebugValue, useEffect, useState } from 'react'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteUser, searchUser } from '../../features/admin';
import { ImBin, ImExit } from "react-icons/im";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";




function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {users,searchName} = useSelector((state)=>state.admin)
  const [allUsers,setAllUsers] = useState([])
  const [name,setName] = useState('')
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
      navigate('/admin')
    }
    if(searchName===''){
      setAllUsers(users)
    }else{
      console.log("working else")
      const regex = new RegExp(`^${searchName}`,"i")
      const filteredUser = users.filter((user)=>regex.test(user.name))
      console.log("filtered data",filteredUser)
      setAllUsers(filteredUser)
      
    }
  },[navigate,users,searchName])

  //search
  const handleSubmit = ()=>{
    dispatch(searchUser(name))
  }

  //delete
  const handleDelete = async(id)=>{
    try {
      const response = await axios.post(`http://localhost:3000/delete/${id}`)
      console.log(response.data)
      dispatch(deleteUser(id))
    } catch (error) {
      console.log("Error during deleting",error)
    }
  }

  //logout
  const onLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/admin')
  }
  return (
    <div className="dashboard">
        <div className="nav">
            <p className='dashboard-title'>Dashboard</p>
            <div className="nav-btns">
                <button className='admin-logout-btn' onClick={onLogout}>Logout <ImExit className='logout-icon'/>
</button>
            </div>
        </div>
      <h1 className="table-title">Users</h1>
      <div className="table">
        <div className="search">
        <input className='search-input' type="text" onChange={(e)=>setName(e.target.value)}/>
        <button className='search-btn' onClick={handleSubmit}><IoSearchSharp /></button>
        </div>
        <button className='add-user' onClick={()=>navigate('/create-user')}><FaPlus className='plus-icon'/>Add User</button>
      <table>
      <thead>
        <tr>
          <th >Name</th>
          <th >Email</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user)=>(
          
        
        <tr>
        <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <div>
              
            <p onClick={()=>navigate('/edit-user',{ state: { userId: user._id } })} className='edit-btn'>Edit</p>
            <p className='delete-btn' onClick={()=>handleDelete(user._id)}><ImBin /></p>
            </div>
          </td>
        </tr>
        ))}
        
      </tbody>
    </table>
    </div>
    </div>
  )
}

export default Dashboard