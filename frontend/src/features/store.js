import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import adminReducer from './admin'


export const store = configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer
    },
})










