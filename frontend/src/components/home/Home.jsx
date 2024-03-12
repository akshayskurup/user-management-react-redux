import React, { useEffect } from 'react';
import '../home/Home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset ,sample,count} from '../../features/auth/authSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user ,sampleMess,sampleCount} = useSelector(state => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
    
  };
const handleSampleClick = ()=>{
  dispatch(sample())
}
const handleSampleCount = ()=>{
  dispatch(count())
}
  return (
    <>
      <div className="navbar">
        <h1 className="navbar-title">Home Page</h1>
        <div className="btns">
          <button onClick={handleSampleClick}>hai</button>
          <button onClick={handleSampleCount}>+</button>
          {sampleCount}
          <button className='profile-btn' onClick={()=>navigate('/profile')}>Profile</button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
      <div className="content">
        <h1>{sampleMess?"Welcome":"Hai"} 👋 , {user && user.name ? user.name : user && user.user.name} welcome</h1>
      </div>
      
    </>
  );
}

export default Home;
