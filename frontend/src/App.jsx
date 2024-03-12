import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import { Provider } from 'react-redux'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from './pages/SignUpPage'
import { store } from './features/store'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AdminLoginPage from './pages/AdminLoginPage'
import DashboardPage from './pages/DashboardPage'
import EditUserPage from './pages/EditUserPage'
import CreateUserPage from './pages/CreateUserPage'


function App() {
 
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/admin' element={<AdminLoginPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/edit-user' element={<EditUserPage />} />
      <Route path='/create-user' element={<CreateUserPage />} />
    </Routes>
    </BrowserRouter>
    </Provider>
    <ToastContainer />
    </>
    
    
  )
}

export default App
