import { createSlice } from "@reduxjs/toolkit";


const userRegisterSlice = createSlice({
    name: 'userRegisterSlice',
    initialState: {
        user: null,
        

    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
        },
        addFavorites:(state, action) => {
            state.favorites = action.payload
        }
    }
})

export const { saveUser, addFavorites } = userRegisterSlice.actions
export default userRegisterSlice.reducer