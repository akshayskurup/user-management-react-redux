import axios from 'axios'


const register = async(userData)=>{
    const response = await axios.post('http://localhost:3000/signup',userData)

    if(response.data){
        localStorage.setItem('item',JSON.stringify(response.data))
    }
    return response.data
}

//login
const login = async(userData)=>{
    const response = await axios.post('http://localhost:3000/login',userData)
    if(response.data){
        localStorage.setItem('item',JSON.stringify(response.data))
    }
    return response.data
}

//Logout
const logout = ()=>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService