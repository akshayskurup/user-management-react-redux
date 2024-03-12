import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import './Profile.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import { useSelector } from 'react-redux'


function Profile() {
    const navigate = useNavigate()
    const [image,setImage] = useState("")
    const [profileImage, setProfileImage] = useState(null);
    const {user} = useSelector((state)=>state.auth)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data if not already available
                if (!user) {
                    navigate('/');
                } else {
                    // Check if user data has image info and update profile image
                    if (user && user.user.image) {
                        setProfileImage(`http://localhost:3000/uploads/${user.user.image}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error (e.g., redirect to an error page)
            }
        };
    
        fetchData();
    }, [user, navigate]);

    const onImgChange = (e)=>{
        setImage(e.target.files[0])
    }
    const onSubmit = async()=>{
        if(image===""){
            toast.error("Please select any image")
        }else{
            const formData = new FormData()
            formData.append('image',image)
            setImage('')
            formData.append('user', JSON.stringify(user.user))
            try {
                const result = await axios.post('http://localhost:3000/addImg', formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Uploaded successfully!")
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
                {profileImage?<img className='round-img'  src={profileImage} alt="No img" />:<p>No profile</p>}
                <div className="text">
                <p className='prf-name'>{user.user.name}</p>
                <p className='prf-email'>{user.user.email}</p>
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