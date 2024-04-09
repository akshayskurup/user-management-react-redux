import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    searchName:''
}

const adminSlice = createSlice({
    name:"adminManagement",
    initialState,
    reducers:{
        setUsers:(state,action)=>{
            state.users = action.payload
        },
        createUser:(state,action)=>{
            state.users.push(action.payload)
        },
        deleteUser:(state,action)=>{
            const userId = action.payload
            const filteredUser = state.users.filter((element)=>{
                return element._id!=userId
            })
            state.users = filteredUser
        },
        editUser: (state, action) => {
            const { userId, user } = action.payload;
            console.log(action.payload)
            state.users = state.users.map((existingUser) => {
              if (existingUser._id === userId) {
                return { ...existingUser, ...user };
              }
              return existingUser;
            });
          },
        searchUser:(state,action)=>{
            state.searchName = action.payload
        }
          
    }
})

export const {setUsers,deleteUser,createUser,editUser,searchUser} = adminSlice.actions
export default adminSlice.reducer