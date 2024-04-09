import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import './Profile.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import { useDispatch, useSelector } from 'react-redux'
import { imageChange } from '../../features/auth/authSlice'


function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image,setImage] = useState("")
    const [profileImage, setProfileImage] = useState(null);
    const {user,dp} = useSelector((state)=>state.auth)
    
    useEffect(()=>{
            console.log('IMages : ',dp)
           setProfileImage(`http://localhost:3000/uploads/${dp}`)
           console.log(profileImage)
    },[profileImage])

    const onImgChange = (e)=>{
        setImage(e.target.files[0])
    }
    const onSubmit = async()=>{
        if(image===""){
            toast.error("Please select any image")
        }else{
            const formData = new FormData()
            formData.append('image',image)
            formData.append('user', JSON.stringify(user.user))
            try {
                const result = await axios.post('http://localhost:3000/addImg', formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setImage("")
                toast.success("Uploaded successfully!")
                console.log(result.data.imageName)
                localStorage.setItem('user',JSON.stringify(result.data.imageName))
                const getImage = localStorage.getItem('user')
                const image = JSON.parse(getImage)
                console.log("localSt",image)
                dispatch(imageChange(result.data.imageName))
                setProfileImage(`http://localhost:3000/uploads/${result.data.imageName}`)
                

            
                
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        
        }
    }
    
  return (
    <>
    <div className="profile">
        <div className="card">
            <div className="content">
                {profileImage?<img className='round-img'  src={profileImage} alt="" />:<p>No profile</p>}
                <div className="text">
                <p className='prf-name'>{user && user.name ? user.name : user && user.user.name}</p>
                <p className='prf-email'>{user && user.email ? user.email : user && user.user.email}</p>
                <p className='prf-upload'>Upload image</p>
                {image && <img className='preview-img' src={URL.createObjectURL(image)} alt='image' />}
                <input className='upload-btn' name='image' accept='image/*' onChange={onImgChange} type="file" />
                <button className='submit-btn' onClick={onSubmit}>Submit</button>
                </div>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile