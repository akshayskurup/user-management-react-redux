import React from 'react'
import './EditUser.css'
function EditUser() {
  return (
    <div className='edit'>
        <p id='edit-title'>Edit User</p>
        <div className='edit-card'>
            <input className='edit-field' placeholder='Enter name'/>
            <input className='edit-field' placeholder='Enter email'/>
            <input className='edit-field' placeholder='Enter password'/>
        </div>
        <button id='update-btn'>Update</button>
    </div>
  )
}

export default EditUser