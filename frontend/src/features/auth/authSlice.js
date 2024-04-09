import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService'

//get user from the local storage

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user : user?user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
    dp:null,
}

//Register User
export const register = createAsyncThunk('/signup',async(user,thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        console.error('Error during registration:', error);
        
        const message = (error.response && error.response.data && error.response.data.message)||error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



//Login User

export const login = createAsyncThunk('/login',async(user,thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        console.log("error during login",error)
        const message = (error.response && error.response.data && error.response.data.message)||error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout user

export const logout = createAsyncThunk('/logout',async()=>{
    await authService.logout()
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message = ''
        },
        imageChange:(state,action)=>{
            console.log(action.payload)
            state.dp = action.payload
        },
        setToken:(state,action)=>{
            state.token = action.payload
        },
        increment:(state)=>{
            state.count++
        },
        decrement:(state)=>{
            state.count--
        }

        
    },
    extraReducers :(builder)=>{
        builder

        //register
        .addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.message = action.payload
            state.user = null
        })

        //login
        .addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isSuccess = true,
            state.user = action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
            state.user = null
        })

        //logout
        .addCase(logout.fulfilled,(state)=>{
            state.user = null
            state.dp = null
        })
    }
})

export  const {reset,increment,decrement,imageChange} = authSlice.actions
export default authSlice.reducer