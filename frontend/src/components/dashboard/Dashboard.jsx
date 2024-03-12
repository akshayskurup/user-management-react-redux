import React, { useDebugValue, useEffect, useState } from 'react'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteUser } from '../../features/admin';


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {users} = useSelector((state)=>state.admin)
  const [allUsers,setAllUsers] = useState([])
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
      navigate('/admin')
    }
    setAllUsers(users)
  },[navigate,setAllUsers,users])

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
    localStorage.removeItem('token');
    navigate('/admin')
  }
  return (
    <div className="dashboard">
        <div className="nav">
            <p className='dashboard-title'>Dashboard</p>
            <div className="nav-btns">
                <button className='admin-logout-btn' onClick={onLogout}>Logout</button>
            </div>
        </div>
      <h1 className="table-title">Users</h1>
      <div className="table">
        <button className='add-user' onClick={()=>navigate('/create-user')}>Add User</button>
      <table>
      <thead>
        <tr>
          <th >Email</th>
          <th >Name</th>
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
              
            <p onClick={()=>navigate('/edit-user')} className='edit-btn'>Edit</p>
            <p className='delete-btn' onClick={()=>handleDelete(user._id)}>Delete</p>
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