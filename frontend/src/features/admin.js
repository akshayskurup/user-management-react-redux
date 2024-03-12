import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
}

const adminSlice = createSlice({
    name:"adminManagement",
    initialState,
    reducers:{
        setUsers:(state,action)=>{
            state.users = action.payload
        },
        deleteUser:(state,action)=>{
            const userId = action.payload
            const filteredUser = state.users.filter((element)=>{
                return element._id!=userId
            })
            state.users = filteredUser
        }
    }
})

export const {setUsers,deleteUser} = adminSlice.actions
export default adminSlice.reducer