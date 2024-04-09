import React, { useEffect } from 'react';
import '../home/Home.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset ,increment,decrement, imageChange} from '../../features/auth/authSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user,count,token} = useSelector(state => state.auth);

  useEffect(() => {

    if (!user) {
      navigate('/');
    }
    
    let User = localStorage.getItem('user')
     User = JSON.parse(User)
    console.log('image0',User?.image)
    if(User&&User.image){

      dispatch(imageChange(User.image))
    }

  }, [user, navigate]);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
    
  };

  const handleIncre = ()=>{
    dispatch(increment())
  }
  const handleDecre = ()=>{
    dispatch(decrement())
  }

  return (
    <>
      <div className="navbar">
        <h1 className="navbar-title">Home Page</h1>
        <div className="btns">
          <button className='profile-btn' onClick={()=>navigate('/profile')}>Profile</button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
      <div className="content">
        <h1>Hai 👋 , {user && user.name ? user.name : user && user.user.name} welcome</h1>
        
      </div>
      
      
    </>
  );
}

export default Home;
