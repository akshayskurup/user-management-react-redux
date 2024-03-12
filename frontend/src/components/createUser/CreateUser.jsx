import React from 'react'

function CreateUser() {
  
    return (
        <div className='edit'>
            <p id='edit-title'>Add User</p>
            <div className='edit-card'>
                <input className='edit-field' placeholder='Enter name'/>
                <input className='edit-field' placeholder='Enter email'/>
                <input className='edit-field' placeholder='Enter password'/>
            </div>
            <button id='update-btn'>Create</button>
        </div>
      )
  
}

export default CreateUser